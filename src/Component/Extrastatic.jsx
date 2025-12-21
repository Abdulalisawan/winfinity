import { motion } from "framer-motion";
import { FaLightbulb, FaChartLine, FaUsers } from "react-icons/fa";

const items = [
  {
    icon: <FaLightbulb />,
    title: "Spark Creativity.",
    subtitle: "Explore new ideas.",
  },
  {
    icon: <FaChartLine />,
    title: "Grow Your Skills.",
    subtitle: "Learn & improve.",
  },
  {
    icon: <FaUsers />,
    title: "Join a Community.",
    subtitle: "Connect with peers.",
  },
];

const Extrastatic= () => {
  return (
    <div className="w-full max-w-7xl mx-auto rounded-2xl bg-gradient-to-r from-sky-300 via-blue-100 to-sky-100 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-sky-200">

          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 px-6 py-5 text-center md:text-left"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-sky-500 text-xl">
                {item.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="font-semibold text-slate-800">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Extrastatic;
