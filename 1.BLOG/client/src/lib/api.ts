import axiosInstance from "@/lib/axios.ts";
import {LoginData, SignupData} from "@/lib/formSchemas.ts";
import { PostFormData } from "@/types/post";

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

export const createPost = async (postData: PostFormData) => {
    const res = await axiosInstance.post("/post/create-post", postData);
    return res.data;
}
export const getPosts = async () => {
    const res = await axiosInstance.get("/post/get-posts");
    return res.data.posts;
}

export const addComment = async ({postId, text}: {postId:string, text:string}) => {
    const res = await axiosInstance.put(`post/${postId}/add-comment`,{text})
    return res.data;
}

export const toggleLike = async  ({postId}:{postId:string}) => {
    const res = await axiosInstance.put(`post/${postId}/toggle-like`)
    return res.data
}
