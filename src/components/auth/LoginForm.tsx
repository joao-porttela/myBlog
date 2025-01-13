"use client";

import React from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";
import {toast} from "@/hooks/use-toast";
import {login} from "@/lib/auth";
import {useAuth} from "@/hooks/use-auth";
import Loading from "../ui/loading";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string(),
});

export default function LoginForm() {
  const {loading, setLoading, setToken, setUser} = useAuth(); // Access UserContext
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {email, password} = values;

    try {
      setLoading(true);

      // Make login request
      const result = await login({email, password});

      // Extract user and token from the backend response
      const {user, payload: token} = result.message;

      // Update AuthContext
      setUser(user);
      setToken(token);

      // Store user and token in local storage
      localStorage.setItem("__refresh_token__", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Process response here
      toast({title: "Login Successful"});

      // Redirect user to home page
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your details below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button className="w-full" type="submit">
              {loading ? <Loading /> : "Login"}
            </Button>
          </form>

          <div className="mt-4 space-y-4 text-center text-sm">
            <div className="flex items-center">
              <Link href="#" className="w-full text-center text-sm underline">
                Forgot your password?
              </Link>
            </div>

            <div>
              Don&apos;t have an account?{" "}
              <Link href="/auth/sign-up" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
