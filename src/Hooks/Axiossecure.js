import axios from "axios";

import { Authcontext } from "../Auth/Authcontext";

const axiossecure=axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true

    

});

export default axiossecure;
