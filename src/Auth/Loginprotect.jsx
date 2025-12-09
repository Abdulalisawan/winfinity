import React, { useContext } from 'react';
import { Authcontext } from './Authcontext';
import { Navigate } from 'react-router';

const Loginprotect = ({children}) => {
    const{user}=useContext(Authcontext)
    if(user){
        return <Navigate to={'/'}></Navigate>
    }else{
        return children
    }
    
};

export default Loginprotect;