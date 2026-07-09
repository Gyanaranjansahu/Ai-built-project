import { createContext, useEffect, useState } from "react";
import { userMe } from "./api.control";
const authContext=createContext()
function Authprovider({children}){
    const[user,setUser]=useState(null)
    const[loading,setLoading]=useState(true)
    useEffect(()=>{
        async function data(){
           try {
            setLoading(true)
            let id= await userMe()
            console.log(id.user);
            setUser(id?.user?.id)
            return
            
          
           } catch (error) {
           
            setUser(null)
             throw error
           }
           finally{
            setLoading(false)
           }
        }
        data()
    },[])
    console.log("the user is  "+ user);
    
    return(
    
    <authContext.Provider value={{user,setUser,loading,setLoading}}>
        {children}
    </authContext.Provider>
    )
}
export {authContext ,Authprovider}