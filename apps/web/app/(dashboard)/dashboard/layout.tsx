import React from "react";
import { getCurrentUser } from "@/lib/session";

interface MobileLayoutProps {
  children?: React.ReactNode;
}

const layout = async ({ children }: MobileLayoutProps) => {
  //   const data: any = await getCurrentUser();
  return (
    <div className="flex flex-col min-h-screen">
      <main className="root flex-1 ">{children}</main>
    </div>
  );
};

export default layout;
