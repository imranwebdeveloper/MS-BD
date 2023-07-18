"use client";
import PhoneCategory from "@/components/container/header/PhoneCategory";
import PriceRange from "@/components/container/header/PriceRange";
import SubHeader from "@/components/container/header/SubHeader";
import { useParams } from "next/navigation";
import React from "react";

const NavContainer = () => {
  const { brand, slug } = useParams();

  return (
    <section className="root mt-2">
      <div className="page">
        <SubHeader slug={brand ? brand : ""} />
        <PriceRange slug={slug ? slug : ""} />
        {/* <PhoneCategory slug={slug ? slug : ""} /> */}
      </div>
    </section>
  );
};

export default NavContainer;
