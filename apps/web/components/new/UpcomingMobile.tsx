"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ResponsePhones } from "types";
import Link from "next/link";
import useDeviceSize from "@/hook/useDevice";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const UpcomingMobile = ({ data }: { data: ResponsePhones }) => {
  const [width] = useDeviceSize();

  return (
    <div className="relative mt-2">
      <Swiper
        slidesPerView={width > 768 ? 5 : 3}
        spaceBetween={width > 768 ? 15 : 5}
        autoplay={{ delay: 2500 }}
        className="mySwiper"
        grid={{ rows: 1 }}
      >
        {data.data.mobiles.map((item) => {
          return (
            <SwiperSlide key={item._id}>
              <Link
                key={item._id}
                href={`mobile/${item.brand.toLowerCase()}/${item.model_id}`}
              >
                <article className="transition cursor-pointer hover:scale-105  flex flex-col border rounded-md bg-white p-2 md:p-4">
                  <header>
                    <Image
                      src={item.img_url}
                      width={100}
                      height={120}
                      priority
                      alt={`${item.brand} ${item.model} mobile`}
                      className="w-16 h-16 md:w-28 md:h-32 mx-auto lg:w-32 lg:h-36 "
                    />
                  </header>
                  <main className=" text-center mt-1 text-xs tracking-tight md:text-base ">
                    <p className="font-semibold text-slate-700 ">
                      {item.brand}
                    </p>
                    <p className="text-orange-600">{item.model}</p>
                  </main>
                </article>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default UpcomingMobile;
