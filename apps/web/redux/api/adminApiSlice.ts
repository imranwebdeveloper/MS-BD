import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  CommonRes,
  Phone,
  PhoneShortInfo,
  PhoneShortRes,
  PhoneVariants,
} from "types";

export const adminApiSlice = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env["API_URL"]}`,
    prepareHeaders: (headers, { getState }) => {
      // headers.set("x-api-key", process.env["API_KEY"] as string);
      // const store = getState() as RootState;
      // const token = store.auth.access_token;
      // if (token) {
      //   headers.set("authorization", `Bearer ${token}`);
      // }
      // return headers;
    },
  }),
  endpoints: ({ mutation, query }) => ({
    getAllMobileList: query<PhoneShortRes, null>({
      query: () => "/mobiles/latest",
      transformResponse: (response: CommonRes<PhoneShortRes>) => response.data,
    }),
    getMobilesByStatus: query({
      query: (query: string) => `/mobiles/status/?${query}`,
      transformResponse: (response: CommonRes<PhoneShortRes>) => response.data,
    }),
    getMobileById: query<Phone, string>({
      query: (path) => `mobiles/${path}`,
      transformResponse: (response: CommonRes<Phone>) => response.data,
    }),

    getAllMobiles: query<PhoneShortRes, string>({
      query: (path) => `mobiles/${path}`,
      transformResponse: (response: CommonRes<PhoneShortRes>) => response.data,
    }),

    updateMobilePrice: mutation({
      query: ({ id, ...rest }) => {
        return {
          method: "PUT",
          url: `mobiles/update-price/${id}`,
          body: { ...rest },
        };
      },
    }),

    updateMobileContent: mutation({
      query: (data: any) => ({
        method: "PUT",
        url: "mobiles/update-content",
        body: data,
      }),
    }),
    addNewMobile: mutation({
      query: (data: any) => ({
        method: "POST",
        url: "mobiles/new-mobile",
        body: data,
      }),
    }),
    deleteMobile: mutation({
      query: (id: string) => ({
        method: "DELETE",
        url: `mobiles/${id}`,
      }),
    }),
    approvedMobile: mutation({
      query: (id: string) => ({
        method: "PUT",
        url: `mobiles/approve/${id}`,
      }),
    }),
  }),
});

export const {
  useGetAllMobileListQuery,
  useGetMobileByIdQuery,
  useUpdateMobilePriceMutation,
  useUpdateMobileContentMutation,
  useAddNewMobileMutation,
  useDeleteMobileMutation,
  useGetMobilesByStatusQuery,
  useGetAllMobilesQuery,
  useApprovedMobileMutation,
  useLazyGetMobileByIdQuery,
} = adminApiSlice;
