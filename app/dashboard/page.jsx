"use client";
import { UserAuth } from "@/components/authprovider/AuthContext";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  const { user } = UserAuth();
  redirect("/signin");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { localStorage } = window;
      const guard = localStorage.getItem("token");
      if (!guard && !user) {
        router.push("/authentication/signin");
      }
    }
  }, []);

  useEffect;
  return <div></div>;
};

export default Dashboard;
