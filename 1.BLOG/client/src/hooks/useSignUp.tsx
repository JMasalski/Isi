import {useMutation, useQueryClient} from "@tanstack/react-query";
import {signup} from "@/lib/api.ts";
import toast from "react-hot-toast";

const UseSignUp = () => {
    const queryClient = useQueryClient()
    const {mutate, isPending, error} = useMutation({
        mutationFn: signup,
        onSuccess: () =>queryClient.invalidateQueries({queryKey: ["authUser"]}),
        onError: () => {
            toast.error("Something went wrong")
        }
    })
    return {isPending, error, signUpMutation: mutate}
}
export default UseSignUp
