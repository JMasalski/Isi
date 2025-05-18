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
    likes: {_id:string}[];
    image: string | null;
    createdAt: string;
};

export type PostFormData = {
    content: string;
    image: string | null;
}

export type User = {
    _id:string;
    name:string;
    email:string;
    profilePic:string;
    createdAt:string;
    updatedAt:string;
    bio:string | null;
    city:string | null;
    linkBio:string | undefined;
    backgroundPic:string | null;
}