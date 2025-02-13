import React, {useState} from "react";
import {useRouter} from "next/navigation";

import CustomModal from "../global/custom-modal";

import {Input} from "../ui/input";
import {Button} from "../ui/button";

import {useModal} from "@/hooks/use-modal";
import {toast} from "@/hooks/use-toast";

import {createCategory} from "@/lib/category-actions";

export default function CreateCategoryModal() {
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

      const category = await createCategory(name, user.id);

      toast({
        title: "Success",
        description: "New category created",
      });

      dispatch({type: "close"});

      router.push(`/my-posts/category/${category.id}`);
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
