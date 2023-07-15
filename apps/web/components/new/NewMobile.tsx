"use client";
import Loading from "@/components/admin/shared/Loading";
import PhoneContent from "@/components/common/PhoneContent";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useApprovedMobileMutation,
  useDeleteMobileMutation,
  useGetAllMobilesQuery,
  useLazyGetMobileByIdQuery,
} from "@/redux/api/adminApiSlice";
import { capitalizeFirstWord } from "@/utils/toTitleCase";

import { ChevronRight } from "lucide-react";

import Image from "next/image";
import React, { useState } from "react";

const NewMobile = () => {
  const { data, isLoading, refetch } = useGetAllMobilesQuery(
    `all?filter=UNAPPROVED&limit=6`
  );
  const [actionSuccess, setActionSuccess] = useState(false);
  const [getMobileById, mobileState] = useLazyGetMobileByIdQuery();

  const [deleteMobile, deleteMobileState] = useDeleteMobileMutation();

  const [approvedMobile, approveMobileState] = useApprovedMobileMutation();

  const onSeeDetailsHandler = (id: string) => {
    setActionSuccess(false);
    getMobileById(id);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>New </CardTitle>
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
                  <Button
                    variant="ghost"
                    onClick={() => onSeeDetailsHandler(item._id)}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
              </li>
            ))}
          </ul>

          <DialogContent className="min-w-[700px]">
            {mobileState.isLoading ? (
              <Loading />
            ) : (
              <>
                {actionSuccess ? (
                  <div className="bg-white p-6  md:mx-auto">
                    <svg
                      viewBox="0 0 24 24"
                      className={`${
                        deleteMobileState.isSuccess
                          ? "text-red-600"
                          : "text-green-600"
                      }  w-16 h-16 mx-auto my-6`}
                    >
                      <path
                        fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                      ></path>
                    </svg>
                    <div className="text-center">
                      <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        {deleteMobileState.isSuccess
                          ? "Mobile has been deleted"
                          : "Approved for upcoming phone"}
                      </h3>
                    </div>
                  </div>
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-center">{`${mobileState.data?.brand} ${mobileState.data?.model}`}</DialogTitle>
                    </DialogHeader>
                    <article className=" overflow-scroll scrollbar-hide max-h-[500px] mx-auto mt-2">
                      {mobileState.data &&
                        Object.keys(mobileState.data?.content).map(
                          (section) => (
                            <PhoneContent
                              key={section}
                              content={mobileState.data?.content[section]}
                              title={capitalizeFirstWord(
                                section.split("_").join(" ")
                              )}
                            />
                          )
                        )}
                    </article>
                    <DialogFooter>
                      <Button
                        variant="destructive"
                        onClick={async () => {
                          await deleteMobile(mobileState.data?._id);
                          refetch();
                          setActionSuccess(true);
                        }}
                        disabled={deleteMobileState.isLoading}
                      >
                        {deleteMobileState.isLoading ? "Please wait" : "Delete"}
                      </Button>
                      <Button
                        onClick={async () => {
                          await approvedMobile(mobileState.data?._id);
                          refetch();
                          setActionSuccess(true);
                        }}
                        disabled={approveMobileState.isLoading}
                      >
                        {approveMobileState.isLoading
                          ? "Please wait"
                          : "Approve"}
                      </Button>
                    </DialogFooter>
                  </>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default NewMobile;
