import React from "react";
import { getCurrentUser } from "@/lib/session";

import Aside from "@/layouts/Aside";
import DashboardHeader from "@/components/admin/Header/DashboardHeader";
import Token from "@/components/Token";
import { notFound } from "next/navigation";

interface MobileLayoutProps {
  children?: React.ReactNode;
}

const Dashboard = async ({ children }: MobileLayoutProps) => {
  const data = await getCurrentUser();
  // if (data?.user) {
  //   return notFound();
  // }

  return (
    <div className="grid h-screen md:grid-cols-[280px_1fr]">
      {/* <Token user={data?.user} /> */}
      <Aside />
      <section className="relative h-screen overflow-scroll  px-4 scrollbar-hide ">
        <DashboardHeader />
        <section className="mb-4 ">{children}</section>
      </section>
    </div>
  );
};

export default Dashboard;
