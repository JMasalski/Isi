import { Link } from "react-router";
import { Home, LogOut, User } from "lucide-react";

import PostCard from "@/components/PostCard";
import NewPostForm from "@/components/forms/NewPostForm";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/api";
import useLogOut from "@/hooks/useLogOut";
import useAuthUser from "@/hooks/useAuthUser";
import { useEffect, useRef } from "react";

const HomePage = () => {
    const { logoutMutation } = useLogOut();
    const { authUser } = useAuthUser();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,

    } = useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });

    const bottomRef = useRef(null);

    // Observer that triggers fetching next page
    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );

        if (bottomRef.current) observer.observe(bottomRef.current);

        return () => {
            if (bottomRef.current) observer.unobserve(bottomRef.current);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

    return (
        <div className="min-h-screen bg-yellow-50">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
                {/* Left Sidebar */}
                <div className="md:col-span-3 md:sticky top-3 self-start">
                    <div className="bg-white border-4 border-black rounded-xl p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex flex-col gap-6">
                            <Link to="/" className="text-3xl font-black">
                                BLOGR
                            </Link>

                            <nav className="space-y-4">
                                <Link
                                    to="/"
                                    className="flex items-center gap-3 text-lg font-bold hover:bg-pink-200 p-2 rounded-lg transition-colors"
                                >
                                    <Home className="size-6" />
                                    Home
                                </Link>
                                <Link
                                    to={`/profile/${authUser?.name}`}
                                    className="flex items-center gap-3 text-lg font-bold hover:bg-pink-200 p-2 rounded-lg transition-colors"
                                >
                                    <User className="size-6" />
                                    Profile
                                </Link>
                                <div className="w-full border-b border-2 border-black" />
                                <button
                                    onClick={() => logoutMutation()}
                                    className="cursor-pointer flex items-center gap-3 text-lg font-bold hover:bg-pink-200 p-2 rounded-lg transition-colors w-full"
                                >
                                    <LogOut className="size-6" />
                                    Logout
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-9">
                    <div className="bg-white border-4 border-black rounded-xl p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-4">
                        <h1 className="text-2xl font-black mb-4">Home</h1>
                        <NewPostForm />

                        <div className="space-y-6">
                            {allPosts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>

                        {isFetchingNextPage && (
                            <p className="text-center text-gray-500 mt-4">Loading more...</p>
                        )}

                        <div ref={bottomRef} className="h-1" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
