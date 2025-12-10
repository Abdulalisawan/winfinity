import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { Authcontext } from '../Auth/Authcontext';
import Userole from '../Hooks/Userole';
import { Link } from 'react-router';

const Navbar = () => {
  const{user,Logout}=useContext(Authcontext)


  const{ isLoading,isAdmin,iscreator}=Userole()
  let dashboardpath=`/Dashboard/user`
  if(!isLoading){
    if(isAdmin){
       dashboardpath=`/Dashboard/Admin`

    }else if(iscreator){
      dashboardpath=`/Dashboard/creator`
    }
    
    }

    
 

  const logouto=async()=>{ 
    await fetch('http://localhost:3000/logout',{
      method:`POST`,
      credentials:`include`
    }).then((res)=>{
      console.log(`cookies cleared`,res)
    })

    await Logout().then((res)=>{
      console.log(`logout successfull`,res)
    })


  }

  
    return (
      <div className="navbar flex justify-between  shadow-sm">

    <div className="flex-1   lg:hidden">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <NavLink to={'/'} className={'font-semibold  px-3  rounded-2xl '}>Home</NavLink>
                <NavLink className={'font-semibold px-3  rounded-2xl '}>All Contest</NavLink>
                <NavLink className={'font-semibold  px-3  rounded-2xl'}>Extra 1
                </NavLink>
                <NavLink className={'font-semibold  px-3  rounded-2xl'}>Extra-2</NavLink>
      </ul>
    </div>
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
                <NavLink className={'font-semibold px-3  rounded-2xl '}>All Contest</NavLink>
                <NavLink className={'font-semibold  px-3  rounded-2xl'}>Extra 1
                </NavLink>
                <NavLink className={'font-semibold  px-3  rounded-2xl'}>Extra-2</NavLink>

  
  </div>
  <div className=" navbar-end flex-1 pl-10 ">
    {
                user ?(<div className='lg:mr-20'>
              <details className="dropdown">
  <summary className='btn w-10 bg-cover bg-no-repeat  rounded-full h-10 m-1' style={{ backgroundImage: `url('${user.photoURL}')` }}></summary>
  <ul className="menu dropdown-content bg-base-100 rounded-box z-1  p-2 shadow-sm">
    <li><a>{user.displayName}</a></li>
     <li><NavLink to={dashboardpath}>Dashboard</NavLink></li> 
    <li onClick={logouto}><a>Logout</a></li>
  </ul>
</details>
            </div> ):(<div className='flex gap-3 items-center my-2'>
              <NavLink to={'/Login'} className="btn  rounded-xl">Login</NavLink>
              <NavLink to={'/Register'} className="btn rounded-xl ">Register</NavLink>


            </div>)
            }
    
  </div>
</div>
       
    );
};

export default Navbar;


