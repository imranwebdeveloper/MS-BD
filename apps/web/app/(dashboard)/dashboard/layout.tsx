import ReduxProviders from "@/providers/ReduxProvider";
import React from "react";
import { getCurrentUser } from "@/lib/session";

import DashboardHeader from "@/components/new/DashboardHeader";

import AdminSidebar from "@/components/new/AdminSidebar";

interface MobileLayoutProps {
  children?: React.ReactNode;
}

const Dashboard = async ({ children }: MobileLayoutProps) => {
  const data = await getCurrentUser();

  return (
    <div>
      <ReduxProviders>
        <div className="grid h-screen md:grid-cols-[280px_1fr]">
          <AdminSidebar />
          <section className="relative h-screen overflow-scroll  px-4 scrollbar-hide ">
            <DashboardHeader />
            <section className="mb-4 ">{children}</section>
          </section>
        </div>
      </ReduxProviders>
    </div>
  );
};

export default Dashboard;
