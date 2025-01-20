import React, {useState} from "react";
import {useRouter} from "next/navigation";

import CustomModal from "../global/custom-modal";
import {Input} from "../ui/input";
import {Button} from "../ui/button";

import {useModal} from "@/hooks/use-modal";
import {toast} from "@/hooks/use-toast";

import {updateSubCategory} from "@/lib/sub-category-actions";

import {ISubCategory} from "@/interfaces/subCategory.interface";
type UpdateSubCategoryProps = {
  subCategory: ISubCategory;
  getData: () => void;
};

export default function UpdateSubCategory({
  subCategory,
  getData,
}: UpdateSubCategoryProps) {
  const {state, dispatch} = useModal();
  const [name, setName] = useState<string>(state.data.name);

  const router = useRouter();

  function handleCancel() {
    dispatch({type: "close"});
  }

  async function handleUpdate() {
    await updateSubCategory(subCategory?.id, {name: name});

    toast({title: "Category update", description: "Post updated successfully"});

    dispatch({type: "close"});

    if (getData) {
      getData();
    } else {
      router.back();
    }
  }

  return (
    <CustomModal
      title="Update Sub Category"
      subHeading="Type in to update the sub category"
      defaultOpen={false}
    >
      <div className="md:w-96 w-80">
        <Input className="mb-4" value={name} onChange={(e) => setName(e.target.value)} />

        <div className="flex gap-4 justify-end">
          <Button onClick={handleCancel} variant="destructive" className="text-black">
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      </div>
    </CustomModal>
  );
}
