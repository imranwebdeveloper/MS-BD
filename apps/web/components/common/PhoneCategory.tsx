"use client";
import Link from "next/link";
import React from "react";

interface Props {
  slug: string;
}

const PhoneCategory: React.FC<Props> = ({ slug }) => {
  const categories = [
    {
      title: "Tablets",
      link: "tablets",
    },
    {
      title: "Smartphones",
      link: "smartphones",
    },
    {
      title: "Feature Phones",
      link: "feature-phones",
    },
  ];

  return (
    <div className="md:flex items-center md:gap-2 gap-1 mt-2 ">
      <p className="font-bold hidden md:flex">Category :</p>
      <ul className="flex gap-1 items-center  text-sm md:text-base">
        {categories.map((item, i) => {
          return (
            <li
              key={i}
              className={`px-2 md:px-4 py-1 border rounded-full  ${
                slug === item.link
                  ? "bg-primary-bg-dark text-primary-bg-light"
                  : "bg-primary-bg-light"
              }`}
            >
              <Link href={`/category/${item.link}`}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PhoneCategory;
