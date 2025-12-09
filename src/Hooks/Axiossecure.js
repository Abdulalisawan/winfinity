import axios from "axios";

import { Authcontext } from "../Auth/Authcontext";

const axiossecure=axios.create({
    baseURL:`http://localhost:3000`,
    withCredentials:true

    

});

export default axiossecure;
