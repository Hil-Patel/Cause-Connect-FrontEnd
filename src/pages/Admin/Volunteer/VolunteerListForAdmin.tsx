import { useEffect, useState } from "react"
import VolunteerCard from "./component/VolunteerCard"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../../../features/loadingSlice"
import {VolunteerDataFetchAdmin } from "../../../ApiEndPoints/ApiCalls.js"
import toast from "react-hot-toast"


interface Volunteer {
    name: string
    phone: string
    address: string
    city: string
    email: string
    age: number
    gender: string
    experience: string
}

const VolunteerListForAdmin = () => {
    const [volunteerData, setVolunteerData] = useState([])
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.loading.isLoading)

    const handleVolunteerData=async()=>{
        dispatch(setLoading(true))
        const res=await VolunteerDataFetchAdmin()
        dispatch(setLoading(false))

        if(res.statusCode >= 200 && res.statusCode < 300){
            setVolunteerData(res.data)
        }
        else{
            toast.error(res.message)
        }
    }

    useEffect(()=>{
        handleVolunteerData()
    },[])

    return (
        <div className="container mx-auto px-4 py-8">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[9999]">
                    <span className="loader"></span>
                </div>
            )}
            <div className="flex justify-between items-center">

            <h1 className="text-3xl font-bold mb-6">Volunteer List</h1>
            <div className="text-sm text-gray-500">{volunteerData.length} volunteers</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {volunteerData.map((volunteer, index) => (
                    <VolunteerCard key={index} volunteer={volunteer} />
                ))}
            </div>
        </div>
    )
}

export default VolunteerListForAdmin