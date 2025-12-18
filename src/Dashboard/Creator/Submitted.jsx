import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { Link,  useParams } from 'react-router';
import Useaxiossecure from '../../Hooks/Useaxiossecure';
import Swal from 'sweetalert2';

const Submitted = () => {
    const {id}=useParams()
    const queryclien=useQueryClient()
    console.log(id)
    const axiossecure=Useaxiossecure()
    const{data:submission,isLoading}=useQuery({
        queryKey:[`sumissiondata`, id],
        enabled: !!id,
        queryFn:async()=>{
            const result= await axiossecure.get(`/submission/${id}`)
            return result.data
        }

    })

    const{data:contestname,isLoading:nameloading}=useQuery({
      queryKey:[`contestname`,id],
      enabled: !!id,
      queryFn:async()=>{
        const result=await axiossecure.get(`/contest/name/${id}`)
        return result.data
      }

    })
    console.log(contestname)
   
   const{mutate}=useMutation({
  
    mutationFn:async(email)=>{
      const result=await axiossecure.patch(`/winnerdeclaraqtion`,{id,email})
      return result.data

    },
    onSuccess:()=>{
      Swal.fire("Winner declared");
      queryclien.invalidateQueries([`sumissiondata`])

     

    }
   })

    if(isLoading || nameloading){
        return(
            <div className="flex justify-center items-center min-h-[70vh] bg-transparent">
      <div className="relative">
        {/* Outer Glow Ring */}
        <div className="w-24 h-24 border-4 border-sky-300/20 rounded-full"></div>

        {/* Spinning Ring */}
        <span className="loading loading-spinner text-sky-400 absolute top-0 left-0 w-24 h-24"></span>
      </div>
    </div>
        )
    }
    return (
        <>
        <div className='text-center mb-10 text-2xl font-semibold'>{contestname.name} all submission</div>

 

        <div className="overflow-x-auto">
  <table className="table">

    <thead>
      <tr>
        
      
        <th>Useremail</th>
        <th>contestId</th>
        <th>Submited task</th>
        <th>Winner</th>
      </tr>
    </thead>
    <tbody>
  
      {

        submission.map((submit,idx)=>(
          <>
        <React.Fragment key={submit._id || idx}></React.Fragment>
        <tr key={idx}>
        <td>{submit.useremail}</td>
        <td>{submit.contestid}</td>
         
        <td><button onClick={()=>document.getElementById(`my_modal_${idx}`).showModal()} className='  px-2 py-2 bg-emerald-700 text-white font-semibold '>Submission</button>

          <dialog id={`my_modal_${idx}`} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">

    <p>username:{submit.name}</p>
    <p>useremail:{submit.useremail}</p>
   
    <p className="py-4">{submit.submissionText}</p>
    <div className="modal-action">
      <form method="dialog">
        
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
        
        
        
        
        </td>
        <td>{submit.isWinner=== false ? (<button onClick={()=>{
          mutate(submit.useremail)
        }} className='  px-2 py-2 bg-emerald-700 text-white font-semibold '>Winner</button>):('Winner declared')}</td>
      </tr>
    

      </>
      
        ))
      }
    </tbody>
    
     
    
  </table>
</div>




            
        </>
    );
};

export default Submitted;