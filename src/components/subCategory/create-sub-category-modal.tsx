import React, {useState} from "react";

import {useRouter} from "next/navigation";

import CustomModal from "../global/custom-modal";

import {Input} from "../ui/input";
import {Button} from "../ui/button";

import {useModal} from "@/hooks/use-modal";
import {toast} from "@/hooks/use-toast";
import {createSubCategory} from "@/lib/sub-category-actions";

type CreateSubCategoryModalProps = {
  categoryId: string;
};

export default function CreateSubCategoryModal({
  categoryId,
}: CreateSubCategoryModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");

  const {dispatch} = useModal();

  function handleCancel() {
    dispatch({type: "close"});
  }

  async function handleCreate() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) throw new Error();

      if (!categoryId) throw new Error();

      const subCategory = await createSubCategory(name, user.id, categoryId);

      toast({
        title: "Success",
        description: "New Sub category created",
      });

      dispatch({type: "close"});

      router.push(`/my-posts/sub-category/${subCategory.id}`);
    } catch {
      toast({
        title: "Fail",
        description: "Could not create a new category",
        variant: "destructive",
      });
    }
  }

  return (
    <CustomModal
      title="Create category"
      subHeading="Insert a name for your category"
      defaultOpen={false}
    >
      <div className="md:w-96 w-80">
        <Input className="mb-4" value={name} onChange={(e) => setName(e.target.value)} />

        <div className="flex gap-4 justify-end">
          <Button onClick={handleCancel} variant="destructive" className="text-black">
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </div>
    </CustomModal>
  );
}
