"use client";

import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

// UI Components
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {Textarea} from "../ui/textarea";
import {Badge} from "../ui/badge";
import {Toggle} from "../ui/toggle";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

// Icons
import {Check, ChevronsUpDown, Plus, ToggleLeft, ToggleRight, X} from "lucide-react";

// Hooks
import {toast} from "@/hooks/use-toast";
import {createPost} from "@/lib/actions";
import {useAuth} from "@/hooks/use-auth";

// lib
import {cn} from "@/lib/utils";

// Validation Schema
const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title must have at least one character")
    .max(30, "Title can only have a max of 30 characters"),
  content: z.string().optional(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
});

export default function CreatePost() {
  const {user} = useAuth();
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [hasCategory, setHasCategory] = useState(false);
  const [isPublishOn, setIsPublishOn] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      subCategory: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: {isSubmitting},
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!user?.id) throw new Error("Something went wrong.");

      // Handle form submission logic
      const body = {
        authorId: user.id,
        published: isPublishOn,
        ...values,
        tags,
      };

      await createPost(body);

      toast({title: "Post Created!", description: "Your post was successfully created."});
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message ? error.message : "Failed to create the post.",
        variant: "destructive",
      });
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const languages = [
    {label: "English", value: "en"},
    {label: "French", value: "fr"},
    {label: "German", value: "de"},
    {label: "Spanish", value: "es"},
    {label: "Portuguese", value: "pt"},
    {label: "Russian", value: "ru"},
    {label: "Japanese", value: "ja"},
    {label: "Korean", value: "ko"},
    {label: "Chinese", value: "zh"},
  ] as const;

  return (
    <Card className="mx-auto max-w-screen-xl">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl md:text-4xl">Create a Post</CardTitle>
        <div className="flex items-center gap-4">
          <p className="text-xl">Publish</p>
          <Toggle pressed={isPublishOn} onPressedChange={setIsPublishOn}>
            {isPublishOn ? <ToggleRight /> : <ToggleLeft />}
          </Toggle>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Category and Subcategory */}
            <div className="flex flex-col md:flex-row gap-6">
              <FormField
                control={control}
                name="category"
                render={({field}) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? languages.find(
                                    (language) => language.value === field.value
                                  )?.label
                                : "Select language"}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search framework..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                {languages.map((language) => (
                                  <CommandItem
                                    value={language.label}
                                    key={language.value}
                                    onSelect={() => {
                                      form.setValue("language", language.value);
                                    }}
                                  >
                                    {language.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        language.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="subCategory"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Subcategory</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={subCategory}
                        disabled={!hasCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Title */}
            <FormField
              control={control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter post title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={control}
              name="content"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Write your post content here..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <div>
              <FormLabel>Tags</FormLabel>
              <div className="flex items-center gap-4">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                />
                <Button type="button" onClick={addTag}>
                  <Plus />
                </Button>
              </div>
              <div className="flex gap-2 mt-4">
                {tags.map((tag) => (
                  <Badge key={tag} className="flex items-center gap-2">
                    {tag}
                    <X onClick={() => removeTag(tag)} className="cursor-pointer" />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Creating Post..." : "Create Post"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

import type {GetServerSideProps} from "next";

type Repo = {
  id: string;
  name: string;
};

export const getServerSideProps = (async () => {
  const userLc = localStorage.getItem("user")!;
  const user = JSON.parse(userLc);

  console.log(user);
  // Fetch data from external API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/category/get-all-by-user-id`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user.id),
    }
  );
  const repo: Repo = await res.json();
  // Pass data to the page via props
  return {props: {repo}};
}) satisfies GetServerSideProps<{repo: Repo}>;
