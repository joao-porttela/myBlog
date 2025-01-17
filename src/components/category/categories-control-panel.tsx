import React from "react";
import {Button} from "../ui/button";

import {Filter, SearchIcon} from "lucide-react";

export default function CategoriesControlPanel() {
  return (
    <>
      <Button variant="secondary" size="icon">
        <SearchIcon />
      </Button>

      <Button size="icon" variant="outline" className="flex items-center gap-2">
        <Filter size={20} />
      </Button>
    </>
  );
}
