import React from 'react';
import { Link } from 'react-router';

const COntesttable = ({contest}) => {





 return (



<>  

<div className=" rounded-2xl overflow-hidden bg-gradient-to-br from-sky-100 to-white shadow-lg p-4 md:p-5">
  
  {/* Thumbnail */}
  <div className="rounded-xl overflow-hidden bg-white/40 backdrop-blur-sm border border-white/50">
    <img
      src={`${contest.photoo}`}
      alt="contest"
      className="w-full h-40 md:h-44 object-cover"
    />
  </div>

  {/* Title & Description */}
  <div className="mt-4">
    <h3 className="text-lg font-semibold text-sky-900">
      {contest.name}
    </h3>

    <p className="text-sm  h-20 text-sky-800/80 mt-1">
      {contest.description}
    </p>
  </div>

  {/* Bottom section */}
  <div className="mt-4 flex items-center justify-between">
    
    {/* Left: Tag + Participants */}
    <div className="flex items-center gap-3">
      
      {/* Tag */}
      <span className="px-3 py-1 text-xs rounded-full bg-white/80 border border-white/60 text-sky-700 font-medium">
        {contest.type}
      </span>

      {/* Participants */}
      <div className="flex items-center gap-1 text-sky-700">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
          <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z" 
                stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span className="text-sm font-medium">{contest.participantsCount}</span>
      </div>

    </div>

    {/* Details Button */}
    <Link to={`/contest/detail/${contest._id}`} className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold shadow">
      Details
    </Link>

  </div>
</div>
    
    </>

    );
};

export default COntesttable;