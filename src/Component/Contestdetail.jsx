import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { FaClock, FaLock, FaTrophy, FaUserFriends } from 'react-icons/fa';
import {  useParams } from 'react-router';
import Swal from 'sweetalert2';
import Useaxiossecure from '../Hooks/Useaxiossecure';
import { useCountdown } from '../Hooks/Usecountdown';
import Userole from '../Hooks/Userole';
import { useForm } from 'react-hook-form';



const Contestdetail = () => {
  const{register,handleSubmit}=useForm()




  const queryclient=useQueryClient()
    const{ Dbuser}=Userole()
    const{id}=useParams()

    
    const axiossecure=Useaxiossecure()
    
   
    

    const{data:contestdetail,isLoading}=useQuery({
        queryKey:['contestdetail',id],
        enabled: !!id,
        queryFn:async()=>{
            const result= await axiossecure.get(`/contest/detail/${id}`)
            return result.data

        }

    })
    
      const{data:paymentstatus, isLoading:paymentloading}=useQuery({
        queryKey:[`paymentstatus`, id, Dbuser?.email],
        enabled: !! Dbuser && !! id,
        queryFn:async()=>{
                 const result= await axiossecure.get(`/payments/status?contestid=${id}`)
                 return result.data
        }
      })

    
  





     



  const detail = contestdetail?.[0];

   const{mutate:sumitorm,}=useMutation({
        mutationFn:async(datuu)=>{
          const payload={
             submissionText: datuu.Submiteddata,
            contestid:detail._id,
            name:Dbuser.name
            

          }
           
          const result= await axiossecure.post(`/submittask`,payload)
          return result.data
        },
        onSuccess:()=>{
          document.getElementById('my_modal_5').close()
          queryclient.invalidateQueries([`submitedornot`])
           Swal.fire({
          title: "submissiondone Done",
           showCancelButton: true
        })

        }


      })


 const{data:submited,isLoading:sumbitload}=useQuery({
    queryKey:[`submitedornot`,id],
    enabled: !!id,
    queryFn:async()=>{
      
      const result= await axiossecure.get(`submitedornot?contestid=${id}`)
      return result.data
    }
    
   })




 
  const countdown = useCountdown(detail?.deadline);
      const{mutate:sumittask}=useMutation({
      mutationFn:async()=>{
        const payload={
     
          contestId:detail._id,
        
            amount:detail.price,
            
        }
           const result= await axiossecure.post(`/contest-post`,payload)
           return result.data

      },
      onSuccess:()=>{

        queryclient.invalidateQueries([`contestdetail`])




        Swal.fire({
          title: "Payment Done",
           showCancelButton: true
        })
      },
       onError:(err)=>{
                     Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
                }
      
  
})

const handlesubmitform=(datuu)=>{
  sumitorm(datuu)
}


    
    if(isLoading || paymentloading || sumbitload ){
        return(<div className="flex justify-center items-center min-h-[70vh] bg-transparent">
      <div className="relative">
        {/* Outer Glow Ring */}
        <div className="w-24 h-24 border-4 border-sky-300/20 rounded-full"></div>

        {/* Spinning Ring */}
        <span className="loading loading-spinner text-sky-400 absolute top-0 left-0 w-24 h-24"></span>
      </div>
    </div>)
    }



  






     const haspaid = paymentstatus?.hasPaid == true

 
 















    return (
        <>
      
      <div className="  my-10 flex justify-center p-6">
  <div className="w-full max-w-5xl bg-base-100 rounded-3xl shadow-xl overflow-hidden">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">

      {/* LEFT: Contest Image */}
      <div className="bg-gray-50 rounded-2xl flex items-center justify-center p-6">
        <img
          src={detail.photoo}
          alt="Contest Banner"
          className="w-full h-auto max-h-[320px] object-contain"
        />
      </div>

      {/* RIGHT: Contest Info */}
      <div className="flex flex-col gap-5">

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-800">
          {detail.name}
        </h1>

        {/* Meta Row */}
        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <FaUserFriends className="text-blue-400" />
            2,450 Participants
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="text-blue-400" />


            {
              <>
              {
                !countdown?.expired && (

                  <div  className="text-blue-500 font-bold text-lg">
    
   {countdown.days}d{" "}
    {countdown.hours}h{" "}
    {countdown.minutes}m{" "}
    {countdown.seconds}s
  </div>

                )
              },
              {
                countdown?.expired && (
                  <span className="text-red-500 font-semibold">
    Contest Ended
  </span>

                )
              }
              
              
              
              
              </>
            }









          </span>
        </div>

        {/* Prize */}
        <div className="text-xl  gap-2  font-bold ">
          <div>Entry fee :{detail.price}</div>
          <div className='text-blue-400'>Prize Money :{detail.prizeMoney}</div>
        </div>

        {/* Description */}
        <div>
          <h2 className="font-semibold text-slate-800 mb-1">
            Contest Description & Task
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            {detail.description}
          </p>
          <p className="text-slate-500 text-sm leading-relaxed">
            <span className=' text-slate-800 text-xl font-semibold'>Task:</span>
            <br />
            {detail.taskInstruction}
          </p>
        </div>

        {/* CTA Buttons */}
      {

       ! countdown?.expired &&(
        <>
         {!haspaid && (

          <button onClick={() => sumittask()} className="w-full h-12 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium shadow">
            Register / Pay
          </button>

         )}

         {
          haspaid && !submited.issubmited ? ( <button
            onClick={()=>document.getElementById('my_modal_5').showModal()}
            className="w-full h-12 rounded-xl border border-blue-400 text-blue-500 hover:bg-blue-50 font-medium"
          >
            Submit Task
          </button>):( <button
            disabled
            className="w-full h-12 rounded-xl border border-blue-400 text-blue-500 hover:bg-blue-50 font-medium"
          >
            Submited
          </button>)
         }
        
        
        
        </>
       )

         


        
      }

        {/* Status */}
       {
        countdown?.expired ?( <div className="text-sm text-gray-400">
          Contest Status: <span className="text-red-500 font-medium">Ended</span>
        </div>):(
           <div className="text-sm text-gray-400">
          Contest Status: <span className="text-green-500 font-medium">Live</span>
        </div>
        )
       }
      </div>
    </div>

    {/* BOTTOM: Winner Section */}
    <div className=" px-6 py-5 bg-gray-50">
      <h2 className="font-semibold text-slate-800 mb-2">Winner</h2>

      <div className="flex items-center gap-4 text-gray-400">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <FaLock />
        </div>
        <span>Winner will be announced after contest ends</span>
      </div>
    </div>

  </div>
</div>


<dialog id="my_modal_5" className="modal modal-bottom border-2 sm:modal-middle">
  <div className="modal-box">
    
     <form  method="dialog">
        <textarea  {...register(`Submiteddata`)} placeholder='Submit the task' className='w-[99%] h-[90px] border-2'></textarea>
        <div className='flex gap-3 mt-5 justify-center items-center'>
        <button  className="btn bg-red-400 text-white font-semibold">Close</button>
        <button onClick={handleSubmit(handlesubmitform)}  className="bg-sky-500 py-2 rounded-[3px] px-2 text-white font-semibold">Submit</button>
        </div>
      </form>
    
  </div>
  
</dialog>

    </>
    );
};

export default Contestdetail;