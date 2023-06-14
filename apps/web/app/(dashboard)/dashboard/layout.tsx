import React from "react";
import { getCurrentUser } from "@/lib/session";
import Aside from "@/layouts/Aside";
import DashboardHeader from "@/components/admin/Header/DashboardHeader";

interface MobileLayoutProps {
  children?: React.ReactNode;
}

const layout = async ({ children }: MobileLayoutProps) => {
  //   const data: any = await getCurrentUser();
  return (
    <div className="grid h-screen md:grid-cols-[280px_1fr]">
      <Aside />
      <section className="relative h-screen overflow-scroll  px-4 scrollbar-hide ">
        <DashboardHeader />
        <section className="mb-4 ">{children}</section>
      </section>
    </div>
  );
};

export default layout;
