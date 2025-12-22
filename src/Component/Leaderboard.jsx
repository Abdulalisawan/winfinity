import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiospublic from '../Hooks/Axiospublic';
import { FaTrophy, FaMedal, FaCrown } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const { data: leaderboard = [], isLoading } = useQuery({
    queryKey: [`leaderboard`],
    queryFn: async () => {
      const result = await axiospublic.get(`/leaderbord`);
      return result.data;
    }
  });

  // Helper function for rank styles
  const getRankStyle = (index) => {
    switch (index) {
      case 0:
        return {
          icon: <FaCrown className="text-yellow-500 text-3xl drop-shadow-lg" />,
          color: "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10",
          badge: "bg-yellow-100 text-yellow-700 border-yellow-300"
        };
      case 1:
        return {
          icon: <FaMedal className="text-gray-400 text-2xl" />,
          color: "border-gray-400 bg-gray-50 dark:bg-gray-800/20",
          badge: "bg-gray-100 text-gray-600 border-gray-300"
        };
      case 2:
        return {
          icon: <FaMedal className="text-orange-400 text-2xl" />,
          color: "border-orange-400 bg-orange-50 dark:bg-orange-900/10",
          badge: "bg-orange-100 text-orange-700 border-orange-300"
        };
      default:
        return {
          icon: <span className="font-bold text-gray-500 font-mono">#{index + 1}</span>,
          color: "border-transparent bg-base-100 hover:bg-base-200",
          badge: "bg-base-200"
        };
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="relative w-24 h-24">
          <div className="w-full h-full border-4 border-sky-300/20 rounded-full animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full border-t-4 border-sky-400 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Split data into Top 3 (Podium) and the rest
  const topThree = leaderboard.slice(0, 3);
  const restOfList = leaderboard.slice(3);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      {/* --- Header --- */}
      <div className="text-center mb-12 space-y-2">
        <h2 className="text-4xl font-black tracking-tight text-base-content flex items-center justify-center gap-3">
          <FaTrophy className="text-yellow-500 drop-shadow-md" />
          <span>Leaderboard</span>
        </h2>
        <p className="text-base-content/60 font-medium">Celebrating our top achievers</p>
      </div>

      {/* --- Podium Section (Top 3) --- */}
      {topThree.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
          
          {/* 2nd Place (Left) */}
          {topThree[1] && (
             <PodiumCard user={topThree[1]} rank={1} delay={0.2} />
          )}

          {/* 1st Place (Center - Biggest) */}
          {topThree[0] && (
            <PodiumCard user={topThree[0]} rank={0} delay={0} isWinner={true} />
          )}

          {/* 3rd Place (Right) */}
          {topThree[2] && (
            <PodiumCard user={topThree[2]} rank={2} delay={0.4} />
          )}
        </div>
      )}

      {/* --- List Section (Rank 4+) --- */}
      <div className="flex flex-col gap-3">
        {restOfList.map((user, index) => {
          const actualRank = index + 3; // Because 0,1,2 are in podium
          const { icon, color } = getRankStyle(actualRank);

          return (
            <motion.div
              key={user._id || index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center justify-between p-4 rounded-xl border-l-4 shadow-sm transition-all hover:scale-[1.01] ${color}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 text-center">{icon}</div>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring-2 ring-base-200">
                      <img src={user.photoURL} alt={user.name} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg">{user.name}</h3>
                    <p className="text-xs text-base-content/50 uppercase tracking-wider font-semibold">Competitor</p>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 justify-end font-bold text-xl text-primary">
                  {user.wins}
                  <FaTrophy className="text-sm opacity-50" />
                </div>
                <span className="text-xs text-base-content/50 font-medium">Wins</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  // Internal component for the Top 3 cards to keep code clean
  function PodiumCard({ user, rank, delay, isWinner = false }) {
    const { icon, color, badge } = getRankStyle(rank);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, type: "spring", stiffness: 120 }}
        className={`relative flex flex-col items-center p-6 rounded-2xl border-2 shadow-xl backdrop-blur-sm 
          ${isWinner ? 'md:-mt-12 z-10 bg-gradient-to-b from-yellow-50/50 to-white/50 border-yellow-400' : 'bg-base-100 ' + color.split(' ')[0]}
        `}
      >
        {/* Absolute Rank Badge */}
        <div className={`absolute -top-4 px-4 py-1 rounded-full text-sm font-bold shadow-sm ${badge}`}>
           #{rank + 1} Place
        </div>

        {/* Crown/Medal Icon */}
        <div className="mb-3 mt-2">{icon}</div>

        {/* Avatar */}
        <div className="avatar mb-3">
          <div className={`rounded-full p-1 border-2 ${isWinner ? 'w-24 h-24 border-yellow-400 ring-4 ring-yellow-400/20' : 'w-20 h-20 border-base-300'}`}>
            <img src={user.photoURL} alt={user.name} className="rounded-full" />
          </div>
        </div>

        {/* Name */}
        <h3 className={`font-bold text-center mb-1 ${isWinner ? 'text-2xl' : 'text-xl'}`}>
          {user.name}
        </h3>
        
        {/* Stats */}
        <div className="badge badge-lg badge-ghost gap-2 mt-2">
          <FaTrophy className={isWinner ? "text-yellow-500" : "text-base-content/50"} />
          <span className="font-bold">{user.wins} Wins</span>
        </div>
      </motion.div>
    );
  }
};

export default Leaderboard;