import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiospublic from '../Hooks/Axiospublic';
import COntesttable from './COntesttable';
import { Link } from 'react-router';


const Mosthypecontest = () => {
    
    const {data:allcontest,isPending,isError}= useQuery({
        queryKey:['hype-contest'],
        queryFn: async()=>{
            const result=await axiospublic.get(`/hypercontest`)
            return(result.data)

        },
    
        
    })
 

    if(isPending){
        return(<div className="flex justify-center items-center min-h-[70vh] bg-transparent">
      <div className="relative">
        
        <div className="w-24 h-24 border-4 border-sky-300/20 rounded-full"></div>

       
        <span className="loading loading-spinner text-sky-400 absolute top-0 left-0 w-24 h-24"></span>
      </div>
    </div>)
    }
     if(isError){
        return(`Error happend check evrything again`)
     }

    return (
        <>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 mt-2 mx-2 md:mx-15 lg:mx-20 gap-3 '>
            {allcontest.map((contest,idx)=><COntesttable key={idx} contest={contest}></COntesttable>)}
        </div>
        <div className='mt-5 text-center'>
        <Link className='px-4 py-2 bg-sky-400 hover:bg-blue-900 text-white rounded-4xl  font-semibold shadow'>Show All</Link>
        </div>
        </>
    );
};

export default Mosthypecontest;