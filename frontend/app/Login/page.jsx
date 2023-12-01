"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }).email("Must be a valid email"),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

const page = () => {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        password:"",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
      try {
        const res = await fetch(`http://localhost:5000/login`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
          credentials: 'include',
        })
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <Form {...form}>
      <div className="flex items-center flex-col tracking-wide">
        <img
          src="/Login.svg"
          height={100}
          width={100}
          className="bg-white rounded-full p-2"
          alt="logo"
          
        />
        <h2 className="text-[2.3vmax] font-semibold pt-6">
          Log in to your account
        </h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-1/2 mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          

          <div className="button flex justify-center">
            <Button type="submit" className="shad-button_primary w-1/3">
              Login
            </Button>
          </div>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
          </p>
        </form>
      </div>
    </Form>
  );
};

export default page;
