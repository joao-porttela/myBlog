import React, {useState} from "react";
import CustomModal from "../global/custom-modal";
import {ICategory} from "@/interfaces/category.interface";
import {useRouter} from "next/navigation";
import {updateCategory} from "@/lib/category-actions";
import {useModal} from "@/hooks/use-modal";
import {toast} from "@/hooks/use-toast";
import {Input} from "../ui/input";
import {Button} from "../ui/button";

type UpdateCategoryProps = {
  category: ICategory;
  getData: () => void;
};

export default function UpdateCategory({category, getData}: UpdateCategoryProps) {
  const {state, dispatch} = useModal();
  const [name, setName] = useState<string>(state.data.name);

  const router = useRouter();

  function handleCancel() {
    dispatch({type: "close"});
  }

  async function handleUpdate() {
    await updateCategory(category?.id, {name: name});

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
      title="Update category"
      subHeading="Type in to update the category"
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
