
import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getPostById} from "@/lib/api.ts";

const PostPage = () => {
    const {postId} = useParams();

    const { data } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPostById(postId!), // ✅ przekazujesz funkcję, a nie wynik
        enabled: !!postId, // ⛑️ zabezpieczenie jeśli postId jest undefined
    });

    console.log(data)

    return (
        <div>PostPage {postId}</div>
    )
}
export default PostPage
