"use client";

// React/next
import React from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

// zod/react-form
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

// Components
import Loading from "../ui/loading";

// UI
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";

// Hooks
import {useToast} from "@/hooks/use-toast";
import {useAuth} from "@/hooks/use-auth"; // Import UserContext
import {signUp} from "@/lib/auth";

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: "Username must have minimum 2 characters",
      })
      .max(20),
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must have at least 8 characters",
      })
      .max(20, {
        message: "Password must have maximum 20 characters",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must have at least 8 characters",
      })
      .max(20, {
        message: "Password must have maximum 20 characters",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  const {toast} = useToast();
  const {loading, setLoading, setToken, setUser} = useAuth(); // Access UserContext
  const router = useRouter(); // Initialize Next.js router

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      // Make sign up request
      const result = await signUp(values);

      // Extract user and token from the backend response
      const {user, payload: token} = result.message;

      // Update AuthContext
      setUser(user);
      setToken(token);

      // Store user and token in local storage
      localStorage.setItem("__refresh_token__", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Show success message
      toast({title: "Registration Successful"});

      // Redirect user to home page
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>Enter your details below to sign up</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? <Loading /> : "Sign up"}
            </Button>
          </form>

          <div className="mt-4 space-y-4 text-center text-sm">
            <div>
              Already have an account?{" "}
              <Link href="/auth/login" className="underline">
                Login
              </Link>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
