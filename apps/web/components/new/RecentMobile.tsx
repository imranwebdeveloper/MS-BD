"use client";
import Loading from "@/components/admin/shared/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { useGetAllMobilesQuery } from "@/redux/api/adminApi";

import { ChevronRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

const RecentMobile = ({ status, title }: { status: string; title: string }) => {
  const { isLoading, data, isError } = useGetAllMobilesQuery(
    `status=${status}&limit=6`
  );

  if (isLoading) {
    return <Loading />;
  } else if (data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title} </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 ">
          <ul>
            {data.mobiles.map((item) => (
              <Link
                key={item._id}
                href={`/dashboard/mobile/${item.brand.toLowerCase()}/${
                  item._id
                }`}
              >
                <li className="flex group/item justify-between items-center rounded-md  hover:bg-slate-100 p-2 cursor-pointer text-gray-500 ">
                  <div className="flex gap-2">
                    <Image src={item.img_url} alt="" width={40} height={50} />
                    <div>
                      <p className="font-bold">{item.brand}</p>
                      <p>{item.model}</p>
                    </div>
                  </div>
                  <div className="group/edit invisible group-hover/item:visible">
                    <Button variant="ghost">
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }
};

export default RecentMobile;
