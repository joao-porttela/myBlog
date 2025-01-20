import React, {useState} from "react";
import Link from "next/link";

import CustomModal from "../global/custom-modal";

// Shadcn UI Components
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {EllipsisVertical} from "lucide-react";

import {useModal} from "@/hooks/use-modal";

import {ISubCategory} from "@/interfaces/subCategory.interface";
import {deleteSubCategory} from "@/lib/sub-category-actions";
import {toast} from "@/hooks/use-toast";
import UpdateSubCategory from "./update-sub-category";
import Loading from "../ui/loading";

interface SubCategoryCardProps {
  subCategory: ISubCategory;
  getData: () => void;
}

export default function SubCategoryCard({subCategory, getData}: SubCategoryCardProps) {
  const {setOpen, dispatch} = useModal();
  const [isLoading, setIsLoading] = useState(false);

  function handleCancel() {
    dispatch({type: "close"});
  }

  async function handleDelete() {
    setIsLoading(true);

    await deleteSubCategory(subCategory.id);

    toast({title: "Category deleted", description: "Category deleted successfully"});

    getData();

    dispatch({type: "close"});

    setIsLoading(false);
  }

  return (
    <Card className="flex items-center hover:shadow-lg dark:hover:shadow-slate-800 transition-shadow duration-200">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-bold">
          <Button className="p-0" variant="link">
            <Link href={`/my-posts/sub-category/${subCategory.id}`}>
              {subCategory.name}
            </Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical className="mr-2" size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-2">
          <DropdownMenuItem
            onClick={() =>
              setOpen(<UpdateSubCategory subCategory={subCategory} getData={getData} />, {
                subCategory,
              })
            }
          >
            Rename
          </DropdownMenuItem>

          <DropdownMenuItem
            className="bg-destructive hover:bg-destructive"
            onClick={() =>
              setOpen(
                <CustomModal
                  title="Delete category"
                  subHeading="Are you sure you want to delete the post? This action is irreversible"
                  defaultOpen={false}
                >
                  <div className="flex gap-4 justify-end">
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button
                      variant="destructive"
                      className="text-black"
                      onClick={handleDelete}
                      disabled={isLoading}
                    >
                      {isLoading ? <Loading /> : "Delete"}
                    </Button>
                  </div>
                </CustomModal>
              )
            }
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
}
