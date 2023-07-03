"use client";
import Loading from "@/components/admin/shared/Loading";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useGetAllMobilesQuery } from "@/redux/api/adminApiSlice";
import Image from "next/image";
import React from "react";

const NewMobile = () => {
  const { data, isLoading } = useGetAllMobilesQuery(
    `all?filter=UNAPPROVED&limit=6`
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>New </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col ">
        {data?.mobiles.map((item) => (
          <div
            key={item._id}
            className="flex gap-2 hover:bg-orange-50 p-2 cursor-pointer text-gray-500 hover:text-orange-600"
          >
            <Image src={item.img_url} alt="" width={40} height={50} />
            <div>
              <p>{item.brand}</p>
              <p>{item.model}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NewMobile;
