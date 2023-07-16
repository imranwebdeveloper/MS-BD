import Link from "next/link";
import MobileCardContainer from "@/components/common/MobileCardContainer";
import { notFound } from "next/navigation";
import { headers } from "@/lib/fetchHeader";
import { PhoneShortInfo } from "types";
import { buttonVariants } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

const getData = async () => {
  const res = await fetch(
    `${process.env["API_URL"]}/mobiles?status=AVAILABLE&limit=10` as string,
    {
      headers: headers,
      cache: "no-cache",
    }
  );

  if (!res.ok) throw new Error(await res.json().then((data) => data.message));
  return res.json();
};

const Home = async () => {
  const { data } = await getData();

  if (!data) {
    notFound();
  }

  const { mobiles }: { mobiles: PhoneShortInfo[] } = data;

  return (
    <section className="page my-8">
      <div className="my-2 ">
        <h1 className="text-2xl">
          Latest Available Mobile Phones Price in Bangladesh
        </h1>
      </div>
      <MobileCardContainer data={mobiles} />
      <div className="flex justify-center mt-8">
        <Link
          href={{
            pathname: "mobile/latest",
            query: { page: "1", limit: "20", status: "AVAILABLE" },
          }}
          className={buttonVariants({ variant: "default" })}
        >
          <ChevronRightIcon className="h-4 w-4 mr-2" /> More Mobiles
        </Link>
      </div>
    </section>
  );
};
export default Home;
