"use client";
import Loading from "@/components/admin/shared/Loading";
import MyPagination from "@/components/new/Pagination";
import { useGetAllMobilesQuery } from "@/redux/api/adminApi";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const BrandPage = () => {
  const { brand } = useParams();
  const query = useSearchParams();
  const pageNumber = query.get("page") || "1";

  const { isError, isLoading, data } = useGetAllMobilesQuery(
    `brand=${brand}&limit=20&page=${pageNumber}`
  );
  if (isLoading) {
    return <Loading />;
  } else if (data) {
    console.log(data);
    return (
      <>
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 rounded gap-2  mt-6  ">
          {data.mobiles.length <= 0 && (
            <h1 className="text-2xl">No Data Found</h1>
          )}
          {data.mobiles.map((item) => {
            return (
              <article
                key={item._id}
                className="transition cursor-pointer hover:scale-105  flex flex-col border rounded-md bg-white p-4"
              >
                <header className="flex justify-center">
                  <Image
                    src={item.img_url}
                    width={80}
                    height={100}
                    priority
                    alt={`${item.brand} ${item.model} mobile`}
                  />
                </header>

                <main className="text-sm text-center mt-1">
                  <p className="font-bold md:text-base ">{item.brand}</p>
                  <p>{item.model}</p>
                </main>
                <footer className="flex justify-center mt-1">
                  <Link
                    href={`/dashboard/mobile/${item.brand.toLowerCase()}/${
                      item._id
                    }`}
                    className="text-blue-500"
                  >
                    Edit details
                  </Link>
                </footer>
              </article>
            );
          })}
        </section>

        <div className="mt-4 border">
          <MyPagination
            total={data.count}
            pageSize={data.limit}
            path={`/dashboard/mobile/${brand}?limit=20&page=`}
            currentPage={pageNumber}
          />
        </div>
      </>
    );
  } else if (isError) {
    return <div>Error</div>;
  }
};

export default BrandPage;
