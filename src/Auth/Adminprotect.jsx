import React, { useContext } from 'react';
import { Authcontext } from './Authcontext';
import Userole from '../Hooks/Userole';
import { Navigate } from 'react-router';

const Adminprotect = ({children}) => {
    const{user,Logout}=useContext(Authcontext)
    const{isAdmin,isLoading}=Userole()
   

    if(isLoading){
        return <span className="loading loading-spinner loading-xl"></span>
    }
    if(!user){
        return <Navigate to={'/Login'}></Navigate>
    }
    if(!isAdmin){
        return <Navigate to={'/'} replace></Navigate>
    }
    return children
 
};

export default Adminprotect;