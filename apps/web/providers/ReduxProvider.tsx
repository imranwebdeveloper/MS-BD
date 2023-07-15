"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "@/components/ui/toaster";

const ReduxProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Provider store={store}>
        <Toaster />
        <SessionProvider>{children}</SessionProvider>
      </Provider>
    </div>
  );
};

export default ReduxProviders;
