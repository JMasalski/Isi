import {useForm} from "react-hook-form";
import {editProfileSchema} from "@/lib/formSchemas.ts";
import {z} from "zod";
import  {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField, FormItem} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import UseAuthUser from "@/hooks/useAuthUser.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

const EditProfileForm = () => {
    const {authUser} = UseAuthUser()
    const [image, setImage] = useState<string|ArrayBuffer|null>(null)
    const form = useForm<z.infer<typeof editProfileSchema>>({
        resolver: zodResolver(editProfileSchema),
        defaultValues:{
            name: authUser.name ||"",
            bio:authUser.bio|| "",
            city:authUser.city||"",
            linkBio:authUser.linkBio||"",
            backgroundPic:""
        }
    })

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setImage(base64Image);
            console.log("base64Image", base64Image);
            form.setValue("backgroundPic", base64Image as string);
        };
    };

    function onSubmit (values: z.infer<typeof editProfileSchema>) {
        console.log(values)
    }

    return (
       <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                <FormField
                     control={form.control}
                     name="backgroundPic"
                     render={({field}) => (
                          <FormItem>
                            <label htmlFor="backgroundPic">Background Picture</label>
                            <Input
                                 id="backgroundPic"
                                 type="file"
                                 accept="image/*"
                                 onChange={handleImageUpload}
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
