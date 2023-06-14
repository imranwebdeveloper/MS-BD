import Image from "next/image";
import PriceUpdateForm from "@/components/admin/form/mobile/PriceUpdateForm";
import { headers } from "@/lib/fetchHeader";
import { notFound } from "next/navigation";

import { Metadata } from "next";
import { MetaData } from "@/lib/metaData";
import { Phone } from "types";
export const metadata: Metadata = MetaData.Admin.Mobiles.Update;

const getData = async (id: string): Promise<{ data: Phone }> => {
  const res = await fetch(`${process.env["API_URL"]}/mobiles/${id}` as string, {
    cache: "no-store",
    headers,
  });
  if (!res.ok) throw new Error(await res.json().then((data) => data.message));
  return res.json();
};

const UpdatePrice = async ({ params }: { params: { id: string } }) => {
  const { data } = await getData(params.id);

  if (!data) {
    notFound();
  }

  return (
    <section className="mx-auto grid max-w-4xl grid-cols-3 gap-4 ">
      <div className=" col-span-1 flex flex-col items-center rounded border bg-primary-bg-light p-8 text-center ">
        <Image
          src={data.img_url}
          alt=""
          className="h-36 w-32"
          width={180}
          height={220}
        />

        <div className="mt-2 ">
          <p className="text-xl font-bold">{data.brand}</p>
          <p>{data.model}</p>
        </div>
      </div>

      <PriceUpdateForm mobile={data} />
    </section>
  );
};

export default UpdatePrice;
