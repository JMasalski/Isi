import {useQuery} from "@tanstack/react-query";
import {getAuthUser} from "@/lib/api.ts";

const UseAuthUser = () => {
    const authUser = useQuery({
        queryKey:["authUser"],
        queryFn: getAuthUser,
        retry: false,
    })

    return {authUser:authUser.data?.user, isLoading: authUser.isLoading, isError: authUser.isError}
}
export default UseAuthUser
