import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {registerSchema, SignupData} from "@/lib/formSchemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Shuffle} from "lucide-react";
import useSignUp from "@/hooks/useSignUp.tsx";

const SignUpForm = () => {
    const [avatarUrl, setAvatarUrl] = useState("")
    const {isPending, signUpMutation} = useSignUp()


    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            profilePic: "",
        },
    })

    function onSubmit(values: z.infer<typeof registerSchema>) {
        const {confirmPassword, ...dataToSend} = values;
        signUpMutation(dataToSend as SignupData);
    }

    useEffect(() => {
        const randomIdx = Math.floor(Math.random() * 100) + 1;
        const url = `https://avatar.iran.liara.run/public/${randomIdx}.png`;
        setAvatarUrl(url);
        form.setValue("profilePic", url); // zapisujemy do formularza
    }, []);


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                <FormField
                    control={form.control}
                    name="profilePic"
                    render={() => (
                        <FormItem>
                            <div className="flex flex-col items-center space-y-4">
                                <Avatar className="size-25">
                                    <AvatarImage src={avatarUrl}/>
                                    <AvatarFallback>Loading...</AvatarFallback>
                                </Avatar>
                                <Button
                                    type="button"
                                    variant="elevated"
                                    onClick={() => {
                                        const newIdx = Math.floor(Math.random() * 100) + 1;
                                        const newUrl = `https://avatar.iran.liara.run/public/${newIdx}.png`;
                                        setAvatarUrl(newUrl);
                                        form.setValue("profilePic", newUrl);
                                    }}
                                >
                                    Change Avatar <Shuffle/>
                                </Button>
                            </div>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 xl:grid-cols-1 gap-3">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your name..." {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="johndoe@mail.com" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="●●●●●●●●●●" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="●●●●●●●●●●" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                </div>
                <Button variant={"elevated"} type="submit" className="w-full">
                    {isPending ? "Signing up..." : "Sign Up"}
                </Button>
            </form>
        </Form>
    )
}

export default SignUpForm