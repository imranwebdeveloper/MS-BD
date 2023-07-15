"use client";
import Loading from "@/components/admin/shared/Loading";
import { useGetAllMobilesQuery } from "@/redux/api/adminApi";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const BrandPage = () => {
  const params = useParams();
  const { isError, isLoading, data } = useGetAllMobilesQuery(
    `brand=${params.brand}&limit=20`
  );

  if (isLoading) {
    return <Loading />;
  } else if (data) {
    return (
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 rounded gap-2  mt-6  ">
        {data.mobiles.length <= 0 && (
          <h1 className="text-2xl">No Data Found</h1>
        )}
        {data.mobiles.map((item) => {
          return (
            <Link
              key={item._id}
              href={`mobile/${item.brand.toLowerCase()}/${item.model_id}`}
            >
              <article className="transition cursor-pointer hover:scale-105  flex flex-col border rounded-md bg-white p-4">
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
                  <p>{item.model.slice(0, 16)}</p>
                </main>
                <footer className="flex justify-center">
                  <Link
                    href={`/dashboard/mobile/${item.brand.toLowerCase()}/${
                      item._id
                    }`}
                    className="text-blue-500"
                  >
                    See Details
                  </Link>
                </footer>
              </article>
            </Link>
          );
        })}
      </section>
    );
  } else if (isError) {
    return <div>Error</div>;
  }
};

export default BrandPage;
