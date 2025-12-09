import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';

const Mainlayout = () => {
    return (
        <>
        <div className=' bg-gradient-to-l  from-sky-200 '>
        <Navbar></Navbar>
        <Outlet></Outlet>
        </div>
            
        </>
    );
};

export default Mainlayout;