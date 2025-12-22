import React from "react";
import { FaSearch, FaCreditCard, FaUpload, FaTrophy, FaUser, FaUserTie, FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";

const HowItWorks = () => {
 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, type: "spring" }
    }
  };

  const steps = [
    {
      icon: <FaSearch />,
      title: "Discover Contests",
      desc: "Browse admin-approved contests by category and find the one that matches your skills.",
      color: "text-blue-500",
      bg: "bg-blue-100"
    },
    {
      icon: <FaCreditCard />,
      title: "Join & Pay",
      desc: "Securely pay the entry fee to register and unlock contest participation instantly.",
      color: "text-purple-500",
      bg: "bg-purple-100"
    },
    {
      icon: <FaUpload />,
      title: "Submit Task",
      desc: "Upload your best work before the deadline using our secure submission dashboard.",
      color: "text-pink-500",
      bg: "bg-pink-100"
    },
    {
      icon: <FaTrophy />,
      title: "Win Prizes",
      desc: "Winners are declared by creators, earning rewards and platform-wide recognition.",
      color: "text-yellow-500",
      bg: "bg-yellow-100"
    },
  ];

  const roles = [
    {
      title: "Participant",
      icon: <FaUser />,
      desc: "Join contests, submit tasks, track progress, and win exciting prizes.",
      style: "border-blue-200 bg-blue-50/50 hover:border-blue-400"
    },
    {
      title: "Contest Creator",
      icon: <FaUserTie />,
      desc: "Launch contests, review creative submissions, and select the champions.",
      style: "border-purple-200 bg-purple-50/50 hover:border-purple-400"
    },
    {
      title: "Admin",
      icon: <FaUserShield />,
      desc: "Oversee the platform, approve contests, and ensure community quality.",
      style: "border-emerald-200 bg-emerald-50/50 hover:border-emerald-400"
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 px-4 py-20 overflow-hidden relative">
     
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
      
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="badge badge-primary badge-outline mb-4 p-4 font-semibold uppercase tracking-widest">Guide</div>
          <h1 className="text-4xl md:text-6xl font-black text-base-content mb-6 leading-tight">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">ContestHub</span> Works
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            From discovering opportunities to claiming your victory — we've streamlined the process into four simple steps.
          </p>
        </motion.div>

     
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative mb-32"
        >
         
          <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-blue-100 via-purple-100 to-yellow-100 -z-10 transform scale-x-90"></div>

          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-base-100 rounded-3xl p-8 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300"
            >
              
              <span className="absolute top-4 right-6 text-8xl font-black text-base-200/50 select-none group-hover:text-base-300/50 transition-colors">
                0{idx + 1}
              </span>

              <div className={`w-16 h-16 ${step.bg} ${step.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                {step.icon}
              </div>

              
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
              <p className="text-base-content/60 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

       
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Role</h2>
            <p className="text-base-content/60">ContestHub offers tailored features for everyone.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className={`card border-2 ${role.style} transition-all duration-300 cursor-default`}
              >
                <div className="card-body items-center text-center">
                  <div className="p-4 bg-white rounded-full shadow-sm mb-2 text-2xl text-gray-700">
                    {role.icon}
                  </div>
                  <h3 className="card-title text-xl font-bold">{role.title}</h3>
                  <p className="text-sm text-gray-600">
                    {role.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default HowItWorks;