"use client";

import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "rc-pagination";
import React from "react";

interface Props {
  total?: number;
  pageSize?: number | 12;
  path: string;
  currentPage: string;
}

const MyPagination: React.FC<Props> = ({
  total,
  pageSize,
  path,
  currentPage,
}) => {
  const router = useRouter();

  const onchangeHandler = (page: number) => {
    router.push(`${path}${page}`);
  };

  const activePage = currentPage ? currentPage : "1";
  return (
    <Pagination
      className="flex gap-2 justify-center p-4 rounded md:text-base "
      total={total}
      pageSize={pageSize}
      nextIcon={<ChevronRight />}
      prevIcon={<ChevronLeft />}
      onChange={onchangeHandler}
      defaultCurrent={Number(activePage)}
    />
  );
};

export default MyPagination;
