import React, { useState } from "react";
import { HiSearch, HiSparkles } from "react-icons/hi"; // Added Sparkles for creativity
import { motion, AnimatePresence } from "framer-motion"; // Animation package
import { Link } from "react-router";

const HeroSection = ({ search, setsearch, results, isLoading }) => {
  const [localText, setLocalText] = useState("");

  const categories = [
    "Design",
    "Writing",
    "Business Ideas",
    "Game Reviews",
    "Photography",
    "Coding",
    "Article",
  ];

  const triggerSearch = (value) => {
    const cleaned = value.trim();
    setLocalText(value);
    setsearch(cleaned ? cleaned.toLowerCase() : "");
  };

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center px-4  overflow-hidden">
      
      {/* Decorative Background Elements (floating blobs that blend with skyblue) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl mix-blend-overlay animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl mix-blend-overlay"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full text-center space-y-8 relative z-10"
      >
        {/* Main Heading */}
        <div className="space-y-2">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-sky-900 font-semibold text-sm shadow-sm mb-4"
            >
                <HiSparkles className="text-yellow-500" /> Discover Your Potential
            </motion.div>
            
            <h1 className="text-5xl  md:text-7xl font-extrabold text-blue-500 drop-shadow-sm tracking-tight leading-tight">
            Where talent rises and <br />
            <span className=" text-blue-800 bg-clip-text ">
                champions emerge.
            </span>
            </h1>

            <p className="text-sky-900/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Search contests by type (Design, Writing, Article, Coding…)
            </p>
        </div>

       
        <div className="relative max-w-2xl mx-auto w-full group">
          <div className="relative transform transition-all duration-300 hover:scale-[1.01]">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sky-500 text-2xl">
              <HiSearch />
            </span>

            <input
              type="text"
              value={localText}
              onChange={(e) => triggerSearch(e.target.value)}
              placeholder="Search by contest type..."
              className="w-full h-16 pl-16 pr-6 rounded-full border-2 border-white/50 bg-white/70 backdrop-blur-xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-sky-300/40 focus:bg-white text-slate-700 text-lg placeholder-slate-400 transition-all"
            />
          </div>

       
          <AnimatePresence>
  {search && (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
      className="
        relative
        w-full
        bg-white/80
        backdrop-blur-2xl
        shadow-xl
        rounded-2xl
        mt-4
        mb-3
        z-50
        max-h-[60vh]
        overflow-y-auto
        border
        border-white/50
      "
    >
      {isLoading ? (
        <div className="p-8 flex flex-col items-center text-sky-600">
          <span className="loading loading-spinner loading-md"></span>
          <p className="text-sm mt-2">Searching...</p>
        </div>
      ) : results.length > 0 ? (
        results.map((contest) => (
          <motion.div
            key={contest._id}
            className="px-6 py-4 hover:bg-sky-50 cursor-pointer border-b last:border-none"
          >
            <Link to={`/contest/detail/${contest._id}`}>
            <p className="font-bold text-slate-700 text-lg">
              {contest.name }
            </p>
            <span className="inline-block mt-1 text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded">
              Type: {contest.type}
            </span>
            </Link>
          </motion.div>
        ))
      ) : (
        <div className="p-6 text-slate-500">No results found</div>
      )}
    </motion.div>
  )}
</AnimatePresence>

        </div>

   
        {!search && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center  gap-3 mt-8"
          >
            {categories.map((item, index) => (
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#ffffff" }}
                whileTap={{ scale: 0.95 }}
                key={item}
                onClick={() => triggerSearch(item)}
                className="px-6 py-2.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-full text-slate-700 font-semibold shadow-sm hover:shadow-md hover:text-sky-600 transition-all text-sm"
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default HeroSection;