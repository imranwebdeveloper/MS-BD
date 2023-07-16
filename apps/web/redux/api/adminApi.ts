import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommonRes, Phone, Phones } from "types";
export const adminApi = createApi({
  reducerPath: "admin",
  tagTypes: ["mobiles"],
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
    getAllMobiles: query<Phones, string>({
      query: (query: string) => `/mobiles?${query}`,
      transformResponse: (response: CommonRes<Phones>) => response.data,
    }),
    getMobileById: query<Phone, string>({
      query: (id: string) => `/mobiles/${id}`,
      transformResponse: (response: CommonRes<Phone>) => response.data,
    }),

    updateMobileStatus: mutation({
      query: ({ id, ...rest }) => {
        return {
          method: "PATCH",
          url: `mobiles/update-status/${id}`,
          body: { ...rest },
        };
      },
    }),

    updateMobilePrice: mutation({
      query: ({ id, ...rest }) => {
        return {
          method: "PATCH",
          url: `mobiles/update-price/${id}`,
          body: { ...rest },
        };
      },
    }),

    deleteMobileById: mutation({
      query: (id) => ({
        method: "DELETE",
        url: `mobiles/${id}`,
      }),
    }),
  }),
});

export const {
  useGetAllMobilesQuery,
  useGetMobileByIdQuery,
  useUpdateMobileStatusMutation,
  useUpdateMobilePriceMutation,
  useDeleteMobileByIdMutation,
} = adminApi;
