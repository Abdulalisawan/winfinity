import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

const WinnerBanner = () => {

    const winners = [
    { id: 1, img: "https://i.pravatar.cc/150?u=11", prize: "$250" },
    { id: 2, img: "https://i.pravatar.cc/150?u=12", prize: "$1,200" },
    { id: 3, img: "https://i.pravatar.cc/150?u=13", prize: "$2,230" },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#D0E7FF] via-[#E8F3FF] to-[#D0E7FF] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-sm border border-white"
      >
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-10 w-2 h-2 bg-yellow-400 rotate-45 opacity-60" />
          <div className="absolute bottom-10 right-20 w-3 h-3 bg-sky-400 rounded-full opacity-40" />
          <div className="absolute top-1/2 right-10 w-24 h-24 bg-white/30 rounded-full blur-2xl" />
         
          <svg className="absolute right-0 top-0 h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="flex -space-x-4 md:-space-x-8 mb-10 md:mb-0 relative z-10">
          {winners.map((winner, index) => (
            <motion.div 
              key={winner.id}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="avatar">
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl ring-1 ring-sky-100">
                  <img src={winner.img} alt="Contest Winner" />
                </div>
              </div>
           
              <div className="absolute -top-1 -right-1 bg-yellow-400 p-1.5 md:p-2 rounded-full shadow-lg border-2 border-white">
                <FaTrophy className="text-white text-[10px] md:text-sm" />
              </div>

             
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md border border-sky-50">
                <span className="text-sky-600 font-bold text-[10px] md:text-sm">{winner.prize}</span>
              </div>
            </motion.div>
          ))}
        </div>

       
        <div className="text-center md:text-left relative z-10 md:ml-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
            You could the <br /> next winner!
          </h2>
          <p className="mt-4 text-lg md:text-xl font-semibold text-slate-700 opacity-90">
            Total Winners: <span className="text-sky-600">15,000+</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default WinnerBanner;
