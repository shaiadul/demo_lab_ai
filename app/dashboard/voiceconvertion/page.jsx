"use client";
import { useRouter } from "next/navigation";
import Steps from "./Steps";
import MusicPlayer from "./MusicPlayer";
import { useEffect } from "react";
import { UserAuth } from "@/components/authprovider/AuthContext";
import ModeSelect from "./ModeSelect";

const Page = () => {
  const router = useRouter();
  const { user } = UserAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { localStorage } = window;
      const guard = localStorage.getItem("token");
      if (!guard && !user) {
        router.push("/authentication/signin");
      }
    }
  }, []);
  return (
    <section className="mx-5 my-10">
      <div className="flex justify-center">
        <span className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#4D93F6] to-[#AA26B6]">
          Voice Convertion & Change
        </span>
      </div>

      <div className="flex justify-center">
        <p className="my-10 border-b-2 inline-block cursor-pointer">
          How to Use
        </p>
      </div>
      <Steps />
      
    </section>
  );
};

export default Page;

// some link for testing:
// http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/fx/engine-4.ogg
// http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race1.ogg
// http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/lose.ogg
