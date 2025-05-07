
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

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
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
          <Button variant={"elevated"} type="submit" className="w-full">Login</Button>
        </form>
      </Form>
  )
}

export default LoginForm