"use client";
import { UserAuth } from "@/components/authprovider/AuthContext";
import { redirect, useRouter } from "next/navigation";


const Dashboard = () => {
  const router = useRouter();
  const { user } = UserAuth();
  redirect("/signin");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { localStorage } = window;
      const guard = localStorage.getItem("user");
      if (!guard && !user) {
        router.push("/authentication/signin");
      }
    }
  }, []);
  return <></>;
};

export default Dashboard;
