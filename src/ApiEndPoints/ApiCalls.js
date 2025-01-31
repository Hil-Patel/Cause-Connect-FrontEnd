import axios from "axios"

const baseURL="http://localhost:8080/api/v1"

export const AdminVerify=async(values)=>{
    try {
        const res=await axios.post(`${baseURL}/Admin`,values)
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

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
        console.log(values);
        
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