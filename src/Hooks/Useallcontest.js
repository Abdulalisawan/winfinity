import { useQuery } from "@tanstack/react-query"
import axiospublic from "./Axiospublic"

export const Useallcontest=()=>{
    return useQuery({
        queryKey:[`all-contest`],
        queryFn:async()=>{
            const res = await axiospublic.get('allcontest')
            return res.data
        }

    })
}