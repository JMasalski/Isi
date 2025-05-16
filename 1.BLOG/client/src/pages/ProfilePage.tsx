import {Link, useParams} from "react-router";
import {ArrowLeftIcon, Calendar, LinkIcon, MapPin} from "lucide-react";
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
        createdAt: string;
        updatedAt: string;
        bio:string;
        city:string;
        linkBio:string;
        backgroundPic:string;
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
    if (!userProfile) {
        return <div>Loading...</div>;
    }
    console.log("userProfile", userProfile)
    const {user,posts} = userProfile;
    const isOwner = user._id === authUser._id
    const joinDate = new Date(user.createdAt);




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
                        <img src={user.backgroundPic} alt="Cover" loading="lazy" className="w-full h-full object-cover"/>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between">
                            <Avatar className="border-2 border-black size-16 md:size-32 -mt-15 md:-mt-20">
                                <AvatarImage src={user.profilePic} alt="@user"/>
                                <AvatarFallback className="bg-pink-300">ME</AvatarFallback>
                            </Avatar>
                            {isOwner && (
                                <Button variant={"elevated"}>
                                    Edit profile
                                </Button>
                            )}
                        </div>
                        <div className="flex flex-col justify-between p-3 gap-y-2">
                            <h2 className="font-bold text-2xl">
                                {user.name}
                            </h2>
                            <span className="text-gray-500">
                                @{user.name.replace(/\s+/g, "").toLowerCase()}
                            </span>

                            <p>
                                {userProfile?.user.bio}
                            </p>

                            <div className="flex items-center gap-5">
                                <p className="flex items-center text-sm text-gray-500 gap-1">
                                    <MapPin size={20}/> {user.city}
                                </p>
                                <p className="flex items-center text-sm text-gray-500 gap-1">
                                    <LinkIcon size={20}/>
                                    <a href={user.linkBio} target="_blank" rel="noopener noreferrer">
                                        {user.linkBio}
                                    </a>
                                </p>
                                <p className="flex items-center text-sm text-gray-500 gap-1">
                                    <Calendar size={20}/>
                                    Joined{" "}
                                    {new Date(joinDate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                    })}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage