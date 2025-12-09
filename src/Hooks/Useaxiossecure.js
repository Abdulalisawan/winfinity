import { useContext, useEffect } from "react"
import { Authcontext } from "../Auth/Authcontext"
import { useNavigate } from "react-router"
import axiossecure from "./Axiossecure"

const Useaxiossecure=()=>{
    const{Logout}=useContext(Authcontext)
    const navigate=useNavigate()
    useEffect(()=>{
        const interceptor= axiossecure.interceptors.response.use(
            (res)=>res,
            async(error)=>{
                const status= error?.response?.status;
                if (status === 401 || status === 403){
                     console.log("Unauthorized / Forbidden - Auto Logout");
                     await Logout()
                     navigate('/Login')

                }
                return Promise.reject(error)
            }
        )
        return ()=>axiossecure.interceptors.response.eject(interceptor)

    },[Logout,navigate])

    return axiossecure;
}
export default Useaxiossecure;