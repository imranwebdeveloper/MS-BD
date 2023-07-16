"use client";

import RecentMobile from "@/components/new/RecentMobile";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import allBrands from "@/data/allBrands";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Mobile = () => {
  const router = useRouter();

  return (
    <section className="grid grid-cols-3 gap-2 text-sm  tracking-wide ">
      <CardTitle className="py-2">Mobile phones</CardTitle>
      <Card className="col-span-3 pt-6">
        <CardContent>
          <ul className="grid md:grid-cols-6 gap-2 lg:grid-cols-8 ">
            {allBrands.map((item, i) => (
              <li
                key={i}
                className="flex gap-2 p-2 border items-center cursor-pointer rounded text-gray-500  hover:bg-orange-50 hover:text-orange-600"
                onClick={() =>
                  router.push(`/dashboard/mobile/${item.toLowerCase()}`)
                }
              >
                <ChevronRight className="w-5 h-5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <CardTitle className="col-span-3 py-2">Recent products </CardTitle>
      <RecentMobile status="UNAPPROVED" title="New unapproved" />
      <RecentMobile status="UPCOMING" title="Upcoming" />
      <RecentMobile status="AVAILABLE" title="Available" />
    </section>
  );
};

export default Mobile;
