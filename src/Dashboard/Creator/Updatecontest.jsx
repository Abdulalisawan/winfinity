import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from '@tanstack/react-query';
import Useaxiossecure from '../../Hooks/Useaxiossecure';
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
// NEW IMPORTS FOR DESIGN
import { motion } from 'framer-motion';
import { FaEdit, FaImage, FaFileAlt, FaListUl, FaDollarSign, FaClock } from 'react-icons/fa';

const Updatecontest = () => {
    const [deadline, setdeadline] = useState(null);
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const axiosscure = Useaxiossecure();
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: contest, isLoading: contestload } = useQuery({
        queryKey: [`contestupdatedetail`, id],
        enabled: !!id,
        queryFn: async () => {
            const result = await axiosscure.get(`/contest/detailofupdate/${id}`);
            return result.data;
        }
    });

    useEffect(() => {
        if (!contest) {
            return;
        }

        reset({
            name: contest.name,
            description: contest.description,
            taskInstruction: contest.taskInstruction,
            price: contest.price,
            prizeMoney: contest.prizeMoney,
            type: contest.type,
        });
        setdeadline(contest.deadline);

    }, [reset, contest]);

    const onsubmit = async (datacontest) => {

        let imageurl = contest.photoo;

        const photo = datacontest.image[0];

        if (photo) {
            const formdata = new FormData();
            formdata.append(`image`, photo);

            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_key}`, formdata);
            imageurl = res.data.data.url;
        }
        const updateddata = {
            name: datacontest.name,
            description: datacontest.description,
            taskInstruction: datacontest.taskInstruction,
            price: datacontest.price,
            prizeMoney: datacontest.prizeMoney,
            type: datacontest.type,
            deadline: new Date(deadline),
            photoo: imageurl
        };
        await axiosscure.patch(`/contest/update/${id}`, updateddata);
        Swal.fire("Updated!", "Contest updated successfully", "success");
        navigate('/Dashboard/creator/Createdcontest');
    };

    // LOADING STATE DESIGN
    if (contestload || !contest) {
        return (
            <div className="flex justify-center items-center min-h-[70vh] bg-transparent">
                <div className="relative">
                    <div className="w-24 h-24 border-4 border-sky-200/50 rounded-full animate-pulse"></div>
                    <span className="loading loading-spinner text-white absolute top-0 left-0 w-24 h-24"></span>
                </div>
            </div>
        );
    }

    // CUSTOM STYLES
    const inputStyle = "input w-full bg-white/50 border-none focus:bg-white focus:ring-2 focus:ring-sky-300 transition-all duration-300 placeholder-slate-400 text-slate-700 shadow-inner";
    const labelStyle = "label-text font-bold text-slate-600 flex items-center gap-2 mb-1";

    return (
        <div className="min-h-screen py-10 px-4 font-sans text-slate-700 flex justify-center items-center">
            
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-3xl bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl overflow-hidden relative"
            >
                 {/* Decorative Background Elements */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-sky-300/20 rounded-full translate-x-20 -translate-y-20 blur-3xl -z-10"></div>
                 <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400/20 rounded-full -translate-x-10 translate-y-10 blur-3xl -z-10"></div>

                {/* Header */}
                <div className="bg-gradient-to-r from-sky-400/80 to-blue-500/80 p-8 text-center relative">
                    {/* Back Button */}
                    <Link to="/Dashboard/creator/Createdcontest" className="absolute left-6 top-6 text-white text-3xl hover:scale-110 transition-transform">
                        <IoArrowBackCircleOutline />
                    </Link>

                    <h2 className="text-3xl font-extrabold text-white drop-shadow-sm tracking-wide flex items-center justify-center gap-3">
                        <FaEdit className="text-sky-100" />
                        Update Contest
                    </h2>
                    <p className="text-sky-100 mt-2 text-sm">Modify your contest details</p>
                </div>

                {/* Form Section */}
                <div className="p-8">
                    <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
                        
                        {/* Row 1: Name & Type */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className={labelStyle}><FaEdit className="text-sky-500"/> Contest Name</span>
                                </label>
                                <input
                                    type="text"
                                    className={inputStyle}
                                    {...register("name", { required: true })}
                                />
                                {errors.name && <p className="text-rose-500 text-xs mt-1 pl-1">Name is required</p>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className={labelStyle}><FaListUl className="text-sky-500"/> Contest Type</span>
                                </label>
                                <select
                                    className={`${inputStyle} appearance-none cursor-pointer`}
                                    {...register("type", { required: true })}
                                >
                                    <option value="">Select type</option>
                                    <option value="design">Image Design</option>
                                    <option value="article">Article Writing</option>
                                    <option value="business">Business Idea</option>
                                    <option value="gaming">Gaming Review</option>
                                </select>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="form-control">
                            <label className="label">
                                <span className={labelStyle}><FaImage className="text-sky-500"/> Update Image (Optional)</span>
                            </label>
                            <input
                                type="file"
                                className="file-input file-input-bordered file-input-info w-full bg-white/50 border-none text-slate-500"
                                {...register("image")}
                            />
                        </div>

                        {/* Row 2: Price & Prize Money */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className={labelStyle}><FaDollarSign className="text-sky-500"/> Entry Fee</span>
                                </label>
                                <input
                                    type="number"
                                    className={inputStyle}
                                    {...register("price", { required: true, min: 0 })}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className={labelStyle}><FaDollarSign className="text-yellow-500"/> Prize Money</span>
                                </label>
                                <input
                                    type="number"
                                    className={inputStyle}
                                    {...register("prizeMoney", { required: true, min: 0 })}
                                />
                            </div>
                        </div>

                        {/* Deadline */}
                        <div className="form-control">
                            <label className="label">
                                <span className={labelStyle}><FaClock className="text-sky-500"/> Deadline</span>
                            </label>
                            <div className="w-full">
                                <DatePicker
                                    selected={deadline ? new Date(deadline) : null}
                                    onChange={(date) => {
                                        setdeadline(date);
                                        setValue("deadline", date, { shouldValidate: true });
                                    }}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="Pp"
                                    className={inputStyle}
                                    minDate={new Date()}
                                    placeholderText="Select new deadline"
                                />
                            </div>
                        </div>

                        {/* Descriptions */}
                        <div className="form-control">
                            <label className="label">
                                <span className={labelStyle}><FaFileAlt className="text-sky-500"/> Description</span>
                            </label>
                            <textarea
                                className={`${inputStyle} h-24 pt-3`}
                                rows={4}
                                {...register("description", { required: true })}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className={labelStyle}><FaListUl className="text-sky-500"/> Task Instruction</span>
                            </label>
                            <textarea
                                className={`${inputStyle} h-24 pt-3`}
                                rows={4}
                                {...register("taskInstruction", { required: true })}
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full py-4 mt-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-sky-300/50 transition-all flex justify-center items-center gap-2 uppercase tracking-wider"
                        >
                            Update Now
                        </motion.button>

                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Updatecontest;