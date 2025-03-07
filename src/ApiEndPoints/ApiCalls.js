import axios from "axios"
import { useSelector } from "react-redux"

const baseURL="http://localhost:8080/api/v1"

//Admin API

export const AdminVerify=async(values)=>{
    try {
        const res=await axios.post(`${baseURL}/Admin`,values)
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const AdminApproveNgo=async(values)=>{
    try {
        const res=await axios.get(`${baseURL}/Admin/Approve/Ngo/${values}`)
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const AdminDisApproveNgo=async(values)=>{
    try {
        const res=await axios.get(`${baseURL}/Admin/Disapprove/Ngo/${values}`)
        return res.data;
    } catch (error) {
        console.log("hi");
        
        return error.response.data;
    }
}

export const UnapprovedNgoFetch=async(values)=>{
    try {
        const res=await axios.get(`${baseURL}/Admin/UnapprovedNgo`)
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const ApprovedNgoFetch=async(values)=>{
    try {
        const res=await axios.get(`${baseURL}/Admin/ApprovedNgo`)
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const VolunteerDataFetchAdmin=async()=>{
    try {
        const res=await axios.get(`${baseURL}/Volunteer/All`)
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

//NGO API

export const NgoOtpSend=async(values)=>{
    try {
        const res=await axios.post(`${baseURL}/Ngo/SendOtp`,values)
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const NgoVerifyOtp=async(values)=>{
    try {
        const res=await axios.post(`${baseURL}/Ngo/VerifyOtp`,values)
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const NGOLogin=async(values)=>{
    try {
        const res=await axios.post(`${baseURL}/Ngo/loginNgo`,values)
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const NGOSignUp=async(values)=>{
    try {
        const formData = new FormData();
        formData.append("ngoName", values.ngoName);
        formData.append("ngoAim", values.ngoAim);
        formData.append("ngoDescription", values.ngoDescription);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("address", values.address);
        formData.append("numberOfMember", values.numberOfMember);
        formData.append("city", values.city);
        formData.append("accountNumber", values.accountNumber);
        formData.append("password", values.password);
        formData.append("fullName", values.fullName);
        formData.append("confirmPassword", values.confirmPassword);
        formData.append("ownerEmail", values.ownerEmail);
        formData.append("ownerPhoneNumber", values.ownerPhoneNumber);
        formData.append("age", values.age);
        formData.append("gender", values.gender);
        formData.append("experience", values.experience);
        formData.append("bankStatement", values.bankStatement);
        formData.append("transcript", values.transcript); 
        formData.append("profilePic", values.profilePic); 
        const res=await axios.post(`${baseURL}/Ngo/registerNgo`,formData)
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const NgoVerify=async(values)=>{
    try {
        const res=await axios.get(`${baseURL}/Ngo`,{headers:values})
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const NGODashboardData=async(values)=>{
    try {
        const res=await axios.get(`${baseURL}/Ngo/profile`,{headers:values})
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const NGOCreateEvent=async(values,token)=>{
    try {
        const res=await axios.post(`${baseURL}/Ngo/CreateEvent`,values,{headers:token})
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const NGOFetchEventDetails=async(id,token)=>{
    try {
        const res=await axios.get(`${baseURL}/Ngo/UpcomingEvent/${id}`,{headers:token});
        return res.data;
    } catch (error){
        return error.response.data;
    }
}

export const NGOAcceptVolunteerRequest=async(values,token)=>{
    try {
        const res=await axios.post(`${baseURL}/Ngo/AssignTask`,values,{headers:token});
        return res.data;
    } catch (error){
        return error.response.data;
    }
}

export const NGODeclineVolunteerRequest=async(values,token)=>{
    try {
        const res=await axios.post(`${baseURL}/Ngo/DeclineRequest`,values,{headers:token});
        return res.data;
    } catch (error){
        return error.response.data;
    }
}

//Volunteers API

export const VolunteerOtpSend=async(values)=>{
    try {
        const res=await axios.post(`${baseURL}/Volunteer/SendOtp`,values)
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const VolunteerVerifyOtp=async(values)=>{
    try {
        const res=await axios.post(`${baseURL}/Volunteer/VerifyOtp`,values)
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const VolunteerVerify=async(values)=>{
    try {
        const res=await axios.get(`${baseURL}/Volunteer`,{headers:values})
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const VolunteerLogin=async(values)=>{
    try {
        const res=await axios.post(`${baseURL}/Volunteer/loginVolunteer`,values)
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const VolunteerSignUp=async(values)=>{
    try {
        console.log(values);
        
        const res=await axios.post(`${baseURL}/Volunteer/registerVolunteer`,values);
        return res.data;
    } catch (error){
        return error.response.data;
    }
}

export const VolunteerFetchEvents=async(token)=>{
    try {
        const res=await axios.get(`${baseURL}/Volunteer/Events`,{headers:token});
        return res.data;
    } catch (error){
        return error.response.data;
    }
}

export const VolunteerRequestToJoinEvents=async(values,token)=>{
    try {
        const res=await axios.post(`${baseURL}/Volunteer/JoinRequest`,values,{headers:token});
        return res.data;
    } catch (error){
        return error.response.data;
    }
}

export const VolunteerDashboardData=async(token)=>{
    try {
        const res=await axios.get(`${baseURL}/Volunteer/Dashboard`,{headers:token});
        return res.data;
    } catch (error){
        return error.response.data;
    }
}

