
import {useForm} from "react-hook-form";
import {z} from "zod";
import {loginSchema} from "@/lib/formSchemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx";

import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import UseSignIn from "@/hooks/useSignIn.tsx";

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
    const {isPending, signInMutation} = UseSignIn()
  function onSubmit(values: z.infer<typeof loginSchema>) {
    signInMutation({email: values.email, password: values.password})
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@mail.com" {...field} />
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
          <Button variant={"elevated"} type="submit" className="w-full">
              {isPending ? "Loading...": "Login"}
          </Button>
        </form>
      </Form>
  )
}

export default LoginForm