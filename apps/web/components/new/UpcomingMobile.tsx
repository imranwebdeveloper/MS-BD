"use client";
import Loading from "@/components/admin/shared/Loading";
import UpdatePriceDialog from "@/components/new/UpdatePriceDialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useGetAllMobilesQuery } from "@/redux/api/adminApiSlice";

import { ChevronRight } from "lucide-react";

import Image from "next/image";
import React, { useState } from "react";
import { PhoneShortInfo } from "types";

const UpcomingMobile = () => {
  const { data, isLoading } = useGetAllMobilesQuery(
    `all?filter=UPCOMING&limit=6`
  );
  const [showPrice, setPrice] = useState<PhoneShortInfo>();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Up Coming </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 ">
        <Dialog>
          <ul>
            {data?.mobiles.map((item) => (
              <li
                key={item._id}
                className="flex group/item justify-between items-center rounded-md  hover:bg-slate-100 p-2 cursor-pointer text-gray-500 "
              >
                <div className="flex gap-2">
                  <Image src={item.img_url} alt="" width={40} height={50} />
                  <div>
                    <p className="font-bold">{item.brand}</p>
                    <p>{item.model}</p>
                  </div>
                </div>
                <DialogTrigger
                  asChild
                  className="group/edit invisible group-hover/item:visible"
                >
                  <Button variant="ghost" onClick={() => setPrice(item)}>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
              </li>
            ))}
          </ul>

          <DialogContent className="min-w-[700px]">
            <div className="mt-4">
              {showPrice && <UpdatePriceDialog mobile={showPrice} />}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UpcomingMobile;
