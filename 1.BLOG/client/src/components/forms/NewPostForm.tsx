import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/lib/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postSchema } from "@/lib/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostFormData } from "@/types/post";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import toast from "react-hot-toast";
import UseAuthUser from "@/hooks/useAuthUser";

const NewPostForm = () => {

    const {authUser}= UseAuthUser()
    const queryClient = useQueryClient()
  const { mutate, error, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log("Post created successfully", data);
      queryClient.invalidateQueries({queryKey: ["posts"]});

    },
    onError: () => {
        toast.error("Error creating post");
    }
  });

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof postSchema>) {
    mutate(values as PostFormData);
  }
  return (
    <div className="flex gap-3 mb-6">
      <Avatar className="border-2 border-black">
        <AvatarImage src={authUser.profilePic} alt="@user" />
        <AvatarFallback className="bg-pink-300">ME</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="What's happening?"
                      {...field}
                      className="border-4 border-black rounded-xl mb-2 p-4 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end mt-2">
              <Button
                variant={"elevated"}
                type="submit"
                className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold rounded-xl"
              >
                {isPending ? "Posting..." : "Post"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewPostForm;
