import { headers } from "@/lib/fetchHeader";
import { MobileShortInfo } from "@/types/mobile";

export const getAllMobiles = async (): Promise<MobileShortInfo[]> => {
  const response = await fetch(`${process.env.API_URL}/mobiles` as string, {
    headers,
  });
  const { data } = await response.json();
  return data as MobileShortInfo[];
};
