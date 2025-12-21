import React from 'react';
import Userole from '../Hooks/Userole';

const Winpercentage = () => {
    const{Dbuser}=Userole()
    const participated =Dbuser.participatedCount
    const won=Dbuser.wins
    const percentage = participated === 0 ? 0 : Math.round((won / participated) * 100);
    

    return (
         <div className="card bg-white  shadow-md p-6 flex flex-col items-center">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Win Percentage
      </h3>

      <div
        className="radial-progress text-sky-500"
        style={{
          "--value": percentage,
          "--size": "9rem",
          "--thickness": "10px",
        }}
        role="progressbar"
      >
        <span className="text-2xl font-bold text-slate-800">
          {percentage}%
        </span>
      </div>

      <p className="text-sm text-slate-600 mt-3">
        {won} wins out of {participated} contests
      </p>
    </div>
    );
};

export default Winpercentage;