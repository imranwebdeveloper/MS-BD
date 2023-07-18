import Image from "next/image";
import Link from "next/link";
import React from "react";
import CardPrice from "./CardPrice";
import { PhoneShortInfo } from "types";
interface Props {
  data: PhoneShortInfo[];
}

const MobileCardContainer = ({ data }: Props) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  rounded gap-2 md:gap-4 mt-2 ">
      {data.length <= 0 && <h1 className="text-2xl">No Data Found</h1>}
      {data.map((item) => {
        return (
          <Link
            key={item._id}
            href={`/mobile/${item.brand.toLowerCase()}/${item.model_id}`}
          >
            <article className="transition cursor-pointer hover:scale-105  flex flex-col border rounded-md bg-white p-4">
              <header>
                <Image
                  src={item.img_url}
                  width={100}
                  height={120}
                  priority
                  alt={`${item.brand} ${item.model} mobile`}
                  className="w-24 h-28 md:w-28 md:h-32 mx-auto lg:w-32 lg:h-36 "
                />
              </header>

              <main className=" text-center mt-1">
                <p className="text-slate-700 font-semibold text-sm md:text-base tracking-tight">
                  {item.brand}
                </p>
                <p className="text-slate-600 text-sm md:text-base tracking-tight">
                  {item.model}
                </p>
                <CardPrice prices={item.variants} />
              </main>
            </article>
          </Link>
        );
      })}
    </section>
  );
};

export default MobileCardContainer;
