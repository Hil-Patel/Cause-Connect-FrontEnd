import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Navigate, Outlet } from 'react-router-dom'
import {AdminVerify} from "../ApiEndPoints/ApiCalls"
import { useSelector } from 'react-redux'

const AdminProtectedRoutes = () => {
    const [loading, setLoading] = useState(true)
    const [verified, setVerify] = useState(false)
    const IsLoggedin = useSelector((state)=>state.loggedIn.IsLoggedin)
    const token = useSelector((state)=>state.loggedIn.Token)

    const handleVerify=async()=>{
        
        const res=await AdminVerify(JSON.parse(token))
        if(res.statusCode >=200 && res.statusCode <300){
            setVerify(true);
            console.log("f1");
            
        }
        else{
            toast.error(res.message);
            localStorage.setItem("IsLoggedin","false")
            setVerify(false)
            
            console.log("f2");
        }
        setLoading(false)
    }

    useEffect(() => {
        if(IsLoggedin=="false"){
            toast.error("Unauthorized Access")
            setVerify(false)
            setLoading(false)
            console.log("f3");
        }else{
            handleVerify();
        }
    }, [])

    return loading ? 
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[9999]">
            <span className="loader"></span>
        </div> : 
            verified ? <Outlet/> :<Navigate to={"/"}/>
        
}

export default AdminProtectedRoutes