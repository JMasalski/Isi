"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, X } from "lucide-react";
import { Post } from "@/types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "@/lib/api";
import UseAuthUser from "@/hooks/useAuthUser";
import { Button } from "./ui/button";

interface Author {
  name: string;
  profilePic: string;
}

interface Comment {
  id: string;
  author: Author; // contains name and profilePic
  text: string;
  createdAt: string;
}
interface PostCardProps {
  post: Post;
}

const Comment = ({ comment }: { comment: Comment }) => {
  return (
    <div className="border-t-4 border-black py-3 px-2 hover:bg-yellow-100 transition-colors">
      <div className="flex gap-2">
        <Avatar className="h-8 w-8 border-2 border-black">
          <AvatarImage
            src={comment.author.profilePic || "/placeholder.svg"}
            alt={comment.author.name}
          />
          <AvatarFallback className="bg-pink-300">
            {comment.author.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-1">
            <span className="font-bold text-sm">{comment.author.name}</span>
            <span className="text-gray-500 text-xs">
              @{comment.author.name.replace(/\s+/g, "").toLowerCase()}
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

const PostCard = ({ post }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { _id, content, author, comments, likes, createdAt } = post;

  const { authUser } = UseAuthUser();

  const queryClient = useQueryClient();
  const { mutate: addCommentMutation, isPending } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <div className="border-4 border-black rounded-xl p-4 hover:bg-yellow-50 transition-colors">
      <div className="flex gap-3">
        <Avatar className="border-2 border-black">
          <AvatarImage
            src={post.author.profilePic || "/placeholder.svg"}
            alt="@johndoe"
          />
          <AvatarFallback className="bg-green-300">JD</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold">{author.name}</span>
            <span className="text-gray-500">
              @{author.name.replace(/\s+/g, "").toLowerCase()}
            </span>
            <span className="text-gray-500">· {createdAt.split("T")[0]}</span>
          </div>
          <p className="my-2">{content}</p>
          <div className="flex justify-between">
            <button className="flex items-center gap-1 hover:text-pink-500">
              <Heart className="h-5 w-5" />
              <span>{likes.length}</span>
            </button>
            <button
              className={`flex items-center gap-1 ${
                showComments ? "text-green-500" : "hover:text-green-500"
              }`}
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-5 w-5" />
              <span>{comments.length}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-purple-500">
              <Share className="h-5 w-5" />
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
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="bg-white border-4 border-black rounded-xl overflow-hidden">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))
            ) : (
              <div className="py-4 px-3 text-center text-gray-500">
                No comments yet. Be the first to comment!
              </div>
            )}

            <div className="border-t-4 border-black p-3">
              <div className="flex gap-2">
                <Avatar className="h-8 w-8 border-2 border-black">
                  <AvatarImage src={authUser.profilePic} alt="@user" />
                  <AvatarFallback className="bg-pink-300">ME</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    value={commentText}
                    className="w-full p-2 border-4 border-black rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Write a comment..."
                    rows={2}
                  />
                  <Button
                    onClick={}
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
