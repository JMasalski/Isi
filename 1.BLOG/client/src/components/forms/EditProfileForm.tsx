import {useForm} from "react-hook-form";
import {editProfileSchema} from "@/lib/formSchemas.ts";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField, FormItem} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import UseAuthUser from "@/hooks/useAuthUser.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState, useRef} from "react";
import {Camera, X} from "lucide-react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateUserProfile} from "@/lib/api.ts";


const EditProfileForm = () => {
    const {authUser} = UseAuthUser()
    const [image, setImage] = useState<string | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const form = useForm<z.infer<typeof editProfileSchema>>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            name: authUser.name || "",
            bio: authUser.bio || "",
            city: authUser.city || "",
            linkBio: authUser.linkBio || "",
            backgroundPic: ""
        }
    })

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            if (typeof base64Image === "string") {
                setImage(base64Image);
                form.setValue("backgroundPic", base64Image);
                console.log("base64Image", base64Image);
            } else {
                setImage(null);
            }
        };

    };

    const queryClient = useQueryClient();
    const {mutate: updateProfile} = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["authUser"]})
        }
    })

    function onSubmit(values: z.infer<typeof editProfileSchema>) {
        updateProfile(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="relative">
                    <div className="w-full h-40 bg-gray-200 rounded-lg">
                        <img
                            src={image ? image : authUser.backgroundPic ? authUser.backgroundPic : "/placeholder.webp"}
                            alt="Background"
                            className="w-full h-full rounded-lg object-cover"
                        />
                        <Input
                            id="backgroundPic"
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden cursor-pointer"
                            onChange={handleImageUpload}
                        />
                        {image && (
                            <button type="button"
                                    className="absolute top-2 right-2 bg-amber-50 border-2 size-10 flex items-center justify-center rounded-full"
                                    onClick={() => {
                                        setImage(null)
                                        form.setValue("backgroundPic", "")
                                        if (fileInputRef.current) {
                                            fileInputRef.current.value = "";
                                        }
                                    }}>
                                <X/>
                            </button>)}
                        <label
                            className="absolute rounded-full bottom-2 right-2 bg-amber-50 border-2 size-10 flex items-center justify-center"
                            htmlFor="backgroundPic">
                            <Camera className="size-6  rounded-lg"/>
                        </label>
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <label htmlFor="name">Name</label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Name"
                                {...field}
                            />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({field}) => (
                        <FormItem>
                            <label htmlFor="bio">Bio</label>
                            <Input
                                id="bio"
                                type="text"
                                placeholder="A short description about you..."
                                {...field}
                            />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({field}) => (
                        <FormItem>
                            <label htmlFor="city">City</label>
                            <Input
                                id="city"
                                type="text"
                                placeholder="New York"
                                {...field}
                            />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="linkBio"
                    render={({field}) => (
                        <FormItem>
                            <label htmlFor="linkBio">Link Bio</label>
                            <Input
                                id="linkBio"
                                type="text"
                                placeholder="https://example.com"
                                {...field}
                            />
                        </FormItem>
                    )}
                />

                <Button variant="elevated" className="w-full bg-cyan-400 hover:bg-cyan-500 font-bold" type="submit">
                    Submit
                </Button>
            </form>
        </Form>
    )
}
export default EditProfileForm
