"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Authentication = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { localStorage } = window;
      const guard = localStorage.getItem("user");
      const username = JSON.parse(guard).user.username;
      if (!guard && !username) {
        router.push("/authentication/signin");
      }
    }
  }, []);

  return <div>THIS IS AUTHENTICATION PAGE</div>;
};

export default Authentication;
