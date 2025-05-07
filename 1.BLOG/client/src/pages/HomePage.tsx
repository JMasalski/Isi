import {Link} from "react-router";
import {Bell, Bookmark, Home, Mail, Search, User} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useEffect, useState} from "react";
import {generateDummyPosts} from "@/lib/constants.ts";
import {Post} from "@/types/post.ts";
import PostCard from "@/components/PostCard.tsx";

const HomePage = () => {
    const [dummyPost, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const dummyPosts = generateDummyPosts(50);
        setPosts(dummyPosts);
    }, []);



    return (
        <div className="min-h-screen bg-yellow-50">
            {/* Main layout */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
                {/* Left sidebar */}
                <div className="md:col-span-3">
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
                                    <Home className="h-6 w-6"/>
                                    Home
                                </Link>
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-3 text-lg font-bold hover:bg-pink-200 p-2 rounded-lg transition-colors"
                                >
                                    <User className="h-6 w-6"/>
                                    Profile
                                </Link>
                                <Link
                                    to="#"
                                    className="flex items-center gap-3 text-lg font-bold hover:bg-pink-200 p-2 rounded-lg transition-colors"
                                >
                                    <Bell className="h-6 w-6"/>
                                    Notifications
                                </Link>
                                <Link
                                    to="#"
                                    className="flex items-center gap-3 text-lg font-bold hover:bg-pink-200 p-2 rounded-lg transition-colors"
                                >
                                    <Mail className="h-6 w-6"/>
                                    Messages
                                </Link>
                                <Link
                                    to="#"
                                    className="flex items-center gap-3 text-lg font-bold hover:bg-pink-200 p-2 rounded-lg transition-colors"
                                >
                                    <Bookmark className="h-6 w-6"/>
                                    Bookmarks
                                </Link>
                            </nav>

                            <Button variant={"elevated"}
                                    className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold text-lg">
                                Post
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Main content */}
                <div className="md:col-span-6">
                    <div
                        className="bg-white border-4 border-black rounded-xl p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-4">
                        <h1 className="text-2xl font-black mb-4">Home</h1>
                        {/* Post creation */}
                        <div className="flex gap-3 mb-6">
                            <Avatar className="border-2 border-black">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user"/>
                                <AvatarFallback className="bg-pink-300">UN</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <Input
                                    placeholder="What's happening?"
                                    // className="border-4 border-black rounded-xl mb-2 p-4 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                                <div className="flex justify-end mt-2">
                                    <Button variant={"elevated"}
                                            className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold rounded-xl">
                                        Post
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/* Feed */}
                        <div className="space-y-6">
                            {/* Post 1 */}
                            {dummyPost.map((post) => <PostCard key={post._id} post={post}/>)}
                            {/* Right sidebar */}
                        </div>
                    </div>
                </div>
                <div className="md:col-span-3">
                    <div
                        className="bg-white border-4 border-black rounded-xl p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500"/>
                            <Input
                                placeholder="Search"
                                className="pl-10 border-4 border-black rounded-xl p-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>
                    </div>

                    <div
                        className="bg-white border-4 border-black rounded-xl p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-xl font-black mb-4">Trending</h2>
                        <div className="space-y-4">
                            <div className="hover:bg-pink-100 p-2 rounded-lg transition-colors">
                                <p className="text-gray-500 text-sm">Trending in Design</p>
                                <p className="font-bold">#Neobrutalism</p>
                                <p className="text-gray-500 text-sm">5,243 posts</p>
                            </div>
                            <div className="hover:bg-pink-100 p-2 rounded-lg transition-colors">
                                <p className="text-gray-500 text-sm">Trending in Tech</p>
                                <p className="font-bold">#WebDesign</p>
                                <p className="text-gray-500 text-sm">3,128 posts</p>
                            </div>
                            <div className="hover:bg-pink-100 p-2 rounded-lg transition-colors">
                                <p className="text-gray-500 text-sm">Trending in Development</p>
                                <p className="font-bold">#ReactJS</p>
                                <p className="text-gray-500 text-sm">2,854 posts</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage