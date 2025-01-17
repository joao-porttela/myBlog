"use client";

import React, {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";

// Components
import MyPosts from "@/components/posts/my-posts";
import ReturnButton from "@/components/global/return-button";

// Hooks
import {toast} from "@/hooks/use-toast";

// Lib Actions
import {getSubCategory} from "@/lib/sub-category-actions";

// Interfaces
import {ISubCategory} from "@/interfaces/subCategory.interface";
import {Separator} from "@/components/ui/separator";

export default function SubCategoryPage() {
  const router = useRouter();
  const params = useParams<{id: string}>();

  const [subCategory, setSubCategory] = useState<ISubCategory>({});

  const getData = async () => {
    try {
      const subCategoryId = params.id;

      if (!subCategoryId) {
        router.push("/my-posts");
        return;
      }

      // Fetch subcategory data
      const subCategory = await getSubCategory(subCategoryId);
      setSubCategory(subCategory);
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong while loading subcategory data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="py-4 mx-4 md:mx-40">
      <ReturnButton categoryId={subCategory.categoryId} />

      <section>
        <div className="h-full">
          <h1 className="text-xl md:text-3xl font-thin mb-4">
            {subCategory.name}
            <Separator />
          </h1>
        </div>
      </section>

      <section>
        <MyPosts posts={subCategory.posts} getData={getData} />
      </section>
    </div>
  );
}
