import axiosInstance from "@/lib/axios.ts";
import {LoginData, SignupData, UpdateProfileData} from "@/lib/formSchemas.ts";
import { PostFormData } from "@/types/types.ts";

export const signup = async (signupData: SignupData)=>{
    const res = await axiosInstance.post("/auth/sign-up", signupData);
    return res.data.user;
}

export const signin = async (loginData: LoginData)=>{
    const res = await axiosInstance.post("/auth/sign-in", loginData);
    return res.data.user;
}

export const logout = async () =>{
    const res = await axiosInstance.post("/auth/sign-out");
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

export const getUserProfile = async (username: string) => {
    const res = await axiosInstance.get(`/user/${username}/get-user`)
    return res.data
}

export const updateUserProfile = async(userData: UpdateProfileData) =>{
    const res = await axiosInstance.put("/user/update-profile", userData);
    return res.data;
}

export const createPost = async (postData: PostFormData) => {
    const res = await axiosInstance.post("/post/create-post", postData);
    return res.data;
}
export const getPosts = async ({ pageParam = null }) => {
    const limit = 5;
    const cursorParam = pageParam ? `&cursor=${encodeURIComponent(pageParam)}` : "";
    const res = await axiosInstance.get(`/post/get-posts?limit=${limit}${cursorParam}`);
    return res.data;
};

export const getPostById  = async (postId: string)=>{
    const res = await axiosInstance.get(`/post/${postId}`);
    return res.data.post;
}


export const deletePost = async (postId: string)=>{
    const res= await axiosInstance.delete(`/post/delete-post/${postId}`);
    console.log(res)

    return res.data;
}

export const addComment = async ({postId, text}: {postId:string, text:string}) => {
    const res = await axiosInstance.put(`post/${postId}/add-comment`,{text})
    return res.data;
}

export const toggleLike = async  ({postId}:{postId:string}) => {
    const res = await axiosInstance.put(`post/${postId}/toggle-like`)
    return res.data
}

