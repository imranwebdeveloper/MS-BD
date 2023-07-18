"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
interface Props {
  slug: string;
}

const SubHeader: React.FC<Props> = ({ slug }) => {
  const brands = [
    "Apple",
    "Samsung",
    "Google",
    "OnePlus",
    "Huawei",
    "Sony",
    "LG",
    "Motorola",
    "Nokia",
    "Realme",
    "Oppo",
    "Vivo",
    "Xiaomi",
    "Asus",
  ];

  return (
    <ul className="flex md:justify-around whitespace-nowrap divide-x rounded bg-white  overflow-x-scroll scrollbar-hide ">
      {brands.map((item: string, index: number) => {
        return (
          <li
            key={index}
            className={`list-none py-1  w-full  px-2 md:px-4  ${
              slug === item.toLowerCase()
                ? "bg-orange-100 font-semibold text-orange-600"
                : ""
            }`}
          >
            <Link
              href={`/mobile/${item.toLowerCase()}`}
              className="text-center text-sm md:text-base"
            >
              {item}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SubHeader;
