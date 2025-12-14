import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiospublic from '../Hooks/Axiospublic';
import COntesttable from './COntesttable';

const Allcontest = () => {

    const {data:allcontest,isPending,isError}= useQuery({
        queryKey:['All-contest'],
        queryFn: async()=>{
            const result=await axiospublic.get(`/contest/status/approved`)
            return(result.data)

        }
        
    })

    if(isPending){
        return(<div className="flex justify-center items-center min-h-[70vh] bg-transparent">
      <div className="relative">
        {/* Outer Glow Ring */}
        <div className="w-24 h-24 border-4 border-sky-300/20 rounded-full"></div>

        {/* Spinning Ring */}
        <span className="loading loading-spinner text-sky-400 absolute top-0 left-0 w-24 h-24"></span>
      </div>
    </div>)
    }
     if(isError){
        return(`Error happend check evrything again`)
     }

console.log(allcontest)

    return (
        <>
        <div className='pl-10 pt-5'>
            <h1 className='text-4xl font-semibold'>ᗩᒪᒪ ᑕOᑎTEᔕT</h1>
            <p className=' font-semibold'>Join now & Win now</p>
            
        </div>
        <div className=' grid grid-cols-4 mx-3 gap-3 mt-5'>
            {
                allcontest.map(contest=><COntesttable key={contest._id} contest={contest}></COntesttable>)
            }
        </div>
            
        </>
    );
};

export default Allcontest;