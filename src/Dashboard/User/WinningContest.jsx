import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Useaxiossecure from '../../Hooks/Useaxiossecure';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import { motion } from 'framer-motion'; 

const WinningContest = () => {
    const axiossecure = Useaxiossecure();
    

    const { data: winning, isLoading } = useQuery({
        queryKey: [`winning-contest`],
        queryFn: async () => {
            const result = await axiossecure.get(`/winning-list`);
            return result.data;
        }
    });
    console.log(winning);

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
                        <h1 className="text-4xl font-extrabold text-white drop-shadow-md tracking-wide uppercase">
                            My Winning List
                        </h1>
                        <p className="text-sky-100 mt-2 text-lg">Celebrating your victories and achievements</p>
                    </motion.div>
                
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-10 -translate-y-10 blur-xl"></div>
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-sky-300/20 rounded-full translate-x-10 translate-y-10 blur-xl"></div>
                </div>

                <div className="overflow-x-auto p-6">
                    <table className="table w-full border-separate border-spacing-y-3">
                  
                        <thead>
                            <tr className="text-left text-sky-900/70 text-sm uppercase tracking-wider">
                                <th className="bg-transparent font-bold p-4">#</th>
                                <th className="bg-transparent font-bold p-4">Contest Name</th>
                                <th className="bg-transparent font-bold p-4">Contest Id</th>
                                <th className="bg-transparent font-bold p-4">Prize Money</th>
                            </tr>
                        </thead>
                        
                        <tbody>
    {winning.map((list, idx) => (
        <motion.tr 
            key={list._id || idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
         
            style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }} 
            whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.6)" }}
            className="shadow-sm rounded-xl transition-all duration-300 group cursor-pointer"
        >
            <td className="p-4 font-bold text-sky-600 rounded-l-xl">
                {idx + 1}
            </td>
            <td className="p-4 font-medium text-slate-800">
                <div className="flex items-center gap-3">
                    <div className="bg-sky-100 p-2 rounded-full text-sky-500">
                        <FaMedal />
                    </div>
                    {list.contestname}
                </div>
            </td>
            <td className="p-4 text-slate-500 font-mono text-xs">
                {list.contestID}
            </td>
            <td className="p-4 rounded-r-xl">
                <div className="flex items-center gap-2 font-bold text-emerald-600 bg-emerald-100/50 py-1 px-3 rounded-full w-fit">
                    <FaTrophy className="text-yellow-500" />
                    <span>${list.prizemoney}</span>
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

export default WinningContest;