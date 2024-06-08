"use client";
import { UserAuth } from "@/components/authprovider/AuthContext";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  redirect("/authentication/signin");
  return (
    <main>
      {/* <h1 className="text-center my-10">Home / must be deleted</h1>
      <div className="">
        <AddUserComponents />
        <ShowUser />
      </div> */}
    </main>
  );
}
