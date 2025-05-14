
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {signin} from "@/lib/api.ts";
import toast from "react-hot-toast";

const UseSignIn = () => {
    const queryClient = useQueryClient()
    const {mutate, isPending, error} = useMutation({
        mutationFn: signin,
        onSuccess: () =>queryClient.invalidateQueries({queryKey: ["authUser"]}),
        onError: () => {
            toast.error("Something went wrong")
        }
    })
    return {isPending, error, signInMutation: mutate}
}
export default UseSignIn
