import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

import CategoriesControlPanel from "./categories-control-panel";
import CategoryCard from "./category-card";

import {toast} from "@/hooks/use-toast";

import {getAuthorCategories} from "@/lib/category-actions";

import {ICategory} from "@/interfaces/category.interface";

import {ScrollArea, ScrollBar} from "../ui/scroll-area";
import {Card, CardHeader} from "../ui/card";
import {Plus} from "lucide-react";
import {useModal} from "@/hooks/use-modal";
import CreateCategoryModal from "./create-category-modal";

export default function MyCategories() {
  const {setOpen} = useModal();
  const router = useRouter();

  const [categories, setCategories] = useState<ICategory[]>([]);

  const getCategories = async () => {
    try {
      const author = JSON.parse(localStorage.getItem("user")!);

      if (!author) return router.push("/auth/login");

      // Fetch categories
      const categoriesResult = await getAuthorCategories(author.id);

      setCategories(categoriesResult.message);
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong loading the categories",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const author = JSON.parse(localStorage.getItem("user")!);

        if (!author) return router.push("/auth/login");

        // Fetch categories
        const categoriesResult = await getAuthorCategories(author.id);

        setCategories(categoriesResult.message);
      } catch {
        toast({
          title: "Error",
          description: "Something went wrong loading the categories",
          variant: "destructive",
        });
      }
    };

    getCategories();
  }, [router]);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="h-full">
          <h2 className="text-xl md:text-3xl font-thin mb-4">My Categories</h2>
        </div>

        <div className="flex items-center justify-end gap-4">
          <CategoriesControlPanel />
        </div>
      </div>

      <ScrollArea className="whitespace-nowrap mt-4 py-2">
        <div className="flex gap-4">
          <Card
            className="cursor-pointer"
            onClick={() => setOpen(<CreateCategoryModal />)}
          >
            <CardHeader className="h-full flex items-center justify-center">
              <Plus />
            </CardHeader>
          </Card>

          {categories.length > 0 ? (
            categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                getData={getCategories}
              />
            ))
          ) : (
            <p>No categories available.</p>
          )}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}
