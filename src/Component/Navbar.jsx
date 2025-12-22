import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import { Authcontext } from '../Auth/Authcontext';
import Userole from '../Hooks/Userole';
import { Link } from 'react-router';
import {  useQueryClient } from '@tanstack/react-query';



const Navbar = () => {
  const{user,Logout}=useContext(Authcontext)
  const [open, setOpen] = useState(false);


  const queryclinet =useQueryClient()


  const{Dbuser, isLoading,isAdmin,iscreator}=Userole()
  let dashboardpath=null
  if(!isLoading && user){
    if(isAdmin){
       dashboardpath=`/Dashboard/Admin`

    }else if(iscreator){
      dashboardpath=`/Dashboard/creator`
    }else dashboardpath='/Dashboard/user'
    
    }

  
 

  const logouto=async()=>{ 
    await fetch(`${import.meta.env.VITE_API_URL}/logout`,{
      method:`POST`,
      credentials:`include`
    }).then((res)=>{
      queryclinet.clear()
      console.log(`catch cleared`,res)
      console.log(`cookies cleared`,res)
    })

    await Logout().then(()=>{
      console.log(`logout successfull`)
    })


  }

  
  

  
    return (
      <div className="navbar flex justify-between  shadow-sm">

   <div className=" flex-1 relative lg:hidden">
  <button
    onClick={() => setOpen(prev => !prev)}
    className="btn btn-ghost btn-circle"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h7"
      />
    </svg>
  </button>

  {open && (
    <ul
      className="
        absolute
        left-0
        top-full
        mt-2
        w-52
        bg-base-100
        rounded-box
        shadow-lg
        menu
        menu-sm
        z-50
      "
    >
      <li><NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink></li>
      <li><NavLink to="/All-contest" onClick={() => setOpen(false)}>All Contest</NavLink></li>
      <li><NavLink to="/Leaderboard" onClick={() => setOpen(false)}>Leaderboard</NavLink></li>
      <li><NavLink to={`/howitworks`} onClick={() => setOpen(false)}>How it works</NavLink></li>
    </ul>
  )}
</div>


  

        <div className='flex-1 flex justify-center lg:justify-start lg:ml-10   '>
  <div className="flex  items-center   gap-2 cursor-pointer">
       
        <div className="w-8 h-8 flex items-center justify-center">
           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
              <path 
                d="M4 4L9 20L12 10L15 20L20 4" 
                stroke="url(#logo-gradient)" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="logo-gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8B5CF6" /> {/* Purple */}
                  <stop offset="1" stopColor="#06B6D4" /> {/* Cyan */}
                </linearGradient>
              </defs>
           </svg>
        </div>
        <span className="text-2xl font-bold text-slate-800 tracking-tight">Winfinity</span>
      </div> 
      <div>

   </div>
   </div>

  <div className="navbar-center flex-1   justify-center  hidden lg:flex    ">
                <NavLink to={'/'} className={'font-semibold  px-3  rounded-2xl '}>Home</NavLink>
                <NavLink to={'/All-contest'} className={'font-semibold px-3  rounded-2xl '}>All Contest</NavLink>
                <NavLink to={`/Leaderboard`} className={'font-semibold  px-3  rounded-2xl'}>Leaderboard
                </NavLink>
                <NavLink to={`/howitworks`} className={'font-semibold  px-3  rounded-2xl'}>How it works</NavLink>

  
  </div>
  <div className=" navbar-end flex-1 pl-10 ">
    {
                user ?(<div className="lg:mr-20">
  <details className="dropdown dropdown-end">
    <summary
      className="btn w-10 h-10 rounded-full bg-cover bg-no-repeat m-0 sm:m-1"
      style={{ backgroundImage: `url('${Dbuser === undefined ?(user.photoURL):(Dbuser.photoURL)}')` }}
    ></summary>

    <ul
      tabIndex="-1"
      className="
        dropdown-content
        menu
        bg-base-100
        rounded-box
        z-50
        p-2
        shadow-sm
        w-[90vw]
        sm:w-48
        max-w-[35vw]
        right-0
        overflow-x-hidden
      "
    >
      <li><span>{Dbuser === undefined ?(user.displayName):(Dbuser.name)}</span></li>

      {dashboardpath && (
        <li>
          <NavLink to={dashboardpath}>Dashboard</NavLink>
        </li>
      )}

      <li>
        <button onClick={logouto} className="text-left w-full">
          Logout
        </button>
      </li>
    </ul>
  </details>
</div>
 ):(<div className='flex gap-3 items-center my-2'>
              <NavLink to={'/Login'} className="btn  rounded-xl">Login</NavLink>
              <NavLink to={'/Register'} className="btn rounded-xl ">Register</NavLink>


            </div>)
            }
    
  </div>
</div>
       
    );
};

export default Navbar;


