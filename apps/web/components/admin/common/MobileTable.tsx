"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import React from "react";
import { PhoneShortInfo, PhoneShortRes } from "types";
import Loading from "../shared/Loading";
import { useGetMobilesByStatusQuery } from "@/redux/api/adminApiSlice";

interface Props {
  //   mobiles: PhoneShortInfo[];
  path: string;
}

const MobileTable: React.FC<Props> = ({ path }) => {
  const { data, isLoading, isError } = useGetMobilesByStatusQuery(path);

  if (isLoading) {
    return <Loading />;
  }
  const { count, mobiles, perPage } = data as PhoneShortRes;
  const currenPage = parseInt("2");
  return (
    <Table>
      <TableHeader>
        <TableRow className="font-bold">
          <TableHead>Product</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mobiles.map(({ _id, brand, model, status, img_url, title }) => (
          <TableRow key={_id}>
            <TableCell className="flex gap-3  ">
              <div className="w-12 h-16">
                <Image src={img_url} alt={title} width={100} height={120} />
              </div>
              <div>
                <p>{brand}</p>
                <p>{model}</p>
              </div>
            </TableCell>
            <TableCell>{status}</TableCell>
            <TableCell className="text-right">{model}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MobileTable;
