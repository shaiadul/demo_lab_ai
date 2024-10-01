"use client";
import { useRouter } from "next/navigation";
import Steps from "./Steps";
import MusicPlayer from "./MusicPlayer";
import { useEffect } from "react";
import { UserAuth } from "@/components/authprovider/AuthContext";

const Page = () => {
  const router = useRouter();
  const { user } = UserAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { localStorage } = window;
      const guard = localStorage.getItem("user");
      const username = JSON.parse(guard).user.username;
      if (!guard && !user && !username) {
        router.push("/authentication/signin");
      }
    }
  }, []);
  return (
    <section className="mx-5 my-10">
      <div className="flex justify-center">
        <span className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#4D93F6] to-[#AA26B6]">
          Voice Isolation & Music Separation
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



// [
//   "https://nyc3.digitaloceanspaces.com/shardmind.ai/users/657ca801a0fce699ae0279c7/drums.lungi.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00E62JWRAHTAANAADR%2F20240816%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20240816T192034Z&X-Amz-Expires=3600&X-Amz-Signature=fe2bf5f2b081883ac7244f575f8ec298ad5da0c8d7e931eed1e9a9a50b511add&X-Amz-SignedHeaders=host&x-id=GetObject",


//   "https://nyc3.digitaloceanspaces.com/shardmind.ai/users/657ca801a0fce699ae0279c7/bass.lungi.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00E62JWRAHTAANAADR%2F20240816%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20240816T192034Z&X-Amz-Expires=3600&X-Amz-Signature=b9a4a359fba6e245fa61c679bcf27eda3003c2f8b7d0c1398b789d9d6bc9d6ee&X-Amz-SignedHeaders=host&x-id=GetObject",

//   "https://nyc3.digitaloceanspaces.com/shardmind.ai/users/657ca801a0fce699ae0279c7/other.lungi.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00E62JWRAHTAANAADR%2F20240816%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20240816T192034Z&X-Amz-Expires=3600&X-Amz-Signature=01734ba2780d0ed39c6cee7938eb406c358e35a0cb0a8e207a219ec978695858&X-Amz-SignedHeaders=host&x-id=GetObject",

//   "https://nyc3.digitaloceanspaces.com/shardmind.ai/users/657ca801a0fce699ae0279c7/vocals.lungi.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00E62JWRAHTAANAADR%2F20240816%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20240816T192034Z&X-Amz-Expires=3600&X-Amz-Signature=f5b39612059770c7d17d7171b1393be6cc46d06f6e7d69d2aba6d990bc1000a5&X-Amz-SignedHeaders=host&x-id=GetObject"
// ]