import React, { useEffect } from 'react';
import { replace, useNavigate, useSearchParams } from 'react-router';
import Useaxiossecure from '../Hooks/Useaxiossecure';

const PaymentSuccess = () => {
    const [params]=useSearchParams()
    const sessionId = params.get("session_id")
    const navigate= useNavigate()
    const axiossecure=Useaxiossecure()

    useEffect(()=>{
        if(!sessionId){
            return
        }

        axiossecure.post("/confirm-payment", { sessionId })
        .then((res)=>{
            const contestid=res.data.contestId
            navigate(`/contest/detail/${contestid}`,{replace:true})
        }).catch(()=>{
            window.location.href="/payment-cancel"
        })

    },[sessionId,axiossecure,navigate])
    return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold text-green-600">
        Processing Payment...
      </h1>
    </div>
  );
};

export default PaymentSuccess;