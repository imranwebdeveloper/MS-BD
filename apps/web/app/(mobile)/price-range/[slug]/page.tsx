import MobileCardContainer from "@/components/new/MobileCardContainer";
import React from "react";
import { headers } from "@/lib/fetchHeader";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ResponsePhones } from "types";
import { CardTitle } from "@/components/ui/card";
import MyPagination from "@/components/new/Pagination";

const getData = async ({
  page = "1",
  limit,
  range,
}: {
  page: string;
  limit: string;
  range: string;
}) => {
  const res = await fetch(
    `${process.env["API_URL"]}/mobiles?priceRange=${range}&page=${page}&limit=12`,
    { headers, cache: "no-cache" }
  );
  if (!res.ok) throw new Error(await res.json().then((data) => data.message));
  return res.json();
};

// SEO Meta tag
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const prices = params.slug.split("-");
  const metadata = {
    title: `Mobile Phone Prices in Bangladesh: ${params.slug} Tk | ${process.env["LOGO"]}`,
    description: `Discover a wide range of mobile phones priced between ${
      prices[0]
    } ${prices[1] ? `and ${prices[1]}` : ""} Tk in Bangladesh at ${
      process.env["LOGO"]
    }. Browse through our collection of high-quality smartphones from top brands, compare prices, and make an informed purchase decision.`,
    alternates: {
      canonical: `${process.env["FULL_DOMAIN_URL"]}/price-range/${params.slug}`,
    },
    openGraph: {
      type: "website",
      title: `Mobile Phone Prices in Bangladesh: ${params.slug} Tk | ${process.env["LOGO"]}`,
      description: `Discover a wide range of mobile phones priced between ${
        prices[0]
      } ${prices[1] ? `and ${prices[1]}` : ""} Tk in Bangladesh at ${
        process.env["LOGO"]
      }. Browse through our collection of high-quality smartphones from top brands, compare prices, and make an informed purchase decision.`,
      url: `${process.env["FULL_DOMAIN_URL"]}/price-range/${params.slug}`,
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
      title: `Mobile Phone Prices in Bangladesh: ${params.slug} Tk | ${process.env["LOGO"]}`,

      description: `Discover a wide range of mobile phones priced between ${
        prices[0]
      } ${prices[1] ? `and ${prices[1]}` : ""} Tk in Bangladesh at ${
        process.env["LOGO"]
      }. Browse through our collection of high-quality smartphones from top brands, compare prices, and make an informed purchase decision.`,
      images:
        "https://firebasestorage.googleapis.com/v0/b/mobile-seller-e6165.appspot.com/o/logo.png?alt=media&token=e20206ed-013e-4fe7-a6e4-567de9d2838d",
    },
  };

  return metadata;
}

const PriceRanges = async ({
  searchParams,
  params,
}: {
  searchParams: { page: string; limit: string };
  params: { slug: string };
}) => {
  const { data }: ResponsePhones = await getData({
    range: params.slug,
    limit: searchParams.limit,
    page: searchParams.page,
  });

  if (!data) {
    notFound();
  }
  const { limit, count, mobiles } = data;

  return (
    <section className="page flex-1 flex flex-col my-4">
      <CardTitle className=" text-lg md:text-2xl mt-4 md:mt-6">
        Latest Mobile Phones Price in Bangladesh
      </CardTitle>

      <div className="flex-1">
        <MobileCardContainer data={mobiles} />
      </div>

      <div className="mt-2">
        {limit < count && (
          <MyPagination
            total={count}
            pageSize={limit}
            path={`/price-range/${params.slug}?&page=`}
            currentPage={searchParams.page}
          />
        )}
      </div>
    </section>
  );
};

export default PriceRanges;
