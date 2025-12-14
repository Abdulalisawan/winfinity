import { useQuery } from "@tanstack/react-query"
import Useaxiossecure from "./Useaxiossecure"

export const Usecreatorcontest=()=>{
    const axiossecure=Useaxiossecure()
    return useQuery({
        queryKey:[`creator-contest`],
        queryFn:async()=>{
            const result=await axiossecure.get('/creatorcontest')
            return result.data
            
        }
    })
}