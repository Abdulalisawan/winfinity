import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Useaxiossecure from '../../Hooks/Useaxiossecure';
import Usertable from '../../Component/usertable';
import { Link } from 'react-router';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

const Alluser = () => {

  const axiossecure= Useaxiossecure()

  const{data:alluser=[], isLoading,refetch}= useQuery({
    queryKey:['Alluser'],
    queryFn:async()=>{
      const res= await axiossecure.get(`/alluser`)
      return res.data
    }
  })
  if(isLoading){
    return (<div className="flex justify-center items-center min-h-[70vh] bg-transparent">
      <div className="relative">
        {/* Outer Glow Ring */}
        <div className="w-24 h-24 border-4 border-sky-300/20 rounded-full"></div>

        {/* Spinning Ring */}
        <span className="loading loading-spinner text-sky-400 absolute top-0 left-0 w-24 h-24"></span>
      </div>
    </div>)
  }

  console.log(alluser)



    return (
        <>
   
        <div className='mb-10 text-center'>
          <h1 className='text-2xl font-semibold'>User management</h1>
        </div>
           <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th> Define Role</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
        alluser.map((User)=><Usertable key={User._id} refetch={refetch} User={User}  ></Usertable>)
      }
     
     
    </tbody>
    
    
  </table>
</div>
        </>
    );
};

export default Alluser;