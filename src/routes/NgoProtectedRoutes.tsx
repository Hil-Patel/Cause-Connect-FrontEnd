import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {NgoVerify} from "../ApiEndPoints/ApiCalls"
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const NgoProtectedRoutes = () => {
    const [loading, setLoading] = useState(true)
    const [verified, setVerify] = useState(false)
    const IsLoggedin = useSelector((state)=>state.loggedIn.IsLoggedin)
    const token = useSelector((state)=>state.loggedIn.Token)

    const handleVerify=async()=>{
        
        const res=await NgoVerify(JSON.parse(token))
        if(res.statusCode >=200 && res.statusCode <300){
            setVerify(true);
        }
        else{
            setVerify(false)
            localStorage.setItem("IsLoggedin","false")
            toast.error(res.message);
        }
        setLoading(false)
    }

    useEffect(() => {
        if(IsLoggedin=="false"){
            setVerify(false)
            toast.error("Unauthorized Access")
            setLoading(false)
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

export default NgoProtectedRoutes