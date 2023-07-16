import React from "react";
import Pagination from "@/components/common/Pagination";
import MobileCardContainer from "@/components/common/MobileCardContainer";
import { headers } from "@/lib/fetchHeader";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import MyPagination from "@/components/new/Pagination";
import { Phones, ResponsePhones } from "types";

const getData = async ({
  page,
  limit,
  status,
}: {
  page: string;
  limit: string;
  status: string;
}) => {
  const res = await fetch(
    `${process.env["API_URL"]}/mobiles?status=${status}&page=${page}&limit=${limit}` as string,
    {
      headers: headers,
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error(await res.json().then((data) => data.message));
  return res.json();
};
export async function generateMetadata(): Promise<Metadata> {
  const metadata = {
    title: `Latest Mobile Phones Price in Bangladesh | ${process.env["LOGO"]}`,
    description: `Discover the latest mobile phones price in Bangladesh at ${process.env["LOGO"]}. Stay updated with the newest smartphone releases, features, specifications, and prices. Find the perfect mobile device to suit your needs.`,
    alternates: {
      canonical: `${process.env["FULL_DOMAIN_URL"]}/mobile/latest`,
    },
    openGraph: {
      type: "website",
      title: `Latest Mobile Phones Price in Bangladesh | ${process.env["LOGO"]}`,
      description: `Discover the latest mobile phones price in Bangladesh at ${process.env["LOGO"]}. Stay updated with the newest smartphone releases, features, specifications, and prices. Find the perfect mobile device to suit your needs.`,
      url: `${process.env["FULL_DOMAIN_URL"]}/mobile/latest`,
      images: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/mobile-seller-e6165.appspot.com/o/logo.png?alt=media&token=e20206ed-013e-4fe7-a6e4-567de9d2838d",
          alt: "MobileSellerBD.com",
          width: 600,
          height: 315,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `Latest Mobile Phones Price in Bangladesh | ${process.env["LOGO"]}`,
      description: `Discover the latest mobile phones price in Bangladesh at ${process.env["LOGO"]}. Stay updated with the newest smartphone releases, features, specifications, and prices. Find the perfect mobile device to suit your needs.`,
      images:
        "https://firebasestorage.googleapis.com/v0/b/mobile-seller-e6165.appspot.com/o/logo.png?alt=media&token=e20206ed-013e-4fe7-a6e4-567de9d2838d",
    },
  };

  return metadata;
}
const LatestMobiles = async ({
  searchParams,
}: {
  searchParams: { page: string; limit: string; status: string };
}) => {
  const { data }: ResponsePhones = await getData(searchParams);
  if (!data) {
    notFound();
  }
  const { count, mobiles, limit } = data;

  return (
    <section className="page my-8">
      <div>
        <div className="my-2 ">
          <h1 className="text-2xl">Latest Mobile Phones Price in Bangladesh</h1>
        </div>
        <MobileCardContainer data={mobiles} />
      </div>
      {limit < count && (
        <MyPagination
          total={count}
          pageSize={limit}
          path={`mobile/latest?status=AVAILABLE&limit=20&page=`}
          currentPage={searchParams.page}
        />
      )}
    </section>
  );
};

export default LatestMobiles;
