import React from "react";
import Image from "next/image";
import Pagination from "@/components/common/Pagination";
import MobileAction from "./MobileAction";
import { headers } from "@/lib/fetchHeader";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MetaData } from "@/lib/metaData";

export const metadata: Metadata = MetaData.Admin.Mobiles.All;

const getData = async (pageNumber: string) => {
  const res = await fetch(
    `${process.env["API_URL"]}/mobiles/latest?page=${pageNumber}` as string,
    {
      cache: "no-cache",
      headers,
    }
  );
  if (!res.ok) throw new Error(await res.json().then((data) => data.message));
  return res.json();
};

const AllMobilesList = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const { data } = await getData(searchParams.page);
  if (!data) {
    notFound();
  }
  const { count, mobiles, parPage } = data;
  const currenPage = parseInt(searchParams.page);
  return (
    <section className=" mx-auto max-w-4xl  ">
      <div className="overflow-x-auto p-6 rounded-md border border-gray-200 bg-primary-bg-light">
        <table className="w-full table-auto">
          <thead className="border-b  border-gray-200  text-left text-sm  font-semibold uppercase">
            <tr>
              <th className="p-2">
                <p>Product Name</p>
              </th>
              <th className="p-2 text-center">
                <p>Action</p>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 ">
            {mobiles.map((item: any) => {
              return (
                <tr key={item._id} className="border-b border-gray-100">
                  <td className=" p-2">
                    <div className="flex items-center gap-3  ">
                      <Image
                        src={item.img_url}
                        alt={item.model}
                        className="h-16 w-12"
                        width={100}
                        height={100}
                        priority
                      />
                      <div>
                        <p className="font-bold">{item.brand}</p>
                        <p>{item.model}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <MobileAction id={item._id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {mobiles.length > 0 && (
        <Pagination
          currenPage={currenPage ? currenPage : 1}
          totalProduct={count}
          parPage={parPage}
          path="dashboard/mobiles/all"
        />
      )}
    </section>
  );
};

export default AllMobilesList;
