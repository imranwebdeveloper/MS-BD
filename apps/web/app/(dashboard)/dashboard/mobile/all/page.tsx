"use client";

import Loading from "@/components/admin/shared/Loading";
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
import Image from "next/image";
import React from "react";

const AllMobiles = () => {
  const { data, isLoading } = useGetAllMobilesQuery("all");

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Table className="bg-white text-muted-foreground">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Options</TableHead>
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
            <TableCell>Hello</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllMobiles;
