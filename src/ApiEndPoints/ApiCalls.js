import axios from "axios"

const baseURL="http://localhost:8081/api/v1"

export const NGOLogin=async(value)=>{
    try {
        const res=await axios.post(`${baseURL}/loginNgo`,value)
        return res;
    } catch (error) {
        return error;
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
        formData.append("bankStatement", values.bankStatement);// File object
        formData.append("transcript", values.transcript); // File object
        formData.append("profilePic", values.profilePic); // File object
        const res=await axios.post(`${baseURL}/registerNgo`,formData)
        return res;
    } catch (error) {
        return error;
    }
}


export const VolunteerLogin=async(value)=>{
    try {
        const res=await axios.post(`${baseURL}/loginVolunteer`,value)
        console.log(res);
        
        return res;
    } catch (error) {
        return error;
    }
}

export const VolunteerSignUp=async(value)=>{
    try {
        const res=await axios.post(`${baseURL}/registerVolunteer`,value);
        console.log(res);
        return res;
    } catch (error){
        return error;
    }
}