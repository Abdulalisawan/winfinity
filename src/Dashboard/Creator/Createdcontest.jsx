
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Usecreatorcontest } from '../../Hooks/usecreatorcontest';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router';
import Useaxiossecure from '../../Hooks/Useaxiossecure';
import Swal from 'sweetalert2';
import { IoArrowBackCircleOutline } from 'react-icons/io5';


const Createdcontest = () => {
  const { data = [], isLoading } = Usecreatorcontest();
  const axiossecure=Useaxiossecure()
  const querycliuent=useQueryClient()

  const{mutate}=useMutation({
       mutationFn:async(id)=>{
        const result= await axiossecure.delete(`/contest/delete/${id}`)
        return result.data
       },
       onSuccess:()=>{
        querycliuent.invalidateQueries([`creator-contest`])

          Swal.fire("Deleted!", "Contest deleted successfully", "success");

       }
  })
  
  
 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] bg-transparent">
        <span className="loading loading-spinner text-primary w-16 h-16"></span>
      </div>
    );
  }

  return (
    <>

    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead className='bg-base-200'>
          <tr>
            <th>#</th>
            <th>Contest Name</th>
            <th>Created At(mm/dd/yy)</th>
            <th>DeadLine(mm/dd/yy)</th>
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
              <td>{
                 new Date(contest.deadline).toLocaleDateString()
                  
                }</td>
              <td>{contest.participantsCount}</td>
              <td>${contest.prizeMoney}</td>
              <td>{contest.winnerUserId ? `${contest.winnerUserId}` : "—"}</td>
              <td className='capitalize'>{contest.status}</td>
              <td className='capitalize'>{
                
                  contest.issubmission === true ?(<Link to={`/Dashboard/creator/submission/${contest._id}`} className='  px-2 py-2 bg-emerald-700 text-white font-semibold '>Submission</Link>):('')

                }</td>
           

              <td className='flex gap-3'>
                {contest.status === "pending" && (
                  <>
                    <Link to={`/Dashboard/creator/updatecontest/${contest._id}`} className='text-green-500 text-xl hover:scale-110 transition'>
                      <FaEdit />
                    </Link>
                    <button onClick={()=>{mutate(contest._id)}} className='text-red-600 text-xl hover:scale-110 transition'>
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
    </>
  );
};

export default Createdcontest;
