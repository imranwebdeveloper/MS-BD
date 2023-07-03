import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "rc-pagination";
import React from "react";

interface Props {
  total?: number;
  pageSize?: number | 12;
  path: string;
  currentPage: any;
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
  return (
    <Pagination
      className="flex gap-2 bg-white justify-center p-4 rounded md:text-base "
      total={total}
      pageSize={pageSize}
      nextIcon={<ChevronRight />}
      prevIcon={<ChevronLeft />}
      onChange={onchangeHandler}
      defaultCurrent={currentPage}
    />
  );
};

export default MyPagination;
