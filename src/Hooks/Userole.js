import { useContext } from "react"
import { Authcontext } from "../Auth/Authcontext"
import { useQuery } from "@tanstack/react-query"
import axiospublic from "./Axiospublic"

const Userole=()=>{
    const{user}=useContext(Authcontext)



    const{data:Dbuser,isLoading}= useQuery({
        queryKey:[`Dbuser`,user?.email],
        enabled:!!user?.email,
        queryFn:async()=>{
            const res= await axiospublic.get(`/user/me`,{
                withCredentials:true
            })
            return res.data
        },
    });

    return{
        Dbuser,
        isLoading,
        role:Dbuser?.role,
        isAdmin: Dbuser?.role ===`admin`,
        iscreator: Dbuser?.role ===`creator`,
        isuser:Dbuser?.role === `user`
    }

}
export default Userole