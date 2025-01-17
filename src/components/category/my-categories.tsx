import React from "react";
import Link from "next/link";

import {Card, CardHeader} from "../ui/card";
import {Plus} from "lucide-react";
import {ICategory} from "@/interfaces/category.interface";
import CategoryCard from "./category-card";
import CategoriesControlPanel from "./categories-control-panel";
import {ScrollArea, ScrollBar} from "../ui/scroll-area";

type MyCategoriesProps = {
  categories: ICategory[];
};

export default function MyCategories({categories}: MyCategoriesProps) {
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
          <Card>
            <Link href="/sub-category/create">
              <CardHeader className="h-full flex items-center justify-center">
                <Plus />
              </CardHeader>
            </Link>
          </Card>

          {categories.length > 0 ? (
            categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
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
