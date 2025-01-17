"use client";

import React, {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

// UI Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {CardHeader, CardTitle} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {Badge} from "@/components/ui/badge";
import {Switch} from "@/components/ui/switch";
import Loading from "@/components/ui/loading";

// Icons
import {ChevronLeftIcon, Plus, X} from "lucide-react";

// Hooks
import {toast} from "@/hooks/use-toast";
import {createPost} from "@/lib/post-actions";

// lib
import {getAuthorCategories, getCategory} from "@/lib/category-actions";
import {getAuthorSubCathegories, getSubCategory} from "@/lib/sub-category-actions";

// Interfaces
import {ICategory} from "@/interfaces/category.interface";
import {ISubCategory} from "@/interfaces/subCategory.interface";

// Validation Schema
const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title must have at least one character")
    .max(30, "Title can only have a max of 30 characters"),
  content: z.string().optional(),
  published: z.boolean(),
});

export default function CreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const params = useSearchParams();
  const paramsCatId = params.get("categoryId");
  const paramsSubCatId = params.get("subCategoryId");

  const router = useRouter();

  const [categories, setCategories] = useState<[ICategory] | []>([]);
  const [category, setCategory] = useState<ICategory>({id: "", name: ""});

  const [subCategories, setSubCategories] = useState<[ISubCategory] | []>([]);
  const [subCategory, setSubCategory] = useState<ISubCategory>({id: "", name: ""});

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  async function loadSubCategories() {
    if (category.id != "") {
      const user = JSON.parse(localStorage.getItem("user"));

      const result = await getAuthorSubCathegories(user?.id, category?.id);
      const subCtgs = result.message ? result.message : [];

      setSubCategories(subCtgs);

      return;
    } else {
      setSubCategories([]);
      return;
    }
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchCategories = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) return;

        const result = await getAuthorCategories(user?.id);

        const ctgs = result.message ? result.message : [];

        setCategories(ctgs);
      } catch {
        toast({
          title: "Error",
          description: "Failed to fetch the categories.",
          variant: "destructive",
        });
      }
    };

    fetchCategories();

    const setParams = async () => {
      if (paramsCatId) {
        const category = await getCategory(paramsCatId);

        if (!category) return;

        setCategory(category);

        const user = JSON.parse(localStorage.getItem("user"));

        const result = await getAuthorSubCathegories(user?.id, category?.id);
        const subCtgs = result.message ? result.message : [];

        setSubCategories(subCtgs);

        if (paramsSubCatId) {
          const subCategory = await getSubCategory(paramsSubCatId);

          if (!subCategory) return;

          setSubCategory(subCategory);
        }
      }
    };

    setParams();
    setIsLoading(false);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      published: false,
    },
  });

  const {
    handleSubmit,
    control,
    formState: {isSubmitting},
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?.id) throw new Error("Something went wrong.");

      // Handle form submission logic
      const body = {
        authorId: user.id,
        category: category,
        subCategory: subCategory,
        ...values,
        tags,
      };

      await createPost(body);

      toast({title: "Post Created!", description: "Your post was successfully created."});

      const url = `/my-posts${paramsSubCatId ? `/sub-category/${subCategory.id}` : ""}${
        !paramsSubCatId && paramsCatId ? `/category/${category.id}` : ""
      }`;

      router.push(url);
    } catch {
      toast({
        title: "Error",
        description: "Failed to create the post.",
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

  return (
    <div className="md:mx-40 px-4 mb-10 space-y-6">
      <Button size="sm" onClick={() => router.back()}>
        <ChevronLeftIcon />
      </Button>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <CardHeader className="p-0 flex flex-row justify-between items-center">
            <CardTitle className="text-2xl md:text-4xl">Create a Post</CardTitle>
            <FormField
              control={control}
              name="published"
              render={({field}) => (
                <FormItem className="flex items-center gap-4">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          </CardHeader>

          {/* Category Selection */}
          <FormItem>
            <FormLabel>
              <h2 className="md:text-lg">Category</h2>
            </FormLabel>
            {categories.length === 0 && (
              <p>
                You don&apos;t have any categories. Just type in to create one when you
                submit your post.
              </p>
            )}
            <div className="flex gap-4">
              <Input
                className="flex-1"
                value={category.name}
                onChange={(e) => {
                  setCategory({id: "", name: e.target.value});
                }}
                onBlur={async () => {
                  if (categories.length > 0) {
                    const filteredCtg = categories.filter(
                      (ctg: ICategory) => ctg.name === category.name
                    )[0];

                    if (filteredCtg)
                      setCategory({id: filteredCtg.id, name: category.name});
                  }

                  await loadSubCategories();
                }}
              />

              <select
                onChange={async (e) => {
                  const id = e.target[e.target.selectedIndex].getAttribute("data-id");
                  setCategory({id: id ? id : "", name: e.target.value});
                }}
                onBlur={async () => {
                  await loadSubCategories();
                }}
                className="flex-1 overflow-hidden text-center bg-primary text-white rounded-md"
              >
                <option value="" className="rounded-md">
                  Choose
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name} data-id={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </FormItem>

          {/* Subcategory Selection */}
          <FormItem>
            <FormLabel>
              <h2 className="md:text-lg">Subcategory</h2>
            </FormLabel>
            {category.name.length > 0 && subCategories.length === 0 && !isLoading && (
              <p>
                You don&apos;t have any sub categories. Just type in to create one when
                you submit your post.
              </p>
            )}
            <div className="flex gap-4">
              <Input
                className="flex-1"
                disabled={category.name === ""}
                value={subCategory.name}
                onChange={(e) => {
                  setSubCategory({id: "", name: e.target.value});
                }}
                onBlur={async () => {
                  if (categories.length > 0) {
                    const filteredCtg = subCategories.filter(
                      (ctg: ISubCategory) => ctg.name === category.name
                    )[0];

                    if (filteredCtg)
                      setSubCategory({id: filteredCtg.id, name: category.name});
                  }
                }}
              />

              <select
                disabled={category.name === ""}
                onChange={(e) => {
                  const id = e.target[e.target.selectedIndex].getAttribute("data-id");

                  setSubCategory({id, name: e.target.value});
                }}
                className="flex-1 overflow-hidden text-center bg-primary text-white rounded-md"
              >
                <option value="" className="rounded-md">
                  Choose
                </option>
                {subCategories.length > 0 &&
                  subCategories.map((subCtg: ISubCategory) => (
                    <option
                      className="rounded-md"
                      key={subCtg.id}
                      value={subCtg.name}
                      data-id={subCtg.id}
                    >
                      {subCtg.name}
                    </option>
                  ))}
              </select>
            </div>
          </FormItem>

          {/* Title */}
          <FormField
            control={control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                  <h2 className="md:text-lg">Title</h2>
                </FormLabel>
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
                <FormLabel>
                  <h2 className="md:text-lg">Content</h2>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-96"
                    placeholder="Write your post content here..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags */}
          <div>
            <FormLabel>
              <h2 className="md:text-lg mb-2">Tags</h2>
            </FormLabel>
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
            <div className="flex flex-wrap gap-2 mt-4 h-full">
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <Badge key={tag} className="flex items-center gap-2">
                    {tag}
                    <X onClick={() => removeTag(tag)} className="cursor-pointer" />
                  </Badge>
                ))
              ) : (
                <p className="text-gray-500">No tags added yet.</p>
              )}
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? <Loading /> : "Create Post"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
