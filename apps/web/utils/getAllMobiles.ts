import { headers } from "@/lib/fetchHeader";
import { PhoneShortInfo } from "types";

export const getAllMobiles = async (): Promise<PhoneShortInfo[]> => {
  const response = await fetch(`${process.env["API_URL"]}/mobiles` as string, {
    headers,
  });
  const { data } = await response.json();
  return data as PhoneShortInfo[];
};
