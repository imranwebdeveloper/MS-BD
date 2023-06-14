import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import { Mobile, Phone } from "@/types/mobile";
import { Metadata } from "next";
import Disclaimer from "@/components/common/Disclaimer";
import MobilePriceTable from "@/components/common/MobilePriceTable";
import { notFound } from "next/navigation";
import { headers } from "@/lib/fetchHeader";
import PhoneContent from "@/components/common/PhoneContent";
import { capitalizeFirstWord } from "@/utils/toTitleCase";

const getData = async (id: string) => {
  const res = await fetch(
    `${process.env.API_URL}/mobiles/model/${id}` as string,
    { headers, cache: "no-cache" }
  );
  if (!res.ok) throw new Error(await res.json().then((data) => data.message));
  return res.json();
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { data }: { data: Phone } = await getData(params.id);

  const metadata = {
    title: `${data.brand} ${data.model} Specs, Price in Bangladesh | ${process.env.LOGO}`,
    description: `Explore the ${data.brand} ${data.model} specifications, features, availability, and price in Bangladesh at ${process.env.LOGO}. Get detailed information about the ${data.brand} ${data.model} and make an informed purchase decision.`,
    alternates: {
      canonical: `${
        process.env.FULL_DOMAIN_URL
      }/mobile/${data.brand.toLowerCase()}/${params.id}`,
    },

    openGraph: {
      type: "website",
      title: `${data.brand} ${data.model} Specs, Price in Bangladesh | ${process.env.LOGO}`,
      description: `Explore the ${data.brand} ${data.model} specifications, features, availability, and price in Bangladesh at ${process.env.LOGO}. Get detailed information about the ${data.brand} ${data.model} and make an informed purchase decision.`,
      url: `${process.env.FULL_DOMAIN_URL}/mobile/${data.brand.toLowerCase()}/${
        params.id
      }`,
      images: [
        {
          url: data.img_url,
          alt: "MobileSellerBD.com",
          width: 600,
          height: 315,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${data.brand} ${data.model} Specs, Price in Bangladesh | ${process.env.LOGO}`,
      description: `Explore the ${data.brand} ${data.model} specifications, features, availability, and price in Bangladesh at ${process.env.LOGO}. Get detailed information about the ${data.brand} ${data.model} and make an informed purchase decision.`,
      images: data.img_url,
    },
  };

  return metadata;
}

const ModelDetails = async ({ params }: { params: { id: string } }) => {
  const { data }: { data: Phone } = await getData(params.id);
  if (!data) {
    notFound();
  }

  const updateDate = format(new Date(data.updatedAt), "dd/MM/yyyy");
  return (
    <section className="main">
      <section className="layout container py-4">
        <article className="mx-auto  grid grid-cols-1 text-sm md:grid-cols-3 gap-2 max-w-3xl ">
          <div className="border bg-primary-bg-light rounded-md flex flex-col gap-2 p-6">
            <Image
              alt={`${data.brand} ${data.model} mobile`}
              src={data.img_url}
              width={150}
              height={180}
              priority
              className="max-w-[140px] max-h-40 mx-auto"
            />
            <div className="text-center">
              <p className="font-bold text-primary-bg-dark">{data.brand}</p>
              <p>{data.model}</p>
            </div>
          </div>
          <div className="md:col-span-2 border rounded-md bg-primary-bg-light p-2 md:px-8   ">
            <h1 className="my-2">
              {data.brand} {data.model} Price in Bangladesh
            </h1>
            <MobilePriceTable variants={data.variants} date={updateDate} />
            <div className="mt-2 flex gap-2 border  items-center md:hidden  ">
              <p className="p-2 bg-slate-50 border-r ">Last Updated</p>
              <time dateTime={updateDate}>{updateDate}</time>
            </div>
          </div>
        </article>
        <article className="max-w-3xl mx-auto   mt-2  ">
          {Object.keys(data.content).map((section) => (
            <PhoneContent
              key={section}
              content={data.content[section]}
              title={capitalizeFirstWord(section.split("_").join(" "))}
            />
          ))}
        </article>
      </section>
      <Disclaimer />
    </section>
  );
};

export default ModelDetails;
