import React from "react";
import Link from "next/link";

import {slug} from "github-slugger";
import {badgeVariants} from "./badge";

interface TagProps {
  tag: string;
  current?: boolean;
  count?: number;
}

export default function tag({tag, current, count}: TagProps) {
  return (
    <Link
      className={badgeVariants({
        variant: current ? "default" : "secondary",
        className: "no-underline",
      })}
      href={`/tags/${slug(tag)}`}
    >
      {tag}
    </Link>
  );
}
