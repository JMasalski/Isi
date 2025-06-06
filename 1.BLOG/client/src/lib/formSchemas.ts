import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
    profilePic: z.string().url(),
}).refine((data)=> data.password === data.confirmPassword,{
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export const postSchema = z.object({
    content: z.string().min(1, "You can't add an empty post"),
    image: z.string()
})

export type SignupData = Omit<z.infer<typeof registerSchema>, "confirmPassword">;
export type LoginData = z.infer<typeof loginSchema>;

export const editProfileSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    bio: z.string().max(100, "Bio must be at most 100 characters long").optional(),
    city: z.string().max(50, "City must be at most 50 characters long").optional(),
    linkBio: z.string().url().optional(),
    backgroundPic: z.string()
})

export type UpdateProfileData = z.infer<typeof editProfileSchema>;