import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';

const Mainlayout = () => {
    return (
        <>
        <div className=' bg-gradient-to-l  from-sky-200 ' >
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
        </div>
            
        </>
    );
};

export default Mainlayout;