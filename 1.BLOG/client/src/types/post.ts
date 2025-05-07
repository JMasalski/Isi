export type Post = {
    _id: string;
    content: string;
    author: {
        _id: string;
        name: string;
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
    createdAt: string;
};