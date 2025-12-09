import React, { useContext } from 'react';
import { Authcontext } from './Authcontext';
import Userole from '../Hooks/Userole';
import { Navigate } from 'react-router';

const Creatorprotect = ({children}) => {
    const{user}=useContext(Authcontext)
    const{iscreator,isLoading}=Userole();
    
    if(isLoading){
        return <span className="loading loading-spinner loading-xl"></span>
    }
    if(!user){
        return <Navigate to={'/Login'}></Navigate>
    }
    if(!iscreator){
        return <Navigate to={'/Login'} replace></Navigate>
    }
    return children
};

export default Creatorprotect;