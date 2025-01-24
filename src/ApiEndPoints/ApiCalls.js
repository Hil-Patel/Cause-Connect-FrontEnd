import axios from "axios"

const baseURL="https://localhost:8081/api/v1"

export const NGOLogin=async(value)=>{
    try {
        const res=await axios.get("https://jsonplaceholder.typicode.com/todos/1")
        return res;
    } catch (error) {
        return error;
    }
}

export const NGOSignUp=async(value)=>{
    try {
        const res=await axios.get(`${baseURL}/registerNgo`,JSON.stringify(value))
        return res;
    } catch (error) {
        return error;
    }
}

export const VolunteerLogin=async(value)=>{
    try {
        const res=await axios.get("",JSON.stringify(value))
        return res;
    } catch (error) {
        return error;
    }
}

export const VolunteerSignUp=async(value)=>{
    try {
        const res=await axios.get("",JSON.stringify(value))
        return res;
    } catch (error) {
        return error;
    }
}
