import React from 'react';
import { Usecreatorcontest } from '../../Hooks/usecreatorcontest';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const Createdcontest = () => {
  const { data = [], isLoading } = Usecreatorcontest();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] bg-transparent">
        <span className="loading loading-spinner text-primary w-16 h-16"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead className='bg-base-200'>
          <tr>
            <th>#</th>
            <th>Contest Name</th>
            <th>Created At</th>
            <th>Participants</th>
            <th>Prize Money</th>
            <th>Winner</th>
            <th>Status</th>
            <th>Submission</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((contest, index) => (
            <tr key={contest._id}>
              <td>{index + 1}</td>
              <td className='font-semibold'>{contest.name}</td>
              <td>{new Date(contest.createdAt).toLocaleDateString()}</td>
              <td>{contest.participantsCount}</td>
              <td>${contest.prizeMoney}</td>
              <td>{contest.winnerUserId ? "Declared" : "—"}</td>
              <td className='capitalize'>{contest.status}</td>
           

              <td className='flex gap-3'>
                {contest.status === "pending" && (
                  <>
                    <button className='text-green-500 text-xl hover:scale-110 transition'>
                      <FaEdit />
                    </button>
                    <button className='text-red-600 text-xl hover:scale-110 transition'>
                      <MdDelete />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Createdcontest;
