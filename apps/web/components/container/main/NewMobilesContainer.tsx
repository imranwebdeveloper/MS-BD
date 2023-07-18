import MobileCardContainer from "@/components/new/MobileCardContainer";
import React from "react";

const getData = async (path: string) => {
  const res = await fetch(`${process.env["API_URL"]}/${path}` as string, {
    cache: "no-cache",
  });
  return res.json();
};

const NewMobilesContainer = async ({ path }: { path: string }) => {
  const { data } = await getData(path);
  return <MobileCardContainer data={data.mobiles} />;
};

export default NewMobilesContainer;
