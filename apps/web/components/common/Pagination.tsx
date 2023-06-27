"use client";
import Link from "next/link";
import React from "react";

interface Props {
  currenPage: number;
  totalProduct: number;
  parPage: number;
  path: string;
}

const Pagination: React.FC<Props> = ({
  currenPage,
  totalProduct,
  parPage,
  path,
}: Props) => {
  const totalPage = Math.ceil(totalProduct / parPage);
  const numOfPages = Array.from({ length: totalPage }, (_, i) => i + 1);

  const shortPagination = currenPage <= 1 ? 0 : currenPage - 2;
  const pagination = numOfPages.slice(shortPagination, shortPagination + 4);
  return (
    <nav className="flex justify-center my-4 text-sm md:text-base">
      <ul className="gap-3 flex bg-white border px-4  py-3 items-center  rounded-md">
        {currenPage >= 2 && (
          <li>
            <Link
              href={`${
                currenPage <= 1
                  ? `${path}page=${1}`
                  : `${path}page=${currenPage - 1}`
              }`}
              className=" text-origin-600 font-bold px-2"
            >
              Previous
            </Link>
          </li>
        )}

        {pagination.map((item) => {
          return (
            <li key={item}>
              <Link
                className={` ${
                  currenPage === item &&
                  "bg-origin-50 font-bold text-origin-600"
                }  rounded px-3 py-1 `}
                href={`${path}?page=${item}`}
              >
                {item}
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href={`${path}?page=${currenPage + 1}`}
            className="text-origin-600 font-bold px-2"
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
