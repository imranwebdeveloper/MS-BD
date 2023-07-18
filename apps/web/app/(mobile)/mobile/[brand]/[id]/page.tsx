import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import { Metadata } from "next";
import Disclaimer from "@/components/new/Disclaimer";
import MobilePriceTable from "@/components/common/MobilePriceTable";
import { notFound } from "next/navigation";
import { headers } from "@/lib/fetchHeader";
import PhoneContent from "@/components/common/PhoneContent";
import { capitalizeFirstWord } from "@/utils/toTitleCase";
import { Phone } from "types";
import { CardTitle } from "@/components/ui/card";

const getData = async (id: string) => {
  const res = await fetch(
    `${process.env["API_URL"]}/mobiles/model/${id}` as string,
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
    title: `${data.brand} ${data.model} Specs, Price in Bangladesh | ${process.env["LOGO"]}`,
    description: `Explore the ${data.brand} ${data.model} specifications, features, availability, and price in Bangladesh at ${process.env["LOGO"]}. Get detailed information about the ${data.brand} ${data.model} and make an informed purchase decision.`,
    alternates: {
      canonical: `${
        process.env["FULL_DOMAIN_URL"]
      }/mobile/${data.brand.toLowerCase()}/${params.id}`,
    },

    openGraph: {
      type: "website",
      title: `${data.brand} ${data.model} Specs, Price in Bangladesh | ${process.env["LOGO"]}`,
      description: `Explore the ${data.brand} ${data.model} specifications, features, availability, and price in Bangladesh at ${process.env["LOGO"]}. Get detailed information about the ${data.brand} ${data.model} and make an informed purchase decision.`,
      url: `${
        process.env["FULL_DOMAIN_URL"]
      }/mobile/${data.brand.toLowerCase()}/${params.id}`,
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
      title: `${data.brand} ${data.model} Specs, Price in Bangladesh | ${process.env["LOGO"]}`,
      description: `Explore the ${data.brand} ${data.model} specifications, features, availability, and price in Bangladesh at ${process.env["LOGO"]}. Get detailed information about the ${data.brand} ${data.model} and make an informed purchase decision.`,
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
    <>
      <section className="page my-4">
        <article className="mx-auto bg-white border rounded-md grid grid-cols-1 text-sm md:grid-cols-3 max-w-3xl ">
          <CardTitle className=" text-lg md:text-xl text-center md:text-start col-span-3 border-b p-2 md:p-3 bg-orange-50 text-orange-600 rounded-t-md overflow-hidden ">
            {data.brand} {data.model} Price in Bangladesh
          </CardTitle>
          <div className="p-3 col-span-3 md:col-span-1">
            <Image
              alt={`${data.brand} ${data.model} mobile`}
              src={data.img_url}
              width={150}
              height={180}
              priority
              className="max-w-[140px] max-h-40 mx-auto "
            />
          </div>
          <div className="md:col-span-2 mx-2  px-3 flex flex-col justify-center   ">
            <MobilePriceTable variants={data.variants} date={updateDate} />
            <div className="mt-2 flex gap-2 border  items-center md:hidden mb-3 ">
              <p className="px-2 py-1 bg-slate-50 border-r text-xs ">
                Last Updated
              </p>
              <time dateTime={updateDate} className="text-xs">
                {updateDate}
              </time>
            </div>
          </div>
        </article>
        <article className="max-w-3xl mx-auto mt-2">
          {Object.keys(data.content).map((section) => {
            const title = capitalizeFirstWord(section.split("_").join(" "));
            return (
              <PhoneContent
                key={section}
                content={data.content[section]}
                title={title}
              />
            );
          })}
        </article>
      </section>
      <Disclaimer />
    </>
  );
};

export default ModelDetails;
