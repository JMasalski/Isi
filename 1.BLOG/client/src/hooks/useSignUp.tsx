import {useMutation, useQueryClient} from "@tanstack/react-query";
import {signup} from "@/lib/api.ts";


const UseSignUp = () => {
    const queryClient = useQueryClient()
    const {mutate, isPending, error} = useMutation({
        mutationFn: signup,
        onSuccess: () =>queryClient.invalidateQueries({queryKey: ["authUser"]}),
    })
    return {isPending, error, signUpMutation: mutate}
}
export default UseSignUp
