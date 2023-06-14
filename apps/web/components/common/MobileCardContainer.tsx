import { MobileShortInfo } from "@/types/mobile";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CardPrice from "./CardPrice";
interface Props {
  data: MobileShortInfo[];
}

const MobileCardContainer = ({ data }: Props) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rounded gap-2 md:gap-4  ">
      {data.length <= 0 && <h1 className="text-2xl">No Data Found</h1>}
      {data.map((item) => {
        return (
          <Link
            key={item._id}
            href={`mobile/${item.brand.toLowerCase()}/${item.model_id}`}
          >
            <article className="transition cursor-pointer hover:scale-105  flex flex-col border rounded-md bg-primary-bg-light p-4">
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

              <main className="text-sm text-center mt-1">
                <p className="font-bold md:text-base ">{item.brand}</p>
                <p>{item.model}</p>
              </main>
              <footer>
                <CardPrice prices={item.variants} />
              </footer>
            </article>
          </Link>
        );
      })}
    </section>
  );
};

export default MobileCardContainer;
