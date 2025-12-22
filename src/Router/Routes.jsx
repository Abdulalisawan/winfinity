import { createBrowserRouter } from "react-router";
import Mainlayout from "../Layout/Mainlayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Protected from "../Auth/Protected";

import Admin from "../Dashboard/Admin/Admin";
import Adminprotect from "../Auth/Adminprotect";
import Creatorprotect from "../Auth/Creatorprotect";
import Creator from "../Dashboard/Creator/Creator";
import User from "../Dashboard/User/User";
import Loginprotect from "../Auth/Loginprotect";
import Alluser from "../Dashboard/Admin/Alluser";
import Contestmanage from "../Dashboard/Admin/Contestmanage";
import Createcontest from "../Dashboard/Creator/Createcontest";
import Createdcontest from "../Dashboard/Creator/Createdcontest";
import Allcontest from "../Component/Allcontest";
import Contestdetail from "../Component/Contestdetail";
import Updatecontest from "../Dashboard/Creator/Updatecontest";
import Submitted from "../Dashboard/Creator/Submitted";
import Homelayout from "../Layout/Homelayout";
import ParticipatedContest from "../Dashboard/User/ParticipatedContest";
import WinningContest from "../Dashboard/User/WinningContest";
import Myprofile from "../Dashboard/User/Myprofile";
import ErrorPage from "../Layout/Errorpage";
import Leaderboard from "../Component/Leaderboard";
import HowItWorks from "../Component/Howitworks";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {index:true,element:<Homelayout></Homelayout>},
      {path:'/Login', element: <Loginprotect><Login></Login></Loginprotect>},
      {path:'/Register', element:<Loginprotect><Register></Register></Loginprotect>},
      {path:"/All-contest", element:<Allcontest></Allcontest>},
      {path:"/contest/detail/:id", element:<Contestdetail><Contestdetail></Contestdetail></Contestdetail>},
      {path:"/Leaderboard",element:<Leaderboard></Leaderboard>},
      {path:`/howitworks`,element:<HowItWorks></HowItWorks>}
      
    ]
  },
  {
    path:'/Dashboard/Admin',
    element:<Adminprotect><Admin></Admin></Adminprotect>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {index:true, element:<Alluser></Alluser>},
      {path:'/Dashboard/Admin/alluser', element:<Alluser></Alluser>},
      {path:`/Dashboard/Admin/All contest`, element:<Contestmanage></Contestmanage>}
    ]
  },
  {
    path:'/Dashboard/creator',
    element:<Creatorprotect><Creator></Creator></Creatorprotect>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {index:true,element:<Createcontest></Createcontest>},
      {path:`/Dashboard/creator/Addcontest`, element:<Createcontest></Createcontest>},
      {path:`/Dashboard/creator/Createdcontest`, element:<Createdcontest></Createdcontest>},
      {path:`/Dashboard/creator/updatecontest/:id`, element:<Updatecontest></Updatecontest>},
      {path:`/Dashboard/creator/submission/:id`, element:<Submitted></Submitted>}
    ]
  

  },
  {
    path:'/Dashboard/user',
    element:<Protected><User></User></Protected>,
    children:[
      {index:true,element:<ParticipatedContest></ParticipatedContest>},
      {path:`/Dashboard/user/participated-contest`,element:<ParticipatedContest></ParticipatedContest>},
      {path:`/Dashboard/user/winning-contest`,element:<WinningContest></WinningContest>},
      {path:`/Dashboard/user/myprofile`,element:<Myprofile></Myprofile>}
    ]

  }
]);