"use client";

import { SessionProvider } from "next-auth/react";

export const AuthContextProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
