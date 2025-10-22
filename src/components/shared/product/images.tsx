"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = React.useState(0);
  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="product"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center"
      />
      <div className="flex">
        {images.map((image, idx) => (
          <div
            key={image}
            className={cn(
              "cursor-pointer rounded-sm border mr-2 hover:border-orange-600",
              current === idx ? "border-orange-500" : ""
            )}
            onClick={() => setCurrent(idx)}
          >
            <Image
              src={image}
              alt="thumb"
              width={100}
              height={100}
              className="rounded-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
