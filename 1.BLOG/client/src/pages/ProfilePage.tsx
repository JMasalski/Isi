import {Link, useParams} from "react-router";
import {ArrowLeftIcon} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useQuery} from "@tanstack/react-query";
import {getUserProfile} from "@/lib/api.ts";


interface UserProfile {
    success: boolean;
    user: {
        _id: string;
        name: string;
        email: string;
        profilePic: string;
        created_at: string;
        updated_at: string;
        // inne pola użytkownika
    };
    posts: {
        _id: string;
        content: string;
        createdAt: string;
        updatedAt: string;
        likes: Array<string>
        comments: {
            text: string;
            createdAt: string;
            user: {
                name: string;
                profilePic: string;
            };
        }[];
    }[];
}

const ProfilePage = () => {
    const {username} = useParams()


    const {data: userProfile} = useQuery<UserProfile>({
        queryKey: ['userProfile', username],
        queryFn: () => getUserProfile(username!),
        enabled: !!username,
    });
    console.log(userProfile);

    return (
        <div className="min-h-screen bg-yellow-50 flex flex-col w-full p-2 md:p-4 lg:p-10">
            {/*Okno z profilem użytkownika*/}
            <div className="flex flex-col   w-full">
                <div className="bg-white rounded-xl border-4">
                    <Link to={'/'} className="flex items-center gap-2 p-4">
                        <ArrowLeftIcon size={15}/>
                        <p className="text-lg font-bold ">
                            Back to home
                        </p>
                    </Link>
                    <div className="h-64 bg-cyan-400 border-y-4 border-black">
                        <img src="https://placehold.co/800x200" alt="Cover" className="w-full h-full object-cover"/>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between">
                            <Avatar className="w-32 h-32 border-4 border-black -mt-20 bg-white">
                                <AvatarImage src={userProfile?.user.profilePic} alt="@username"/>
                                <AvatarFallback className="text-4xl bg-pink-300">UN</AvatarFallback>
                            </Avatar>
                            <Button
                                className="bg-white hover:bg-gray-100 text-black font-bold rounded-xl border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                                Edit Profile
                            </Button>
                        </div>
                        <div className="flex flex-col justify-between">
                            <h2 className="font-bold text-2xl">
                                {userProfile?.user.name}
                            </h2>
                            <span className="text-gray-500">
                                @{userProfile?.user.name.replace(/\s+/g, "").toLowerCase()}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProfilePage