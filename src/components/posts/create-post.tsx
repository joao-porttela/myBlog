"use client";

import React from "react";

// UI
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";

// Components
import Loading from "../ui/loading";

// zod
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

// toast
import {toast} from "@/hooks/use-toast";

/**
 *
 * Form to create a new post
 *
 * Handle these two cases
 * Create category?
 * Create subcategory?
 *
 * Create a new post or cancel
 *
 */

// id: string,
// title: string,
// content: string,
// author: User,
// published: boolean,
// tags?: Tag[],
// categories?: Category[],
// subCategory?: SubCategory[]

const formSchema = z.object({
  title: z
    .string()
    .min(1, {message: "Title must have at least one character"})
    .max(30, {message: "Title can only have a max of 30 characters"}),
  content: z.string(),
  authorId: z.string(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
});

export default function CreatePost() {
  const {
    formState: {isLoading},
  } = useForm();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      authorId: "",
      tags: [],
      category: "",
      subCategory: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <Card className="mx-auto max-w-screen-xl">
      <CardHeader>
        <CardTitle className="text-2xl md:text-4xl">Create a post</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="text-xl md:text-3xl">Title</FormLabel>
                      <FormControl>
                        <Input className="md:text-2xl" placeholder="Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
          <Button className="w-full" type="submit">
            {isLoading ? <Loading /> : "Create post"}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
