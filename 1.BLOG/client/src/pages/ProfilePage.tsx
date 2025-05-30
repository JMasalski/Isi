import {Link, useParams} from "react-router";
import {ArrowLeftIcon, Calendar, LinkIcon, MapPin} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useQuery} from "@tanstack/react-query";
import {getUserProfile} from "@/lib/api.ts";
import UseAuthUser from "@/hooks/useAuthUser.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import PostCard from "@/components/PostCard.tsx";
import {Post, User} from "@/types/types.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import EditProfileForm from "@/components/forms/EditProfileForm.tsx";
import LoaderPage from "@/components/LoaderPage.tsx";


interface UserProfile {
    user: User;
    posts: Post[]
    likedPosts: Post[];
    mediaPosts: Post[];
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
        return <LoaderPage/>;
    }
    console.log(userProfile)

    const {user, posts, likedPosts, mediaPosts} = userProfile;
    const isOwner = user._id === authUser._id
    const joinDate = new Date(user.createdAt);

    const fullPosts: Post[] = posts.map((post) => ({
        ...post,
        author: {
            _id: user._id,
            name: user.name,
            profilePic: user.profilePic,
        }
    }));

    const fullMediaPost: Post[] = mediaPosts.map((post) => ({
        ...post,
        author: {
            _id: user._id,
            name: user.name,
            profilePic: user.profilePic,
        }
    }));


    console.log("Full posts", fullPosts)


    return (
        <div className="min-h-screen bg-yellow-50 flex flex-col w-full p-2 md:p-4 lg:p-10">
            <div className="flex flex-col gap-y-4  w-full">
                <div className="bg-white rounded-xl border-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Link to={'/'} className="flex items-center gap-2 p-4">
                        <ArrowLeftIcon size={15}/>
                        <p className="text-lg font-bold ">
                            Back to home
                        </p>
                    </Link>
                    <div className="h-64 border-y-4 border-black">
                        <img
                            src={user.backgroundPic?.trim() ? user.backgroundPic : "/placeholder.webp"}
                            alt="Cover"
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />

                    </div>
                    <div className="p-6">
                        <div className="flex justify-between">
                            <Avatar className="border-2 border-black size-16 md:size-32 -mt-15 md:-mt-20">
                                <AvatarImage src={user.profilePic} alt="@user"/>
                                <AvatarFallback className="bg-pink-300">ME</AvatarFallback>
                            </Avatar>
                            {isOwner && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant={"elevated"}>
                                            Edit profile
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ">
                                        <DialogHeader>
                                            <DialogTitle>Edit profile</DialogTitle>
                                            <DialogDescription>
                                                Make changes to your profile here. Click save when you're done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <EditProfileForm/>
                                    </DialogContent>
                                </Dialog>
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
                                    <a href={user.linkBio || "#"} target="_blank" rel="noopener noreferrer">
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
                {/*Tabs here*/}
                <div className="bg-white border-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Tabs defaultValue="posts" className="w-full ">
                        <TabsList
                            className="w-full p-3 md:p-6 grid grid-cols-3 border-b-4 border-black rounded-none bg-transparent h-auto">
                            <TabsTrigger value="posts"
                                         className="data-[state=active]:shadow-[4px_4px_0px_0px_rgba(253,165,213,1)]
                                         rounded-md py-4 font-bold text-lg">
                                Posts
                            </TabsTrigger>
                            <TabsTrigger value="media"

                                         className="data-[state=active]:shadow-[4px_4px_0px_0px_rgba(253,165,213,1)]
                                         rounded-md py-4 font-bold text-lg">
                                Media
                            </TabsTrigger>
                            <TabsTrigger value="liked"
                                         className="data-[state=active]:shadow-[4px_4px_0px_0px_rgba(253,165,213,1)]
                                         rounded-md py-4 font-bold text-lg">
                                Liked
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="posts" className="p-5 md:p-10 space-y-5">
                            {fullPosts?.length > 0 ? (
                                fullPosts.map((post) => (
                                    <PostCard key={post._id} post={post} username={username} />
                                ))
                            ) : (
                                <div className="flex justify-center items-center h-40 text-center text-gray-500 font-semibold">
                                    No posts found.
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="media" className="p-5 md:p-10 space-y-5">
                            {fullMediaPost?.length > 0 ? (
                                fullMediaPost.map((mediaPost) => (
                                    <PostCard key={mediaPost._id} post={mediaPost} username={username} />
                                ))
                            ) : (
                                <div className="flex justify-center items-center h-40 text-center text-gray-500 font-semibold">
                                    No media posts found.
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="liked" className="p-5 md:p-10 space-y-5">
                            {likedPosts?.length > 0 ? (
                                likedPosts.map((likedPost) => (
                                    <PostCard key={likedPost._id} post={likedPost} username={username} />
                                ))
                            ) : (
                                <div className="flex justify-center items-center h-40 text-center text-gray-500 font-semibold">
                                    No liked posts found.
                                </div>
                            )}
                        </TabsContent>


                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage