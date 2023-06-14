import MobileCardContainer from "@/components/common/MobileCardContainer";
import Pagination from "@/components/common/Pagination";
import { headers } from "@/lib/fetchHeader";
import { toCategoryCase } from "@/utils/toCategoryCase";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

const getData = async (slug: string, pageNumber?: string) => {
  let url: string;
  url = pageNumber
    ? (`${process.env.API_URL}/mobiles/category/${slug}?page=${pageNumber}` as string)
    : (`${process.env.API_URL}/mobiles/category/${slug}` as string);
  const res = await fetch(url, { headers, cache: "no-cache" });
  if (!res.ok) throw new Error(await res.json().then((data) => data.message));
  return res.json();
};
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = toCategoryCase(params.slug);

  const metadata = {
    title: `Latest ${category} Price in Bangladesh | ${process.env.LOGO}`,
    description: `Discover the latest ${category} price in Bangladesh at ${process.env.LOGO}. Browse through a wide range of ${category} models, including smartphones, tablets, and feature phones. Compare prices, specifications, and features to find the perfect ${category} for your needs.`,
    alternates: {
      canonical: `${process.env.FULL_DOMAIN_URL}/category/${params.slug}`,
    },
    openGraph: {
      type: "website",
      title: `Latest ${category} Price in Bangladesh | ${process.env.LOGO}`,
      description: `Discover the latest ${category} price in Bangladesh at ${process.env.LOGO}. Browse through a wide range of ${category} models, including smartphones, tablets, and feature phones. Compare prices, specifications, and features to find the perfect ${category} for your needs.`,
      url: `${process.env.FULL_DOMAIN_URL}/category/${params.slug}`,
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
      title: `Latest ${category} Price in Bangladesh | ${process.env.LOGO}`,
      description: `Discover the latest ${category} price in Bangladesh at ${process.env.LOGO}. Browse through a wide range of ${category} models, including smartphones, tablets, and feature phones. Compare prices, specifications, and features to find the perfect ${category} for your needs.`,
      images:
        "https://firebasestorage.googleapis.com/v0/b/mobile-seller-e6165.appspot.com/o/logo.png?alt=media&token=e20206ed-013e-4fe7-a6e4-567de9d2838d",
    },
  };

  return metadata;
}
const CategoryPhones = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page: string };
}) => {
  const { data } = await getData(params.slug, searchParams.page);

  if (!data) {
    notFound();
  }

  const { parPage, count, mobiles } = data;
  const category = toCategoryCase(params.slug);

  return (
    <section className="main">
      <section className="layout container">
        <div>
          <div className="my-2 mt-4">
            <h1 className="text-2xl">Latest {category} Price in Bangladesh</h1>
          </div>
          <MobileCardContainer data={mobiles} />
        </div>
        {mobiles.length >= 12 && (
          <Pagination
            currenPage={parseInt(searchParams.page)}
            totalProduct={count}
            parPage={parPage}
            path={`category/${params.slug}`}
          />
        )}
      </section>
    </section>
  );
};

export default CategoryPhones;
