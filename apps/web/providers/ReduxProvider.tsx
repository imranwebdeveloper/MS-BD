"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const ReduxProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Provider store={store}>
        <SessionProvider>{children}</SessionProvider>
      </Provider>
    </div>
  );
};

export default ReduxProviders;
