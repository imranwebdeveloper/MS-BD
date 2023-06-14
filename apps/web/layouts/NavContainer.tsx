"use client";
import PhoneCategory from "@/components/common/PhoneCategory";
import PriceRange from "@/components/common/PriceRange";
import SubHeader from "@/components/container/header/SubHeader";
import { useParams } from "next/navigation";
import React from "react";

const NavContainer = () => {
  const { brand, slug } = useParams();

  return (
    <section className="main">
      <div className="layout container px-1">
        <SubHeader slug={brand ? brand : ""} />
        <PriceRange slug={slug ? slug : ""} />
        {/* <PhoneCategory slug={slug ? slug : ""} /> */}
      </div>
    </section>
  );
};

export default NavContainer;
