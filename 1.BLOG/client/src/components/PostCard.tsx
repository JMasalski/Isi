import {useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Heart, MessageCircle, Trash, X} from "lucide-react";
import {Post} from "@/types/types.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addComment, deletePost, toggleLike} from "@/lib/api";
import UseAuthUser from "@/hooks/useAuthUser";
import {Button} from "./ui/button";
import toast from "react-hot-toast";
import {Link} from "react-router";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";


interface Comment {
    id: string;
    user: {
        name: string;
        profilePic: string;
    };
    text: string;
    createdAt: string;
}

interface PostCardProps {
    post: Post;
    username?: string
}


const Comment = ({comment}: { comment: Comment }) => {
    return (
        <div className="border-t-4 border-black py-3 px-2 hover:bg-yellow-100 transition-colors">
            <div className="flex gap-2">
                <Avatar className="h-8 w-8 border-2 border-black">
                    <AvatarImage
                        src={comment.user.profilePic || "/placeholder.svg"}
                        alt={comment.user.name}
                    />
                    <AvatarFallback className="bg-pink-300">
                        {comment.user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-sm">{comment.user.name}</span>
                        <span className="text-gray-500 text-xs">
                                                    @{comment.user.name.replace(/\s+/g, "").toLowerCase()}
                                                </span>
                        <span className="text-gray-500 text-xs">
                                                    · {comment.createdAt.split("T")[0]}
                                                </span>
                    </div>
                    <p className="text-sm mt-1">{comment.text}</p>
                </div>
            </div>
        </div>
    );
};

const PostCard = ({post, username}: PostCardProps) => {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState("");
    const {content, author, comments, likes, createdAt} = post;
    const {authUser} = UseAuthUser();

    const isOwner = post.author._id === authUser._id





    const hasLiked = post.likes.some((like) => like._id === authUser._id);


    const queryClient = useQueryClient();
    const {mutate: addCommentMutation, isPending} = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["posts"]});
        },
    });

    const {mutate: toggleLikeMutation} = useMutation({
        mutationFn: toggleLike,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["posts"]});
            if (username) {
                queryClient.invalidateQueries({queryKey: ['userProfile', username]});
            }
        },
    })

    const {mutate: deltePostMutation} = useMutation({
        mutationFn: deletePost,
        onSuccess: (deleteData) => {
            toast.success(deleteData.message)
            queryClient.invalidateQueries({queryKey: ["posts"]});
            if (username) {
                queryClient.invalidateQueries({queryKey: ['userProfile', username]});
            }
        }
    })


    return (
        <div className="border-4 border-black rounded-xl p-4 hover:bg-yellow-50 transition-colors">
            <div className="flex gap-3">
                <Link to={`/profile/${post.author.name}`}>
                    <Avatar className="border-2 size-12 border-black">
                        <AvatarImage
                            src={post.author.profilePic || "/placeholder.svg"}
                            alt="@johndoe"
                        />
                        <AvatarFallback
                            className="bg-green-300">{post.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Link>

                <div className="flex-1">
                    <div className="flex justify-between gap-2">
                        <div>
                            <span className="font-bold">{author.name} </span>
                            <span className="text-gray-500">
                                                    @{author.name.replace(/\s+/g, "").toLowerCase()}
                                                </span>
                            <span className="text-gray-500">· {createdAt.split("T")[0]}</span>
                        </div>
                        {isOwner && (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="elevated" className="bg-[#d1503b] text-white size-8 hover:bg-[#b1503b]">
                                        <Trash className=""/>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete your post
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button
                                            variant="elevated"
                                            className="bg-[#d1503b] text-white  hover:bg-[#b1503b]"
                                            onClick={() => {
                                                deltePostMutation( post._id);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                        <DialogTrigger>
                                            <Button variant="elevated" className="bg-green-400 text-white  hover:bg-green-500">
                                                Cancel
                                            </Button>
                                        </DialogTrigger>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                        )}
                    </div>

                    <p className="my-2">{content}</p>

                    {post.image && (
                        <img
                            src={post.image}
                            alt="Post image"
                            className="w-1/2 h-auto border-2 self-center mx-auto rounded-lg my-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            loading="lazy"
                        />
                    )}

                    <div className="flex space-x-50 mt-5">
                        <button
                            className="flex items-center gap-1"
                            onClick={() => toggleLikeMutation({postId: post._id})}>
                            <Heart className="h-5 w-5 hover:text-pink-500" fill={hasLiked ? "#f6339a" : "none"}/>
                            <span>{likes.length}</span>
                        </button>
                        <button
                            className="flex items-center gap-1"
                            onClick={() => setShowComments(!showComments)}
                        >
                            <MessageCircle
                                className={`h-5 w-5 ${showComments ? "text-green-500" : "hover:text-green-500"}`}/>
                            <span>{comments.length}</span>
                        </button>

                    </div>
                </div>
            </div>

            {showComments && (
                <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">Comments</h3>
                        <button
                            onClick={() => setShowComments(false)}
                            className="p-1 rounded-md hover:bg-gray-200"
                        >
                            <X className="h-4 w-4"/>
                        </button>
                    </div>

                    <div className="bg-white border-4 border-black rounded-xl overflow-hidden">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <Comment key={comment.id} comment={comment}/>
                            ))
                        ) : (
                            <div className="py-4 px-3 text-center text-gray-500">
                                No comments yet. Be the first to comment!
                            </div>
                        )}

                        <div className="border-t-4 border-black p-3">
                            <div className="flex gap-2">
                                <Avatar className="h-8 w-8 border-2 border-black">
                                    <AvatarImage src={authUser.profilePic} alt="@user"/>
                                    <AvatarFallback className="bg-pink-300">ME</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <textarea
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        className="w-full p-2 border-4 border-black rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Write a comment..."
                                        rows={2}
                                    />
                                    <Button
                                        onClick={() => {
                                            addCommentMutation({text: commentText, postId: post._id});
                                            setCommentText("");
                                        }}
                                        disabled={isPending}
                                        variant={"elevated"}
                                        className="mt-2 px-4 py-2 bg-green-400 font-bold hover:bg-green-500"
                                    >
                                        {isPending ? "Posting..." : "Reply"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;