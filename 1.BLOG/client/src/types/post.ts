export type Post = {
    _id: string;
    content: string;
    author: {
        _id: string;
        name: string;
        profilePic:string
    };
    comments: {
        id: string;
        user: {
            name: string;
            profilePic:string;
        };
        text: string;
        createdAt: string;
    }[];
    likes: {
        _id: string;
    }[];
    image: string | null;
    createdAt: string;
};

export type PostFormData = Omit<Post, "_id" | "author" | "comments" | "likes" | "createdAt"> 