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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children:[
      {path:'/Login', element: <Loginprotect><Login></Login></Loginprotect>},
      {path:'/Register', element:<Loginprotect><Register></Register></Loginprotect>},
      
    ]
  },
  {
    path:'/Dashboard/Admin',
    element:<Adminprotect><Admin></Admin></Adminprotect>,
    children:[
      {index:true, element:<Alluser></Alluser>},
      {path:'/Dashboard/Admin/alluser', element:<Alluser></Alluser>},
      {path:`/Dashboard/Admin/All contest`, element:<Contestmanage></Contestmanage>}
    ]
  },
  {
    path:'/Dashboard/creator',
    element:<Creatorprotect><Creator></Creator></Creatorprotect>,
    children:[
      {index:true,element:<Createcontest></Createcontest>},
      {path:`/Dashboard/creator/Addcontest`, element:<Createcontest></Createcontest>},
      {path:`/Dashboard/creator/Createdcontest`, element:<Createdcontest></Createdcontest>}
    ]
  

  },
  {
    path:'/Dashboard/user',
    element:<Protected><User></User></Protected>

  }
]);