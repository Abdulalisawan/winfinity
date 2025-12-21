
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Usecreatorcontest } from '../../Hooks/usecreatorcontest';
import { FaCalendarAlt, FaEdit, FaListAlt, FaTrophy, FaUsers } from 'react-icons/fa';
import { MdDelete, MdOutlinePending } from 'react-icons/md';
import { Link } from 'react-router';
import Useaxiossecure from '../../Hooks/Useaxiossecure';
import Swal from 'sweetalert2';

import { motion } from 'framer-motion';


const Createdcontest = () => {
  const { data = [], isLoading } = Usecreatorcontest();
  const axiossecure=Useaxiossecure()
  const querycliuent=useQueryClient()

  const{mutate}=useMutation({
       mutationFn:async(id)=>{
        const result= await axiossecure.delete(`/contest/delete/${id}`)
        return result.data
       },
       onSuccess:()=>{
        querycliuent.invalidateQueries([`creator-contest`])

          Swal.fire("Deleted!", "Contest deleted successfully", "success");

       }
  })
  
  
 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] bg-transparent">
        <span className="loading loading-spinner text-primary w-16 h-16"></span>
      </div>
    );
  }

  return (
    <>

    <div className="min-h-screen py-10 px-4 font-sans text-slate-700">
      {/* Main Glass Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-sky-400/80 to-blue-500/80 p-8 text-center relative overflow-hidden">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative z-10"
          >
            <h1 className="text-3xl font-extrabold text-white drop-shadow-sm tracking-wide flex items-center justify-center gap-3">
              <FaListAlt className="text-sky-100" />
              My Created Contests
            </h1>
            <p className="text-sky-100 mt-2">Manage your competitions and submissions</p>
          </motion.div>
          {/* Decorative Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-20 -translate-y-20 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-sky-300/20 rounded-full -translate-x-10 translate-y-10 blur-xl"></div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto p-6">
          <table className="table w-full border-separate border-spacing-y-3">
            {/* Table Head */}
            <thead>
              <tr className="text-left text-sky-900/70 text-sm uppercase tracking-wider">
                <th className="bg-transparent font-bold p-4 pl-6">#</th>
                <th className="bg-transparent font-bold p-4">Contest Name</th>
                <th className="bg-transparent font-bold p-4">Details</th>
                <th className="bg-transparent font-bold p-4">Stats</th>
                <th className="bg-transparent font-bold p-4">Winner</th>
                <th className="bg-transparent font-bold p-4">Status</th>
                <th className="bg-transparent font-bold p-4">Submission</th>
                <th className="bg-transparent font-bold p-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data.map((contest, index) => (
                <motion.tr
                  key={contest._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                 
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                  whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                  className="shadow-sm rounded-xl transition-all duration-300 hover:shadow-md"
                >
               
                  <td className="p-4 pl-6 font-bold text-sky-600 rounded-l-xl">
                    {index + 1}
                  </td>

                  <td className="p-4 font-bold text-slate-700 text-lg">
                    {contest.name}
                  </td>

                  <td className="p-4 text-sm text-slate-500">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2" title="Created At">
                         <FaCalendarAlt className="text-sky-400"/> 
                         <span className="text-xs">Created: {new Date(contest.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-rose-500 font-medium" title="Deadline">
                         <FaCalendarAlt/> 
                         <span className="text-xs">Dead: {new Date(contest.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </td>

                
                  <td className="p-4">
                    <div className="flex flex-col gap-2">
                         <div className="flex items-center gap-2 text-slate-600 font-medium bg-slate-100/50 px-2 py-1 rounded-lg w-fit">
                            <FaUsers className="text-blue-500"/> {contest.participantsCount}
                         </div>
                         <div className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-100/50 px-2 py-1 rounded-lg w-fit">
                            <FaTrophy className="text-yellow-500"/> ${contest.prizeMoney}
                         </div>
                    </div>
                  </td>

             
                  <td className="p-4 font-mono text-xs text-slate-500">
                    {contest.winnerUserId ? (
                        <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded border border-amber-200 block truncate max-w-[100px]" title={contest.winnerUserId}>
                            {contest.winnerUserId}
                        </span>
                    ) : (
                        <span className="text-slate-400 italic">—</span>
                    )}
                  </td>

        
                  <td className="p-4">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                        contest.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 
                        contest.status === 'accepted' ? 'bg-green-100 text-green-700 border-green-200' : 
                        'bg-slate-100 text-slate-500 border-slate-200'
                     }`}>
                        {contest.status}
                     </span>
                  </td>

                  <td className="p-4">
                    {contest.issubmission === true ? (
                     <>
                     {
                      contest.winnerUserId === null ?( <Link
                        to={`/Dashboard/creator/submission/${contest._id}`}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                      >
                         View <span className="hidden xl:inline">Submissions</span>
                      </Link>):(``)
                     }
                     </>
                    ) : (
                      <span className="text-slate-300 text-sm">Inactive</span>
                    )}
                  </td> 

             
                  <td className="p-4 rounded-r-xl">
                    <div className="flex items-center justify-center gap-3">
                      {contest.status === "pending" ? (
                        <>
                          <Link
                            to={`/Dashboard/creator/updatecontest/${contest._id}`}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-100 text-sky-600 hover:bg-sky-500 hover:text-white transition-all shadow-sm hover:shadow-md"
                            title="Edit Contest"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => { mutate(contest._id) }}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-rose-100 text-rose-600 hover:bg-rose-500 hover:text-white transition-all shadow-sm hover:shadow-md"
                            title="Delete Contest"
                          >
                            <MdDelete />
                          </button>
                        </>
                      ) : (
                         <div className="tooltip" data-tip="Actions locked">
                            <MdOutlinePending className="text-slate-300 text-2xl" />
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
    </>
  );
};

export default Createdcontest;
