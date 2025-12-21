import React from 'react';
import { Usecreatorcontest } from '../../Hooks/usecreatorcontest';
import { Useallcontest } from '../../Hooks/Useallcontest';
import { FaEdit, FaTasks, FaCalendarAlt, FaUserCircle } from 'react-icons/fa';
import { MdDelete, MdCheckCircle, MdCancel } from 'react-icons/md';
import { FcApprove } from 'react-icons/fc';
import { RxCross1 } from 'react-icons/rx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Useaxiossecure from '../../Hooks/Useaxiossecure';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router';
// NEW IMPORT FOR ANIMATION
import { motion } from 'framer-motion';

const Contestmanage = () => {
  const queryclient = useQueryClient();
  const axiossecure = Useaxiossecure();

  const { mutate } = useMutation({
    mutationFn: async ({ Id, status }) => axiossecure.patch(`/contest/${Id}`, { status }),
    onSuccess: () => {
      queryclient.invalidateQueries(['all-contest']);
      Swal.fire("Saved!", "", "success");
    }
  });

  const { data: contest, isLoading } = Useallcontest();
  console.log(contest);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] bg-transparent">
        <div className="relative">
          {/* Enhanced Glow Ring */}
          <div className="w-24 h-24 border-4 border-sky-200/50 rounded-full animate-pulse"></div>
          {/* Spinning Ring */}
          <span className="loading loading-spinner text-white absolute top-0 left-0 w-24 h-24"></span>
        </div>
      </div>
    );
  }

  const handleapprove = (Id, status) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(Id, status);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

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
        <div className="bg-gradient-to-r from-sky-400/80 to-blue-500/80 p-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-3xl font-extrabold text-white drop-shadow-sm tracking-wide flex items-center justify-center gap-3">
              <FaTasks className="text-sky-100" />
              Contest Management
            </h1>
            <p className="text-sky-100 mt-2 text-sm">Review and approve contest submissions</p>
          </motion.div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto p-6">
          <table className="table w-full border-separate border-spacing-y-3">
            {/* Table Head */}
            <thead>
              <tr className="text-left text-sky-900/70 text-sm uppercase tracking-wider border-b border-sky-100">
                <th className="bg-transparent font-bold p-4 pl-6">Contest Name</th>
                <th className="bg-transparent font-bold p-4">Created At</th>
                <th className="bg-transparent font-bold p-4">Creator Email</th>
                <th className="bg-transparent font-bold p-4">Status</th>
                <th className="bg-transparent font-bold p-4 text-center">Approve/Decline</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {contest.map((u, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  // Style fix to avoid Tailwind/Framer conflict
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                  whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                  className="shadow-sm rounded-xl transition-all duration-300 hover:shadow-md"
                >
                  {/* Name */}
                  <td className="p-4 pl-6 font-bold text-slate-700 rounded-l-xl">
                    {u.name}
                  </td>

                  {/* Created At */}
                  <td className="p-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-sky-400" />
                      {u.createdAt}
                    </div>
                  </td>

                  {/* Creator Email */}
                  <td className="p-4 text-sm font-medium text-slate-600">
                    <div className="flex items-center gap-2">
                      <FaUserCircle className="text-sky-300" />
                      {u.creatorEmail}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="p-4">
                    {u.status === 'Approved' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200 uppercase tracking-wide">
                        <MdCheckCircle /> {u.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200 uppercase tracking-wide">
                        <MdCancel /> {u.status}
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4 rounded-r-xl">
                    <div className="flex items-center justify-center gap-4">
                      {u.status === "Approved" ? (
                        <div className='flex gap-4'>
                          <button 
                             onClick={() => { handleapprove({ Id: u._id, status: `Declined` }) }} 
                             className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 hover:bg-orange-500 hover:text-white transition-all shadow-sm hover:shadow-md tooltip tooltip-top"
                             data-tip="Decline"
                          >
                            <RxCross1 />
                          </button>
                          <button 
                             className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm hover:shadow-md tooltip tooltip-top"
                             data-tip="Delete"
                          >
                            <MdDelete />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-4">
                          <button
                            onClick={() => { handleapprove({ Id: u._id, status: `Approved` }) }}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all shadow-sm hover:shadow-md tooltip tooltip-top"
                            data-tip="Approve"
                          >
                            <FcApprove className="text-xl" />
                          </button>
                          
                          <button
                            onClick={() => { handleapprove({ Id: u._id, status: `Declined` }) }}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white transition-all shadow-sm hover:shadow-md tooltip tooltip-top"
                            data-tip="Decline"
                          >
                            <RxCross1 />
                          </button>

                          <button 
                             className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm hover:shadow-md tooltip tooltip-top"
                             data-tip="Delete"
                          >
                            <MdDelete />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Contestmanage;