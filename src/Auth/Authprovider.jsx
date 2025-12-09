import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from './AUth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { Authcontext } from './Authcontext';


const Authprovider = ({children}) => {

    const provider= new GoogleAuthProvider()
    const[user, setuser]=useState()
    const [loading, setLoading] = useState(true);
  

    const signin=(email , password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const login=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signinwithgoogle=()=>{
        return signInWithPopup(auth,provider)
    }
    const Logout=()=>{
        return signOut(auth)

    }
    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth,(currentuser)=>{
            if(currentuser){
                setuser(currentuser)
                const logeduser={email:currentuser.email}
               fetch(`http://localhost:3000/jwt` , {
                method:`POST`,
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials:`include`,
                body:JSON.stringify(logeduser)
               }).then((res)=>res.json()).then(data=>{
                console.log(data)

              })
            }else{
                setuser(null)
            }
            setLoading(false)

        }
        );
        return ()=>unsubscribe()

    },[])

    const Authdata={
        signin,
        login,
        signinwithgoogle,
        Logout,
        user
    }

      if(loading){
        return ( <div className="flex justify-center items-center min-h-[70vh] bg-transparent">
      <div className="relative">
        {/* Outer Glow Ring */}
        <div className="w-24 h-24 border-4 border-sky-300/20 rounded-full"></div>

        {/* Spinning Ring */}
        <span className="loading loading-spinner text-sky-400 absolute top-0 left-0 w-24 h-24"></span>
      </div>
    </div>)
        
    }
    return (
        <Authcontext value={Authdata}>
            {children}
        </Authcontext>
    );
};

export default Authprovider;