
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Heart, MessageCircle, Share} from "lucide-react";
import {Post} from "@/types/post.ts";

interface PostCardProps {
    post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
    // Możesz teraz bezpośrednio z destrukturalizować właściwości obiektu `post`
    const { content, author, comments, likes, createdAt } = post;
    return (
        <div className="border-4 border-black rounded-xl p-4 hover:bg-yellow-50 transition-colors">
            <div className="flex gap-3">
                <Avatar className="border-2 border-black">
                    <AvatarImage src="https://avatar.iran.liara.run/public/19.png" alt="@johndoe" />
                    <AvatarFallback className="bg-green-300">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-bold">{author.name}</span>
                        <span className="text-gray-500">@{author.name.replace(/\s+/g, '').toLowerCase()}</span>
                        <span className="text-gray-500">· {createdAt.split("T")[0]}</span>
                    </div>
                    <p className="my-2">
                        {content}
                    </p>
                    <div className="flex justify-between">
                        <button className="flex items-center gap-1 hover:text-pink-500">
                            <Heart className="h-5 w-5" />
                            <span>{likes.length}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-green-500">
                            <MessageCircle className="h-5 w-5" />
                            <span>{comments.length}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-purple-500">
                            <Share className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostCard
