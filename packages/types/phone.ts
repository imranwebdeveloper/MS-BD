import { DocumentCommon } from "./document";

export interface PhoneContent {
  [key: string]: any;
}

export interface PhoneVariants {
  ROM: number;
  RAM: number;
  official: number;
  unofficial: number;
}

export interface Phone extends DocumentCommon {
  releasedDate: any;
  title: string;
  brand: string;
  model: string;
  model_id: string;
  category: string;
  variants: PhoneVariants[];
  status: string;
  approved: boolean;
  img_url: string;
  content: PhoneContent;
}
