"use client";

import { RxDashboard } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import AsideLink from "@/components/admin/common/AsideLink";
import AsideCollapse from "@/components/admin/common/AsideCollapse";
import { signOut } from "next-auth/react";
import Image from "next/image";
import logo from "../app/android-chrome-192x192.png";

const Aside = () => {
  return (
    <div className="flex flex-col bg-primary-bg-light p-4">
      <div className="mb-4 flex gap-2 items-center">
        <Image
          className="rounded-full w-10 h-8"
          src={logo}
          alt={process.env.LOGO as string}
          width={100}
          height={60}
          priority
        />
        <h3 className="text-lg  font-bold  ">{process.env.LOGO}</h3>
      </div>
      <h2 className="my-2 font-semibold">MAIN MENU</h2>
      <nav className="flex  flex-1 flex-col ">
        <ul className="nav flex   flex-col gap-2">
          <AsideLink
            href="/admin"
            title="Dashboard"
            icon={<RxDashboard className="text-lg" />}
          />

          <AsideCollapse
            title="Mobile"
            icon={<HiOutlineDevicePhoneMobile className="text-xl" />}
          >
            <AsideLink href="admin/mobiles/all" title="All Model" />
            <AsideLink href="admin/mobiles/add" title=" Add New " />
          </AsideCollapse>
          <li
            className="flex cursor-pointer items-center gap-4 "
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <span className="text-xl">
              <MdLogout />
            </span>
            <button> Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Aside;
