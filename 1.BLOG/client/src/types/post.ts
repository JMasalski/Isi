export type Post = {
    _id: string;
    content: string;
    author: {
        _id: string;
        name: string;
        profilePic:string
    };
    comments: {
        user: {
            name: string;
        };
        text: string;
        createdAt: string;
    }[];
    likes: {
        name: string;
    }[];
    image: string | null;
    createdAt: string;
};

export type PostFormData = Omit<Post, "_id" | "author" | "comments" | "likes" | "createdAt"> 