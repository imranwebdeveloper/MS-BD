"use client";
import React, { useEffect } from "react";
interface Props {
  user: any;
}

const Token: React.FC<Props> = ({ user }) => {
  useEffect(() => {
    localStorage.setItem(
      process.env["TOKEN_NAME"] as string,
      `Bearer ${user.access_token}`
    );
  }, [user]);
  return <></>;
};

export default Token;
