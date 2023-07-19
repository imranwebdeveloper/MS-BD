"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "./AuthProvider";

const ReduxProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Toaster />
      <SessionProvider>
        <AuthProvider>{children}</AuthProvider>
      </SessionProvider>
    </Provider>
  );
};

export default ReduxProviders;
