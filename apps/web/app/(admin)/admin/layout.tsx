import DashboardHeader from "@/components/admin/Header/DashboardHeader";
import Aside from "@/layouts/Aside";
interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout = async ({ children }: DashboardLayoutProps) => {
  return (
    <div className="grid h-screen grid-cols-[280px_1fr] ">
      <Aside />
      <section className="relative h-screen overflow-scroll  px-4 scrollbar-hide ">
        <DashboardHeader />
        <section className="mb-4 ">{children}</section>
      </section>
    </div>
  );
};

export default AdminLayout;
