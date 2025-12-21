import React from 'react';
import { Link } from 'react-router'; // or 'react-router-dom' depending on your version
import { motion } from 'framer-motion';
import { FaHome, FaSearch } from 'react-icons/fa';

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-sky-300 flex items-center justify-center p-4 relative overflow-hidden font-sans">
            
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full -translate-x-20 -translate-y-20 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400/20 rounded-full translate-x-20 translate-y-20 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-sky-100/20 rounded-full blur-2xl"></div>

            {/* Main Glass Card */}
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="max-w-md w-full bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl shadow-2xl p-10 text-center relative z-10"
            >
                {/* 404 Animation */}
                <motion.div 
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ repeat: Infinity, duration: 2, repeatType: "reverse", ease: "easeInOut" }}
                    className="mb-2"
                >
                    <h1 className="text-9xl font-extrabold text-white drop-shadow-md tracking-tighter">
                        404
                    </h1>
                </motion.div>

                {/* Error Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-2xl font-bold text-sky-900 mb-2">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-slate-700 mb-8 text-sm leading-relaxed">
                        It looks like you've wandered into the clouds. <br/>
                        The page you are looking for doesn't exist or has been moved.
                    </p>

                    {/* Action Button */}
                    <Link to="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn border-none bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-sky-400/50 transition-all flex items-center justify-center gap-2 mx-auto w-full sm:w-auto"
                        >
                            <FaHome className="text-lg" />
                            Back to Home
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Footer Text */}
            <div className="absolute bottom-4 text-sky-700/50 text-xs font-semibold">
                Lost in space?
            </div>
        </div>
    );
};

export default ErrorPage;