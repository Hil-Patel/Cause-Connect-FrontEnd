import React, { useEffect, useState } from 'react'
import NGOCard from './component/NGOCard.js'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { setLoading } from '../../../features/loadingSlice.js';
import { UnapprovedNgoFetch, AdminApproveNgo, AdminDisApproveNgo } from "../../../ApiEndPoints/ApiCalls.js"
import toast from 'react-hot-toast';


const UnApprovedNgo = () => {
  const [NGOs, setNGOs] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.isLoading)


  const FetchNGO = async () => {
    dispatch(setLoading(true))
    const res = await UnapprovedNgoFetch()
    dispatch(setLoading(false))

    if (res.statusCode >= 200 && res.statusCode < 300) {
      setNGOs(res.data)
    }
    else {
      toast.error(res.message)
    }
  }

  useEffect(() => {
    FetchNGO()
  }, [])

  const handleApprove = async (id: string) => {
    dispatch(setLoading(true))
    const res = await AdminApproveNgo(id)
    dispatch(setLoading(false))

    if (res.statusCode >= 200 && res.statusCode < 300) {
      const temp = NGOs.filter((ngo) => ngo.id !== id)
      setNGOs(temp)
      toast.success(res.message)
    }
    else {
      toast.error(res.message)
    }
  }

  const handleDisapprove = async (id: string) => {
    dispatch(setLoading(true))
    const res = await AdminDisApproveNgo(id)
    dispatch(setLoading(false))


    if (res.statusCode >= 200 && res.statusCode < 300) {
      const temp = NGOs.filter((ngo) => ngo.id !== id)
      toast.success(res.message)
    }
    else {
      toast.error(res.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[9999]">
          <span className="loader"></span>
        </div>
      )}
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">NGO Approval Requests</h1>
          <div className="text-sm text-gray-500">{NGOs.length} requests pending</div>
        </div>

        <div className="space-y-4">
          {NGOs.map((ngo, index) => (
            <NGOCard key={index} ngo={ngo} onApprove={handleApprove} onDisapprove={handleDisapprove} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default UnApprovedNgo

