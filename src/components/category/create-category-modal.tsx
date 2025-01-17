import React from "react";
import {Card, CardHeader} from "../ui/card";
import Link from "next/link";
import {Plus} from "lucide-react";
import CustomModal from "../global/custom-modal";

export default function CreateCategoryModal() {
  return (
    <CustomModal
      title="Create category"
      subHeading="Insert a name for your category"
      defaultOpen={false}
    ></CustomModal>
  );
}
