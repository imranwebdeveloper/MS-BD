import Link from "next/link";
import MobileCardContainer from "@/components/new/MobileCardContainer";
import { notFound } from "next/navigation";
import { headers } from "@/lib/fetchHeader";
import { ResponsePhones } from "types";
import { buttonVariants } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import UpcomingMobile from "@/components/new/UpcomingMobile";
import { CardTitle } from "@/components/ui/card";

const getData = async (slag: string, limit: string) => {
  const res = await fetch(
    `${process.env["API_URL"]}/mobiles?status=${slag}&limit=${limit}` as string,
    {
      headers: headers,
      cache: "no-cache",
    }
  );

  if (!res.ok) throw new Error(await res.json().then((data) => data.message));
  return res.json();
};

const Home = async () => {
  const available: ResponsePhones = await getData("AVAILABLE", "8");
  const upcoming: ResponsePhones = await getData("UPCOMING", "10");

  if (!upcoming || !available) {
    notFound();
  }

  const { mobiles } = available.data;

  return (
    <section className="page my-4">
      <CardTitle className=" text-lg md:text-2xl mt-4 md:mt-10">
        Upcoming Phones
      </CardTitle>
      <UpcomingMobile data={upcoming} />

      <CardTitle className=" text-lg md:text-2xl mt-4 md:mt-10">
        Available Phones
      </CardTitle>
      <MobileCardContainer data={mobiles} />

      <div className="flex justify-center mt-4 md:my-10">
        <Link
          href={{
            pathname: "mobile/latest",
            query: { page: "1", limit: "20", status: "AVAILABLE" },
          }}
          className={buttonVariants({
            variant: "default",
            className: "font-bold",
          })}
        >
          <ChevronRightIcon className="h-4 w-4 mr-2" /> More Mobiles
        </Link>
      </div>
    </section>
  );
};
export default Home;
