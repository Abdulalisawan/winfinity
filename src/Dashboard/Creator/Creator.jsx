import React from 'react';
import { FaGamepad } from 'react-icons/fa';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { IoArrowBackCircleOutline, IoCreateOutline } from 'react-icons/io5';
import { MdEvent } from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router';

const Creator = () => {
    return (
         <>
         <div className='ml-10 pt-5'><Link to={'/'} className='text-3xl flex '><IoArrowBackCircleOutline /> <span className='text-xl font-semibold'>Back to home</span> </Link></div>
          <div className='bg-gradient-to-l  from-sky-200'>
        <div className='pt-10 pb-5'>
            <h1 className='text-4xl font-semibold ml-15 text-center'>Creator  Dashboard</h1>
        </div>
    <div className="drawer   lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle " />
  <div className="drawer-content ">
  
    <nav className="navbar w-full ">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
       
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      
    </nav>
   
    <div className="p-4"><Outlet></Outlet></div>
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col bg-base-200 items-start is-drawer-close:w-14 is-drawer-open:w-64">
     
      <ul className="menu w-full grow">
        
        <li>
          <NavLink to={`/Dashboard/creator/Addcontest`} className="is-drawer-close:tooltip  is-drawer-close:tooltip-right" data-tip="Add contest">
           

             <IoCreateOutline className='text-3xl' />
         
            <span to={`/Dashboard/Admin/alluser`} className="is-drawer-close:hidden">Add contest</span>
          </NavLink>
        </li>

        {/* List item */}
        <li>
          <NavLink to={`/Dashboard/creator/Createdcontest`} className="is-drawer-close:tooltip  is-drawer-close:tooltip-right" data-tip="Contest management">
            {/* Settings icon */}
            <FaGamepad className='text-3xl'></FaGamepad>
            <span  className="is-drawer-close:hidden">Created Contest</span>
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
</div>
</div>

</>
    );
};

export default Creator;