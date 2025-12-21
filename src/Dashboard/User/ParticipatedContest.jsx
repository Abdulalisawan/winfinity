import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Useaxiossecure from '../../Hooks/Useaxiossecure';
import { motion } from 'framer-motion'; 
import { FaClipboardList, FaCheckCircle, FaClock, FaHashtag } from 'react-icons/fa'; 

const ParticipatedContest = () => {
    const axiossecure = Useaxiossecure();
    
    
    const { data: paymentdetail, isLoading } = useQuery({
        queryKey: [`paymentdetailofuser`],
        queryFn: async () => {
            const result = await axiossecure.get(`/paymentdetail-user`);
            return result.data;
        },
        select:(data)=>{
            return data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[70vh] bg-transparent">
                <div className="relative">
                 
                    <div className="w-24 h-24 border-4 border-sky-200/50 rounded-full animate-pulse"></div>
                    <span className="loading loading-spinner text-white absolute top-0 left-0 w-24 h-24"></span>
                </div>
            </div>
        );
    }

 
    return (
        <div className="min-h-screen py-10 px-4 font-sans text-slate-700">
            
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl shadow-xl overflow-hidden"
            >
                
                <div className="bg-gradient-to-r from-sky-400/80 to-blue-500/80 p-8 text-center relative overflow-hidden">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="relative z-10"
                    >
                        <h1 className="text-3xl font-extrabold text-white drop-shadow-sm tracking-wide flex items-center justify-center gap-3">
                            <FaClipboardList className="text-sky-100" />
                            Participated Contest
                        </h1>
                        <p className="text-sky-100 mt-2">Track your active enrollments and status</p>
                    </motion.div>
                    
                    
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-10 -translate-y-10 blur-xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-300/20 rounded-full -translate-x-5 translate-y-5 blur-xl"></div>
                </div>

              
                <div className="overflow-x-auto p-6">
                    <table className="table w-full border-separate border-spacing-y-3">
                        
                        <thead>
                            <tr className="text-left text-sky-900/70 text-sm uppercase tracking-wider">
                                <th className="bg-transparent font-bold p-4 pl-6">Contest Name</th>
                                <th className="bg-transparent font-bold p-4">Contest ID</th>
                                <th className="bg-transparent font-bold p-4">Deadline</th>
                                <th className="bg-transparent font-bold p-4">Payment Status</th>
                            </tr>
                        </thead>

                     
                        <tbody>
                            {paymentdetail.map((payment, idx) => (
                                <motion.tr 
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                               
                                    style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                                    whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                                    className="shadow-sm rounded-xl transition-all duration-300 group hover:shadow-md"
                                >
                                 
                                    <td className="p-4 pl-6 font-bold text-slate-700 rounded-l-xl">
                                        {payment.namu}
                                    </td>
                                    
                                   
                                    <td className="p-4 text-slate-500 font-mono text-xs">
                                        <div className="flex items-center gap-2">
                                            <FaHashtag className="text-sky-300 text-[10px]" />
                                            {payment.contestId}
                                        </div>
                                    </td>
                                    
                                    
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-rose-500 bg-rose-50/50 px-3 py-1 rounded-full w-fit text-sm font-medium border border-rose-100">
                                            <FaClock />
                                            {payment.deadline}
                                        </div>
                                    </td>
                                    
                                 
                                    <td className="p-4 rounded-r-xl">
                                        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-100/80 px-3 py-1 rounded-full w-fit font-bold text-sm shadow-sm">
                                            <FaCheckCircle />
                                            {payment.paymentStatus}
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

export default ParticipatedContest;