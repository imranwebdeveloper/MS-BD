"use client";

import Loading from "@/components/admin/shared/Loading";
import MobileAction from "@/components/new/MobileAction";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllMobilesQuery } from "@/redux/api/adminApiSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Pagination from "rc-pagination";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
const AllMobiles = () => {
  const [path, setPath] = useState("all");
  const routPath = usePathname();

  const { data, isLoading } = useGetAllMobilesQuery(path);

  if (isLoading) {
    return <Loading />;
  }

  const onchangeHandler = (page: number) => {
    setPath(`all?page=${page}`);
  };
  return (
    <Table className="bg-white text-muted-foreground">
      <TableCaption>
        <Pagination
          className="flex gap-2 bg-white justify-center p-4 rounded md:text-base "
          total={data?.count}
          pageSize={data?.perPage}
          nextIcon={<ChevronRight />}
          prevIcon={<ChevronLeft />}
          onChange={onchangeHandler}
        />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.mobiles.map((item) => (
          <TableRow key={item._id}>
            <TableCell className="font-medium">
              <div className="flex gap-2">
                <Image src={item.img_url} alt="" width={60} height={70} />
                <div>
                  <p>{item.brand}</p>
                  <p>{item.model}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>
              <MobileAction status={item.status} data={item} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllMobiles;
