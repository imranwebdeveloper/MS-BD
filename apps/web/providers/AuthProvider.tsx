"use client";
// import { setUser } from "@/redux/slices/authSlice";
import { useSession } from "next-auth/react";
import React from "react";
import { useDispatch } from "react-redux";

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const session = useSession();
  const dispatch = useDispatch();
  if (session.status === "authenticated") {
    const { access_token, user } = session.data?.user as any;
    // dispatch(setUser({ access_token, user }));
  }
  return <>{children}</>;
};

export default AuthProvider;
