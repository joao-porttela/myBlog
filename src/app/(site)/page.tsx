"use client";

import React from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
    <section className="w-full h-screen p-4 pt-36 relative flex flex-col items-center">
      <div className="h-80 flex flex-col justify-center">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <p className="text-center z-10">Blog your knowledge</p>

        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-5xl md:text-[100px] font-bold text-center">myBlog</h1>
        </div>
      </div>

      <Button className="z-10 text-xl" size="lg">
        <Link className="text-center" href="/my-posts">
          Start blogging now
        </Link>
      </Button>
    </section>
  );
}
