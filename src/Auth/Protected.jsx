import React, { useContext } from 'react';
import { Authcontext } from './Authcontext';
import { Navigate,  } from 'react-router';
import Userole from '../Hooks/Userole';

const Protected = ({children}) => {

    const{user}=useContext(Authcontext)
   
    const{isLoading,isuser}=Userole()
   if(isLoading){
        return <span className="loading loading-spinner loading-xl"></span>
    }
    if(!user){
        return <Navigate to={'/Login'}></Navigate>
    }
    if(!isuser){
      return <Navigate to="/" replace />
    }
    return children
    
};

export default Protected;