import { MetaData } from "@/lib/metaData";
import { Metadata } from "next";

export const metadata: Metadata = MetaData.Admin.Dashboard;

const Dashboard = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      Dashboard
    </main>
  );
};

export default Dashboard;
