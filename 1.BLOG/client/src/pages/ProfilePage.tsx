import {Link, useParams} from "react-router";
import {ArrowLeftIcon} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useQuery} from "@tanstack/react-query";
import {getUserProfile} from "@/lib/api.ts";
import UseAuthUser from "@/hooks/useAuthUser.tsx";


interface UserProfile {
    success: boolean;
    user: {
        _id: string;
        name: string;
        email: string;
        profilePic: string;
        created_at: string;
        updated_at: string;
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
    
    const {authUser} = UseAuthUser()
    
    const {data: userProfile} = useQuery<UserProfile>({
        queryKey: ['userProfile', username],
        queryFn: () => getUserProfile(username!),
        enabled: !!username,
    });
    const isOwner = userProfile?.user._id === authUser._id

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
                    <div className="h-64 border-y-4 border-black">
                        <img src="https://placehold.co/800x200" alt="Cover" className="w-full h-full object-cover"/>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between">
                            <Avatar className="border-2 border-black size-16 md:size-32 -mt-15 md:-mt-20">
                                <AvatarImage src={userProfile?.user.profilePic} alt="@user"/>
                                <AvatarFallback className="bg-pink-300">ME</AvatarFallback>
                            </Avatar>
                            {isOwner && (
                                <Button variant={"elevated"}>
                                    Edit profile
                                </Button>
                            )}
                        </div>
                        <div className="flex flex-col justify-between p-3">
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