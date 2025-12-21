import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { Link, useParams } from 'react-router';
import Useaxiossecure from '../../Hooks/Useaxiossecure';
import Swal from 'sweetalert2';
// NEW IMPORTS FOR DESIGN
import { motion } from 'framer-motion';
import { FaTrophy, FaUser, FaEnvelope, FaFileAlt, FaEye } from 'react-icons/fa';
import { MdEmojiEvents } from 'react-icons/md';

const Submitted = () => {
    const { id } = useParams();
    const queryclien = useQueryClient();

    const axiossecure = Useaxiossecure();
    const { data: submission, isLoading } = useQuery({
        queryKey: [`sumissiondata`, id],
        enabled: !!id,
        queryFn: async () => {
            const result = await axiossecure.get(`/submission/${id}`);
            return result.data;
        }
    });

    const { data: contestname, isLoading: nameloading } = useQuery({
        queryKey: [`contestname`, id],
        enabled: !!id,
        queryFn: async () => {
            const result = await axiossecure.get(`/contest/name/${id}`);
            return result.data;
        }
    });


    const { mutate } = useMutation({
        mutationFn: async (email) => {
            const result = await axiossecure.patch(`/winnerdeclaraqtion`, { id, email });
            return result.data;
        },
        onSuccess: () => {
            Swal.fire("Winner declared");
            queryclien.invalidateQueries([`sumissiondata`]);
        }
    });


    if (isLoading || nameloading) {
        return (
            <div className="flex justify-center items-center min-h-[70vh] bg-transparent">
                <div className="relative">
                    {/* Outer Glow Ring */}
                    <div className="w-24 h-24 border-4 border-sky-300/20 rounded-full animate-pulse"></div>
                    {/* Spinning Ring */}
                    <span className="loading loading-spinner text-sky-400 absolute top-0 left-0 w-24 h-24"></span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10 px-4 font-sans text-slate-700">
            {/* Main Glass Container */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl shadow-xl overflow-hidden relative"
            >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-300/20 rounded-full translate-x-20 -translate-y-20 blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400/20 rounded-full -translate-x-10 translate-y-10 blur-3xl -z-10"></div>

                {/* Header Section */}
                <div className="bg-gradient-to-r from-sky-400/80 to-blue-500/80 p-8 text-center relative">
                     {/* Back Button added for better UX */}
                     <Link to="/Dashboard/creator/Createdcontest" className="absolute left-6 top-6 text-white text-3xl hover:scale-110 transition-transform">
                        <IoArrowBackCircleOutline />
                    </Link>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <h1 className="text-3xl font-extrabold text-white drop-shadow-sm tracking-wide flex items-center justify-center gap-3 capitalize">
                            <FaFileAlt className="text-sky-100" />
                            {contestname.name} <span className="text-sky-100 font-light">Submissions</span>
                        </h1>
                        <p className="text-sky-100 mt-2 text-sm">Review tasks and declare a winner</p>
                    </motion.div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto p-6">
                    <table className="table w-full border-separate border-spacing-y-3">
                        <thead>
                            <tr className="text-left text-sky-900/70 text-sm uppercase tracking-wider border-b border-sky-100">
                                <th className="bg-transparent font-bold p-4 pl-6">Participant</th>
                                <th className="bg-transparent font-bold p-4">Contest ID</th>
                                <th className="bg-transparent font-bold p-4 text-center">Submitted Task</th>
                                <th className="bg-transparent font-bold p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submission.map((submit, idx) => (
                                <React.Fragment key={submit._id || idx}>
                                    <motion.tr
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                                        whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                                        className="shadow-sm rounded-xl transition-all duration-300 hover:shadow-md"
                                    >
                                        {/* User Email */}
                                        <td className="p-4 pl-6 font-medium text-slate-700 rounded-l-xl">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-sky-100 p-2 rounded-full text-sky-500">
                                                    <FaEnvelope />
                                                </div>
                                                {submit.useremail}
                                            </div>
                                        </td>

                                        {/* Contest ID */}
                                        <td className="p-4 text-xs font-mono text-slate-500">
                                            {submit.contestid}
                                        </td>

                                        {/* View Task Button */}
                                        <td className="p-4 text-center">
                                            <button 
                                                onClick={() => document.getElementById(`my_modal_${idx}`).showModal()} 
                                                className="btn btn-sm bg-sky-100 text-sky-600 hover:bg-sky-500 hover:text-white border-none shadow-sm gap-2 rounded-full px-4 transition-all"
                                            >
                                                <FaEye /> View Task
                                            </button>

                                            {/* MODAL DESIGN */}
                                            <dialog id={`my_modal_${idx}`} className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                                                <div className="modal-box bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl p-0 overflow-hidden">
                                                    {/* Modal Header */}
                                                    <div className="bg-gradient-to-r from-sky-400 to-blue-500 p-6 text-white">
                                                        <h3 className="font-bold text-lg flex items-center gap-2">
                                                            <FaUser /> Submission Details
                                                        </h3>
                                                    </div>
                                                    
                                                    {/* Modal Body */}
                                                    <div className="p-6 space-y-4 text-left">
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-xs font-bold uppercase text-slate-400">Participant Name</span>
                                                            <p className="font-semibold text-slate-700">{submit.name}</p>
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-xs font-bold uppercase text-slate-400">Email</span>
                                                            <p className="font-mono text-sm text-slate-600">{submit.useremail}</p>
                                                        </div>
                                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-2">
                                                            <span className="text-xs font-bold uppercase text-slate-400 block mb-2">Submission Text</span>
                                                            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{submit.submissionText}</p>
                                                        </div>
                                                    </div>

                                                    {/* Modal Actions */}
                                                    <div className="modal-action bg-slate-50 p-4 m-0 border-t border-slate-100">
                                                        <form method="dialog" className="w-full flex justify-end">
                                                            <button className="btn btn-sm bg-slate-200 text-slate-600 hover:bg-slate-300 border-none rounded-full px-6">Close</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>
                                        </td>

                                        {/* Winner Action */}
                                        <td className="p-4 rounded-r-xl text-center">
                                            {submit.isWinner === false ? (
                                                <button
                                                    onClick={() => {
                                                        mutate({ email: submit.useremail, contestname: submit.contestname, prizemoney: submit.prizemoney })
                                                    }}
                                                    className="btn btn-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-white border-none shadow-md hover:shadow-lg hover:scale-105 transition-all rounded-full px-5 gap-2"
                                                >
                                                    <FaTrophy className="text-yellow-200" /> Select Winner
                                                </button>
                                            ) : (
                                                <div className="flex items-center justify-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold text-xs border border-yellow-200 shadow-sm">
                                                    <MdEmojiEvents className="text-lg" />
                                                    Winner Declared
                                                </div>
                                            )}
                                        </td>
                                    </motion.tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default Submitted;