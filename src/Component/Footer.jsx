import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-4 ">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="  bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50 p-8 md:p-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              {/* Using the logo style from your brand assets */}
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-sky-400 rounded-xl text-white font-bold text-2xl shadow-lg shadow-sky-200">
                W
              </div>
              <span className="text-2xl font-bold text-slate-800 tracking-tight">Winfinity</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Empowering creators to showcase their talent and win amazing prizes across the globe.
            </p>
            <p className="text-slate-400 text-sm font-medium">
              © 2025 Winfinity
            </p>
          </div>

          {/* Navigation Columns */}
          <div>
            <h4 className="font-bold text-slate-800 mb-6">Company</h4>
            <ul className="space-y-4 text-sky-600 font-medium">
              <li><a href="#" className="hover:text-sky-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-6">Resources</h4>
            <ul className="space-y-4 text-sky-600 font-medium">
              <li><a href="#" className="hover:text-sky-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

         
          <div>
            <h4 className="font-bold text-slate-800 mb-6">Connect With Us</h4>
            <div className="flex gap-4">
              <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#" 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-sky-100 text-sky-500 shadow-sm hover:shadow-md hover:border-sky-200 transition-all"
              >
                <FaFacebookF size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#" 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-sky-100 text-sky-500 shadow-sm hover:shadow-md hover:border-sky-200 transition-all"
              >
                <FaLinkedinIn size={20} />
              </motion.a>
            </div>
          </div>

        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;