import axiosInstance from "@/lib/axios.ts";
import {LoginData, SignupData} from "@/lib/formSchemas.ts";

export const signup = async (signupData: SignupData)=>{
    const res = await axiosInstance.post("/auth/sign-up", signupData);
    return res.data.user;
}

export const signin = async (loginData: LoginData)=>{
    const res = await axiosInstance.post("/auth/sign-in", loginData);
    return res.data.user;
}

export const logout = async () =>{
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
}

export const getAuthUser = async () => {
    try{
        const res = await axiosInstance.get("/auth/current-user")
        return res.data
    }catch (error){
        console.log("Error fetching user data:", error);
        return null;
    }
}