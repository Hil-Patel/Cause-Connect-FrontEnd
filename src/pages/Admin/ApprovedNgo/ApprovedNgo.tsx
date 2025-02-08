import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../features/loadingSlice';
import { ApprovedNgoFetch } from "../../../ApiEndPoints/ApiCalls.js"
import toast from 'react-hot-toast';
import ApprovedNgoCards from './component/ApprovedNgoCards.js';

const ApprovedNgo = () => {

    const [NGOs, setNGOs] = useState([]);
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.loading.isLoading)
    const FetchNGO = async () => {
        dispatch(setLoading(true))
        const res = await ApprovedNgoFetch()
        dispatch(setLoading(false))

        if (res.statusCode >= 200 && res.statusCode < 300) {
            setNGOs(res.data)
            console.log(res.data);

        }
        else {
            toast.error(res.message)
        }
    }

    useEffect(() => {
        FetchNGO()
    }, [])
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[9999]">
                    <span className="loader"></span>
                </div>
            )}
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">NGO</h1>
                    <div className="text-sm text-gray-500">{NGOs.length} NGOs</div>
                </div>

                <div className="space-y-4">
                    {NGOs.map((ngo, index) => (
                        <ApprovedNgoCards key={index} ngo={ngo} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ApprovedNgo