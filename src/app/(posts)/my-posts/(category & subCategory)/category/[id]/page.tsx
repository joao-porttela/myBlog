"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useParams, useRouter} from "next/navigation";

// Components
import SubCategoryCard from "@/components/subCategory/sub-category-card";
import ReturnButton from "@/components/global/return-button";

// UI
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Card, CardHeader} from "@/components/ui/card";

// Icons
import {Plus, Filter, SearchIcon} from "lucide-react";

// Hooks
import {toast} from "@/hooks/use-toast";

// Lib Actions
import {getCategory} from "@/lib/category-actions";

// Interfaces
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {ICategory} from "@/interfaces/category.interface";
import MyPosts from "@/components/posts/my-posts";

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams<{id: string}>();

  const [category, setCategory] = useState<ICategory>({name: ""});

  const getData = async () => {
    try {
      const categoryId = params.id;

      if (!categoryId) router.push("/my-posts");

      // Fetch category
      const category = await getCategory(categoryId);

      setCategory(category);
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong while loading category data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="py-4 mx-4 md:mx-40">
      <ReturnButton />

      <section>
        <div className="h-full">
          <h1 className="text-xl md:text-3xl font-thin mb-4">
            {category.name}
            <Separator />
          </h1>
        </div>
      </section>

      <section className="my-8">
        <div className="flex items-center justify-between mb-4">
          <div className="h-full">
            <h2 className="text-xl md:text-3xl font-thin">My Subcategories</h2>
          </div>

          <div className="flex items-center justify-end gap-4">
            <Button variant="secondary" size="icon">
              <SearchIcon />
            </Button>

            <Button size="icon" variant="outline" className="flex items-center gap-2">
              <Filter size={20} />
            </Button>
          </div>
        </div>

        <ScrollArea className="whitespace-nowrap py-2">
          <div className="flex gap-4">
            <Card>
              <Link href="/sub-category/create">
                <CardHeader className="h-full flex items-center justify-center">
                  <Plus />
                </CardHeader>
              </Link>
            </Card>

            {category.subCategories && category.subCategories.length > 0 ? (
              category.subCategories.map((subCategory) => (
                <SubCategoryCard key={subCategory.id} subCategory={subCategory} />
              ))
            ) : (
              <p>No subcategories available.</p>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      <section>
        <MyPosts posts={category.posts} getData={getData} />
      </section>
    </div>
  );
}
