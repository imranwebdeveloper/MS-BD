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
import Image from "next/image";
import MyPagination from "@/components/new/Pagination";
import { useSearchParams } from "next/navigation";
const AllMobiles = () => {
  const params = useSearchParams();
  const page = params.get("page");

  const { data, isLoading } = useGetAllMobilesQuery(
    `all?page=${page ? page : 1}`
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Table className="bg-white text-muted-foreground">
      <TableCaption>
        <MyPagination
          total={data?.count}
          pageSize={data?.perPage}
          path="/dashboard/mobile/all?page="
          currentPage={page ? page : 1}
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
                <Image src={item.img_url} alt="" width={40} height={50} />
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
