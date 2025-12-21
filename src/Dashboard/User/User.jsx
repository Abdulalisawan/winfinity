import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaCheck, FaCheckCircle, FaTrophy } from 'react-icons/fa';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { Link, NavLink, Outlet } from 'react-router';

const User = () => {
    return (
        <>
              <div className='ml-10 pt-5 bg-gradient-to-l  from-sky-200'><Link to={'/'} className='text-3xl flex '><IoArrowBackCircleOutline /> <span className='text-xl font-semibold'>Back to home</span> </Link></div>


         <div className='bg-gradient-to-l  from-sky-200'>
        <div className='pt-10 pb-5'>
            <h1 className='text-4xl font-semibold ml-15 text-center'>User Dashboard</h1>
        </div>
    <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
    <nav className="navbar w-full ">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      <span className='font-semibold'>Menu</span>
    </nav>
    {/* Page content here */}
    <Outlet></Outlet>
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
        {/* List item */}
        <li>
          <NavLink to={`/Dashboard/user/participated-contest`} className="is-drawer-close:tooltip mb-3 is-drawer-close:tooltip-right" data-tip="Participated Contest">
            {/* Home icon */}
            <FaCheckCircle className='text-3xl'></FaCheckCircle>
            <span className="is-drawer-close:hidden">Participated Contest</span>
          </NavLink>
        </li>

        {/* List item */}
        <li>
          <NavLink to={`/Dashboard/user/winning-contest`} className="is-drawer-close:tooltip mb-3 is-drawer-close:tooltip-right" data-tip="Winning Contest">
            {/* Settings icon */}
           <FaTrophy className='text-3xl'></FaTrophy>
            <span className="is-drawer-close:hidden">Winning contest</span>
          </NavLink>
          <NavLink to={`/Dashboard/user/myprofile`} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My profile">
            {/* Settings icon */}
           <CgProfile className='text-3xl'></CgProfile>
            <span className="is-drawer-close:hidden">My Profile</span>
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

export default User;