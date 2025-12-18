import React from 'react';
import { Usecreatorcontest } from '../../Hooks/usecreatorcontest';
import { Useallcontest } from '../../Hooks/Useallcontest';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FcApprove } from 'react-icons/fc';
import { RxCross1 } from 'react-icons/rx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Useaxiossecure from '../../Hooks/Useaxiossecure';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router';

const Contestmanage = () => {
  const queryclient=useQueryClient()
  const axiossecure=Useaxiossecure()
    const{mutate}=useMutation({
      mutationFn:async({Id,status})=>axiossecure.patch(`/contest/${Id}`,{status}),
      onSuccess:()=>{
        queryclient.invalidateQueries(['all-contest'])
        Swal.fire("Saved!", "", "success");

      }

       })

  const{data:contest , isLoading}=Useallcontest()
  console.log(contest)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] bg-transparent">
        <span className="loading loading-spinner text-primary w-16 h-16"></span>
      </div>
    );
  }


  const handleapprove=(Id,status)=>{
    Swal.fire({
  title: "Do you want to save the changes?",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Save",
  denyButtonText: `Don't save`
}).then((result) => {
  if (result.isConfirmed) {
    mutate(Id,status)
  } else if (result.isDenied) {
    Swal.fire("Changes are not saved", "", "info");
  }
});

  }
    

 



    return (
        <>
      
        <div className='mb-10 text-center'>
          <h1 className='text-2xl font-semibold'>Contest management</h1>
        </div>

        <div className="overflow-x-auto">
  <table className="table table-zebra">
   
    <thead>
      <tr>
        <th>Contest name</th>
        <th>Created At</th>
        <th>creator email</th>
        <th>Status</th>
        <th>Approve/Decline</th>
      </tr>
    </thead>
    <tbody>
       


        
      {
        contest.map((u,idx)=>(
        <tr key={idx}>
       
        <td>{u.name}</td>
        <td>{u.createdAt}</td>
        <td>{u.creatorEmail}</td>
        {
          u.status === 'Approved'?(<td className='text-green-600 font-semibold'>{u.status}</td>):(<td className='text-red-600 font-semibold'>{u.status}</td>)
        }
        <td>
  {u.status === "Approved" ? (
    <div className='flex gap-9'>
    <button onClick={()=>{handleapprove({Id:u._id, status:`Declined`})}} className='text-orange-500 text-xl hover:scale-110 transition'>
      <RxCross1 />
    </button>
    <button className='text-red-500 text-xl hover:scale-110 transition'>
      <MdDelete />
    </button>
    </div>
  ) : (
    <div  className="flex gap-2">
      <button   onClick={()=>{handleapprove({Id:u._id, status:`Approved`})}}  className='text-red-500 text-xl hover:scale-110 transition'>
        <FcApprove />
      </button>
      <button onClick={()=>{handleapprove({Id:u._id, status:`Declined`})}} className='text-red-600 text-xl hover:scale-110 transition'>
        <RxCross1 />
      </button>

      <button className='text-red-500 text-xl hover:scale-110 transition'>
      <MdDelete />
    </button>
    </div>
  )}

  {

  }
 

 

</td>


        </tr>
        
        ))
      }

       
      

     
     
    </tbody>
  </table>
</div>
            
        </>
    );
};

export default Contestmanage;