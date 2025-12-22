import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiospublic from '../Hooks/Axiospublic';
import COntesttable from './COntesttable';
import { useSearchParams } from 'react-router';
// NEW IMPORTS FOR DESIGN
import { motion } from 'framer-motion';
import { FaTrophy, FaShapes } from 'react-icons/fa';

const Allcontest = () => {

    const { data: allcontest, isPending, isError } = useQuery({
        queryKey: ['All-contest'],
        queryFn: async () => {
            const result = await axiospublic.get(`/contest/status/approved`)
            return (result.data)

        }

    })

    const ITEMS_PER_PAGE = 10;

const [searchParams, setSearchParams] = useSearchParams();
const pageFromUrl = Number(searchParams.get('page')) || 1;
const [page, setPage] = React.useState(pageFromUrl);

React.useEffect(() => {
    setSearchParams({ page });
}, [page, setSearchParams]);

    
    if (isPending) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-transparent">
                <div className="relative">
             
                    <div className="w-24 h-24 border-4 border-sky-300/50 rounded-full animate-pulse shadow-[0_0_15px_rgba(125,211,252,0.5)]"></div>
                   
                    <span className="loading loading-spinner text-white absolute top-0 left-0 w-24 h-24"></span>
                </div>
            </div>
        )
    }

   
    if (isError) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[50vh] text-center space-y-4">
                <h2 className="text-3xl font-bold text-rose-500">Oops!</h2>
                <p className="text-slate-600 text-lg">Error happend check evrything again</p>
            </div>
        )
    }

    const totalPages = Math.ceil(allcontest.length / ITEMS_PER_PAGE);

const paginatedContests = allcontest.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
);
    
    return (
        <div className="min-h-screen py-10 px-4 font-sans text-slate-700 relative overflow-hidden">
            
           
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full -translate-x-20 -translate-y-20 blur-3xl -z-10"></div>
            <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-400/20 rounded-full translate-x-20 blur-3xl -z-10"></div>

            <motion.div 
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 relative z-10"
            >
                <div className="inline-block p-4 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-xl mb-4">
                    <FaShapes className="text-4xl text-sky-600" />
                </div>
                
                <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-blue-900 drop-shadow-sm tracking-wide">
                    ᗩᒪᒪ ᑕOᑎTEᔕT
                </h1>
                
                <p className="mt-4 text-xl font-medium text-sky-800 flex items-center justify-center gap-2">
                    <FaTrophy className="text-yellow-500 animate-bounce" /> 
                    Join now & Win now
                </p>
            </motion.div>

           
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className='max-w-[1400px] mx-auto'
            >
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {
                        paginatedContests.map((contest, index) => (
                            <motion.div
                                key={contest._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }} 
                                whileHover={{ y: -10 }} 
                                className="h-full"
                            >
                                
                                <div className="h-full transform transition-all duration-300">
                                    <COntesttable contest={contest}></COntesttable>
                                </div>
                            </motion.div>
                        ))
                    }
                </div>
            </motion.div>
            <div className="flex justify-center items-center gap-2 mt-14 flex-wrap">
    <button
        onClick={() => setPage(p => Math.max(1, p - 1))}
        disabled={page === 1}
        className="btn btn-sm"
    >
        Prev
    </button>

    {[...Array(totalPages).keys()].map(num => (
        <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`btn btn-sm ${page === num + 1 ? 'btn-active' : ''}`}
        >
            {num + 1}
        </button>
    ))}

    <button
        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
        className="btn btn-sm"
    >
        Next
    </button>
</div>

            
        </div>
    );
};

export default Allcontest;