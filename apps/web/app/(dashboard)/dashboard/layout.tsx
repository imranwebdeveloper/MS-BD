import ReduxProviders from "@/providers/ReduxProvider";
import React from "react";
import { getCurrentUser } from "@/lib/session";

import DashboardHeader from "@/components/new/DashboardHeader";
import Token from "@/components/Token";
import { notFound } from "next/navigation";
import AdminSidebar from "@/components/new/AdminSidebar";

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
      <AdminSidebar />
      <section className="relative h-screen overflow-scroll  px-4 scrollbar-hide ">
        <DashboardHeader />
        <section className="mb-4 ">
          <ReduxProviders>{children}</ReduxProviders>
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
