import React, {useEffect, useState} from "react";

import SubCategoryCard from "./sub-category-card";
import CreateSubCategoryModal from "./create-sub-category-modal";

import {Button} from "../ui/button";
import {Card, CardHeader} from "../ui/card";
import {ScrollArea, ScrollBar} from "../ui/scroll-area";
import {Filter, Plus, SearchIcon} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {toast} from "@/hooks/use-toast";
import {Separator} from "../ui/separator";

import {useModal} from "@/hooks/use-modal";
import {getCategory} from "@/lib/category-actions";

import {ICategory} from "@/interfaces/category.interface";

export default function MySubCategories() {
  const {setOpen} = useModal();
  const router = useRouter();
  const params = useParams<{id: string}>();

  const [category, setCategory] = useState<ICategory>({name: "", subCategories: []});

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
    getData();
  }, [params.id, router]);

  return (
    <>
      <section>
        <div className="h-full">
          <h1 className="text-xl md:text-3xl font-thin mb-4">
            {category ? category?.name : ""}
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
            <Card
              className="cursor-pointer"
              onClick={() => setOpen(<CreateSubCategoryModal categoryId={params.id} />)}
            >
              <CardHeader className="h-full flex items-center justify-center">
                <Plus />
              </CardHeader>
            </Card>

            {category && category.subCategories && category.subCategories.length > 0 ? (
              category.subCategories.map((subCategory) => (
                <SubCategoryCard
                  key={subCategory.id}
                  subCategory={subCategory}
                  getData={getData}
                />
              ))
            ) : (
              <p>No subcategories available.</p>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    </>
  );
}
