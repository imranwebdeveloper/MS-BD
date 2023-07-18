import MobileCardContainer from "@/components/new/MobileCardContainer";
import MyPagination from "@/components/new/Pagination";
import UpcomingMobile from "@/components/new/UpcomingMobile";
import { CardTitle } from "@/components/ui/card";
import { headers } from "@/lib/fetchHeader";
import { toTitleCase } from "@/utils/toTitleCase";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResponsePhones } from "types";

const getData = async ({
  limit,
  page = "1",
  brand,
}: {
  page: string;
  limit: string;
  brand: string;
}) => {
  const res = await fetch(
    `${process.env["API_URL"]}/mobiles?brand=${brand}&status=public&page=${page}&limit=12` as string,
    { headers, cache: "no-cache" }
  );
  if (!res.ok) throw new Error(await res.json().then((data) => data.message));
  return res.json();
};

export async function generateMetadata({
  params,
}: {
  params: { brand: string };
}): Promise<Metadata> {
  const brandTitle = toTitleCase(params.brand);

  const metadata = {
    title: `${brandTitle} Mobile Price in Bangladesh | ${process.env["LOGO"]}`,
    description: `Discover the latest ${brandTitle} mobile phones in Bangladesh at ${process.env["LOGO"]}. Stay updated with the newest releases, features, specifications, and prices of ${brandTitle} smartphones. Find the perfect ${brandTitle} mobile device to suit your needs.`,
    alternates: {
      canonical: `${process.env["FULL_DOMAIN_URL"]}/mobile/${params.brand}`,
    },
    openGraph: {
      type: "website",
      title: `${brandTitle} Mobile Price in Bangladesh | ${process.env["LOGO"]}`,
      description: `Discover the latest ${brandTitle} mobile phones in Bangladesh at ${process.env["LOGO"]}. Stay updated with the newest releases, features, specifications, and prices of ${brandTitle} smartphones. Find the perfect ${brandTitle} mobile device to suit your needs.`,
      url: `${process.env["FULL_DOMAIN_URL"]}/mobile/${params.brand}`,
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
      title: `${brandTitle} Mobile Price in Bangladesh | ${process.env["LOGO"]}`,
      description: `Discover the latest ${brandTitle} mobile phones in Bangladesh at ${process.env["LOGO"]}. Stay updated with the newest releases, features, specifications, and prices of ${brandTitle} smartphones. Find the perfect ${brandTitle} mobile device to suit your needs.`,
      images:
        "https://firebasestorage.googleapis.com/v0/b/mobile-seller-e6165.appspot.com/o/logo.png?alt=media&token=e20206ed-013e-4fe7-a6e4-567de9d2838d",
    },
  };

  return metadata;
}

const BrandModelList = async ({
  params,
  searchParams,
}: {
  searchParams: { page: string; limit: string };
  params: { brand: string };
}) => {
  const { data }: ResponsePhones = await getData({
    limit: searchParams.limit,
    brand: params.brand,
    page: searchParams.page,
  });

  if (!data) {
    notFound();
  }
  const { limit, count, mobiles } = data;
  const brandTitle = toTitleCase(params.brand);

  return (
    <section className="page flex-1 flex flex-col my-4">
      <CardTitle className=" text-lg md:text-2xl mt-4 md:mt-6">
        {brandTitle} Phones Price in Bangladesh
      </CardTitle>

      <div className="flex-1">
        <MobileCardContainer data={mobiles} />
      </div>
      <div className="mt-2">
        {limit < count && (
          <MyPagination
            total={count}
            pageSize={limit}
            path={`/mobile/${params.brand}?page=`}
            currentPage={searchParams.page}
          />
        )}
      </div>
    </section>
  );
};

export default BrandModelList;
