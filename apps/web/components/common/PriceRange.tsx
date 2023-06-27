"use client";
import Link from "next/link";
import React from "react";
interface Props {
  slug: string;
}

const PriceRange: React.FC<Props> = ({ slug }) => {
  const ranges = [
    {
      title: "1 - 5000",
      link: "1-5000",
    },
    {
      title: "5001 - 10000",
      link: "5001-10000",
    },
    {
      title: "10001 - 20000",
      link: "10001-20000",
    },
    {
      title: "20001 - 30000",
      link: "20001-30000",
    },
    {
      title: "30001 - 50000",
      link: "30001-50000",
    },
    {
      title: "50001+",
      link: "50001",
    },
  ];

  return (
    <div className="md:flex items-center md:gap-2 gap-1 mt-2">
      <p className="font-bold hidden md:flex">Price Range :</p>
      <ul className="flex justify-start whitespace-nowrap gap-1  text-sm md:text-base divide-x rounded  overflow-x-scroll scrollbar-hide ">
        {ranges.map((item, i) => {
          return (
            <li
              key={i}
              className={`px-2 md:px-4 py-1 border rounded-full  ${
                slug === item.link
                  ? " bg-primary-bg-dark text-primary-text-dark"
                  : "bg-white"
              } `}
            >
              <Link href={`/price-range/${item.link}`}>Tk {item.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PriceRange;
