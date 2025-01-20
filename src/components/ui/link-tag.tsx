import React from "react";
import Link from "next/link";

import {slug} from "github-slugger";
import {badgeVariants} from "./badge";
import {ITag} from "@/interfaces/tag.interface";

interface TagProps {
  tag: ITag;
  current?: boolean;
}

export default function LinkTag({tag, current}: TagProps) {
  return (
    <Link
      className={badgeVariants({
        variant: current ? "default" : "secondary",
        className: "no-underline",
      })}
      href={`/tags/${slug(tag.slug)}`}
    >
      {tag.name}
    </Link>
  );
}
