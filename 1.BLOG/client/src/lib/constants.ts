
export function generateDummyPosts(count = 50) {
    const authors = ["John Doe", "Jane Roe", "Alice Smith", "Bob Johnson", "Emily Davis"];
    const commentsSamples = [
        "Great post!",
        "Very helpful. Thanks!",
        "Interesting perspective.",
        "Can you elaborate more?",
        "I totally agree.",
    ];

    const posts = [];

    for (let i = 1; i <= count; i++) {
        const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
        const randomComments = Array.from({ length: Math.floor(Math.random() * 4) }, (_, cIdx) => ({
            user: {
                name: authors[Math.floor(Math.random() * authors.length)],
            },
            text: commentsSamples[Math.floor(Math.random() * commentsSamples.length)],
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 100000000)).toISOString(),
        }));

        const randomLikes = Array.from({ length: Math.floor(Math.random() * 5) }, () => ({
            name: authors[Math.floor(Math.random() * authors.length)],
        }));

        posts.push({
            _id: `${i}`,
            content: `Sample post #${i} - Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
            author: {
                _id: `u${i}`,
                name: randomAuthor,
            },
            comments: randomComments,
            likes: randomLikes,
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 100000000)).toISOString(),
        });
    }

    return posts;
}
