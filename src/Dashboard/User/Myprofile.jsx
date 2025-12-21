import React, {  useState } from 'react';
import { FaBirthdayCake, FaEdit, FaEnvelope, FaPhone } from 'react-icons/fa';
import Userole from '../../Hooks/Userole';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Useaxiossecure from '../../Hooks/Useaxiossecure';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import User from './User';
import { Authcontext } from '../../Auth/Authcontext';
import Winpercentage from '../../Component/Winpercentage';

const Myprofile = () => {
    const{Dbuser,isLoading}=Userole()
    
    const{handleSubmit,register}=useForm()
    const axiossecure=Useaxiossecure()
    const queryclient=useQueryClient()
   const [modalType, setModalType] = useState('');
   const[modalvalue,setmodalvalue]=useState()

    const{mutate}=useMutation({
        mutationFn:async(data)=>{
            const result=await axiossecure.patch(`/editprofileinfo`,data)
            return result.data 
        },
        onSuccess:()=>{
            queryclient.invalidateQueries([`Dbuser`])
            Swal.fire({
                title:`Update done`
            })
            setModalType(``)
            

        }

    })

    const handlephoto=async(data)=>{
        
        

     

        
        
        if(data.photoURL && data.photoURL.length > 0){

            const formdata= new FormData()
            formdata.append(`image`,data.photoURL[0])

            const res= await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_key}`,formdata);
            mutate({photoURL:res.data.data.url})

        }




        

    }
  


if(isLoading){
   return( <div className="flex justify-center items-center min-h-[70vh] bg-transparent">
      <div className="relative">
        
        <div className="w-24 h-24 border-4 border-sky-300/20 rounded-full"></div>

 
        <span className="loading loading-spinner text-sky-400 absolute top-0 left-0 w-24 h-24"></span>
      </div>
    </div>
    )

}


    return (
        <>
        <div className=" flex items-center justify-center p-6">
      <div className="card w-full max-w-5xl bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">

      
          <div className="bg-sky-200 flex flex-col items-center justify-center p-8">
            <img
              src={Dbuser.photoURL}
              alt="User"
              className="w-40 h-40 object-cover rounded-lg shadow-md mb-6"
            />
            <h2 className="text-2xl font-semibold text-slate-800">
              {Dbuser.name}
            </h2>
            <button onClick={() => setModalType('photoURL')}  className="btn btn-ghost text-sky-600 hover:bg-sky-50">
                <FaEdit className="mr-2" />
                Change photo
              </button>
          </div>

     
          <div className="md:col-span-2 p-10">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-semibold text-slate-800">
                User Profile
              </h3>

             
            </div>

            <div className="space-y-6 max-w-md">
                <div className='flex items-center'>
              <div className="flex items-center gap-4">
                <FaPhone className="text-sky-500" />
                <span className="text-slate-700">
                {Dbuser.name}
                </span>
              </div>
            <button
  className="btn btn-ghost text-sky-600 hover:bg-sky-50"
  onClick={() => setModalType('name')}
>
 <FaEdit></FaEdit> Edit Name
</button>
              </div>
                <div className='flex items-center'>
              <div className="flex items-center gap-4">
                <FaPhone className="text-sky-500" />
                <span className="text-slate-700">
                  {Dbuser.bio == "" ?(`Please Enter your bio`):(Dbuser.bio)}
                </span>
              </div>
              <button
  className="btn btn-ghost text-sky-600 hover:bg-sky-50"
  onClick={() => setModalType('bio')}
>
 <FaEdit></FaEdit> Edit bio
</button>
              </div>
                <div className='flex items-center'>
              <div className="flex items-center gap-4">
                <FaPhone className="text-sky-500" />
                <span className="text-slate-700">
                  {Dbuser.address == ""?(`please enter your Address`):(Dbuser.address)}
                </span>
              </div>
             <button
  className="btn btn-ghost text-sky-600 hover:bg-sky-50"
  onClick={() => setModalType('address')}
>
 <FaEdit></FaEdit> Edit address
</button>
              </div>

            
           
            </div>
          </div>

        </div>
      </div>
    </div>


<div>
    <Winpercentage></Winpercentage>
</div>




  {modalType && (
  <div className="modal modal-open">
    <div className="modal-box">
      <h3 className="font-bold text-lg">
        Edit {modalType}
      </h3>

      {modalType === 'name' && <input onChange={(e)=>setmodalvalue(e.target.value)} className="input w-full" />}
      {modalType === 'bio' && <textarea onChange={(e)=>setmodalvalue(e.target.value)} className="textarea w-full" />}
      {modalType === 'address' && <input onChange={(e)=>setmodalvalue(e.target.value)} className="input w-full" />}
      {modalType === 'photoURL' && <input type='file' {...register(`photoURL`)} className="input w-full" />}

      <div className="modal-action">
        {modalType === `photoURL` ?(<button className='btn bg-green-600' onClick={handleSubmit(handlephoto)}>
            Edit photo
        </button>):(  <button
  className="btn bg-green-600"
  onClick={() => {
    mutate({ [modalType]: modalvalue })
  
    
    
  }}
>
  Edit
</button>)}
        <button className="btn" onClick={() => setModalType('')}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </>
    );
};

export default Myprofile;