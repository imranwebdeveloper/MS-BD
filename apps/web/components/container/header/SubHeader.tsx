"use client";
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
            className={`list-none py-1 px-2  md:px-3 ${
              slug === item.toLowerCase()
                ? "bg-primary-text-light text-secondary-bg-light"
                : ""
            }`}
          >
            <Link
              href={`mobile/${item.toLowerCase()}`}
              className="text-center "
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
