import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Useaxiossecure from '../../Hooks/Useaxiossecure';
import Usertable from '../../Component/usertable';
import { Link } from 'react-router';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
// NEW IMPORTS FOR DESIGN
import { motion } from 'framer-motion';
import { FaUsersCog } from 'react-icons/fa';

const Alluser = () => {

  const axiossecure = Useaxiossecure()

  const { data: alluser = [], isLoading, refetch } = useQuery({
    queryKey: ['Alluser'],
    queryFn: async () => {
      const res = await axiossecure.get(`/alluser`)
      return res.data
    }
  })

  // LOADING STATE DESIGN
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
    )
  }

  console.log(alluser)

  return (
    <div className="min-h-screen py-10 px-4 font-sans text-slate-700">
      {/* Main Glass Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl shadow-xl overflow-hidden relative"
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
              <FaUsersCog className="text-sky-100" />
              User Management
            </h1>
            <p className="text-sky-100 mt-2 text-sm">Oversee and manage platform members</p>
          </motion.div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto p-6">
          <table className="table w-full border-separate border-spacing-y-2">
            {/* head */}
            <thead>
              <tr className="text-left text-sky-900/70 text-sm uppercase tracking-wider border-b border-sky-100">
                <th className="bg-transparent p-4 pl-6 rounded-l-lg">
                  <label>
                    <input type="checkbox" className="checkbox checkbox-info border-sky-400/50" />
                  </label>
                </th>
                <th className="bg-transparent font-bold p-4">Name</th>
                <th className="bg-transparent font-bold p-4">Email</th>
                <th className="bg-transparent font-bold p-4">Role</th>
                <th className="bg-transparent font-bold p-4">Define Role</th>
                <th className="bg-transparent p-4 rounded-r-lg"></th>
              </tr>
            </thead>
            
            <tbody className="space-y-4">
              {
                alluser.map((User) => (
                   // Note: Styling for rows should be inside the Usertable component, 
                   // but the container here will make sure they fit the theme.
                   <Usertable key={User._id} refetch={refetch} User={User} ></Usertable>
                ))
              }
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Alluser;