"use client";

// import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import AuthProvider from "./AuthProvider";

export function ReduxProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* <Provider store={store}> */}
      <Toaster />
      <AuthProvider>{children}</AuthProvider>
      {/* </Provider> */}
    </SessionProvider>
  );
}
