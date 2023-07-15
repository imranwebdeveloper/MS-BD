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
  status: PhoneStatus;
  approved: boolean;
  img_url: string;
  content: PhoneContent;
}

export enum PhoneStatus {
  UPCOMING = "UPCOMING",
  AVAILABLE = "AVAILABLE",
  UNAPPROVED = "UNAPPROVED",
}

export class Status {
  static readonly UPCOMING: "UPCOMING";
  static readonly AVAILABLE: "AVAILABLE";
  static readonly UNAPPROVED: "UNAPPROVED";
}

export type PhoneStatusType = "UPCOMING" | "AVAILABLE" | "UNAPPROVED";

export interface PhoneShortInfo {
  _id: string;
  brand: string;
  model: string;
  variants: PhoneVariants[];
  img_url: string;
  updatedAt: string;
  model_id: string;
  status: string;
  title: string;
}

export interface PhoneShortRes {
  count: number;
  perPage: number;
  mobiles: PhoneShortInfo[];
}
export interface Phones {
  count: number;
  limit: number;
  mobiles: PhoneShortInfo[];
}
