import {Link} from "react-router";
import { Heart, Home, LogOut, User} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";


import {Post} from "@/types/post.ts";
import PostCard from "@/components/PostCard.tsx";

import NewPostForm from "@/components/forms/NewPostForm";
import { useQuery } from "@tanstack/react-query";
import {getPosts} from "@/lib/api";
import useLogOut from "@/hooks/useLogOut.tsx";

const HomePage = () => {
    const {data:allPosts} = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
    })
    const {logoutMutation} = useLogOut()

    return (
        <div className="min-h-screen bg-yellow-50">
            {/* Main layout */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
                {/* Left sidebar */}
                {/* //TODO: MAKE IT RESPONSIVE AND STICKY  */}
                <div className="md:col-span-3 sticky top-3 self-start">
                    <div
                        className="bg-white border-4 border-black rounded-xl p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex flex-col gap-6">
                            <Link to="/" className="text-3xl font-black">
                                BLOGR
                            </Link>

                            <nav className="space-y-4">
                                <Link
                                    to="/"
                                    className="flex items-center gap-3 text-lg font-bold hover:bg-pink-200 p-2 rounded-lg transition-colors"
                                >
                                    <Home className="size-6"/>
                                    Home
                                </Link>
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-3 text-lg font-bold hover:bg-pink-200 p-2 rounded-lg transition-colors"
                                >
                                    <User className="size-6"/>
                                    Profile
                                </Link>
                                <Link
                                    to="#"
                                    className="flex items-center gap-3 text-lg font-bold hover:bg-pink-200 p-2 rounded-lg transition-colors"
                                >
                                    <Heart className="size-6"/>
                                    Liked Posts
                                </Link>
                                <button
                                    onClick={logoutMutation}
                                    className="cursor-pointer flex items-center gap-3 text-lg font-bold hover:bg-pink-200 p-2 rounded-lg transition-colors w-full"

                                >
                                    <LogOut className="size-6"/>
                                    Logout
                                </button>
                            </nav>

                            <Button variant={"elevated"}
                                    className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold text-lg">
                                Post
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Main content */}
                <div className="md:col-span-9">
                    <div
                        className="bg-white border-4 border-black rounded-xl p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-4">
                        <h1 className="text-2xl font-black mb-4">Home</h1>
                        {/* Post creation */}
                            <NewPostForm/>
                        {/* Feed */}
                        <div className="space-y-6">
                            {/* Post 1 */}
                            {allPosts?.map((post:Post) => <PostCard key={post._id} post={post}/>)}
                            {/* Right sidebar */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage