"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SkeletonCard from "@/components/loading/SkeletonCard";

const PersonalFeed = () => {
  const router = useRouter();
  const [audioData, setAudioData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { localStorage } = window;
      const guard = JSON.parse(localStorage.getItem("user"));
      if (guard) {
        setUserInfo(guard);
      } else {
        router.push("/authentication/signin");
      }
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.access_token;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://api.demolab.app/user_generations/", requestOptions)
      .then((response) => response.json())
      .then((result) => setAudioData(result))
      .catch((error) => console.error(error));
  }, []);

  console.log("user info", userInfo?.user?.username);

  return (
    <section className="mx-5 my-10">
      {!audioData.length && (
        <>
          <SkeletonCard />
        </>
      )}
      <div className={`${audioData.length ? "block" : "hidden"}`} >
        <div className="relative w-full h-36 bg-white rounded-lg shadow-lg overflow-hidden mb-32">
          <div className="absolute inset-0 rounded-lg overflow-hidden bg-red-200">
            <img
              src="https://images.unsplash.com/photo-1543794327-59a91fb815d1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=200&q=80"
              alt="Background"
            />
            <div className="absolute inset-0 backdrop backdrop-blur-10 bg-gradient-to-b from-transparent to-black"></div>
          </div>
          <div className="absolute flex space-x-6 transform translate-x-6 translate-y-8">
            <div className="w-36 h-36 rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1543794327-59a91fb815d1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                alt="Profile"
              />
            </div>
            <div className="text-white pt-12">
              <h3 className="font-bold">
                {userInfo?.user?.username || "User Name"}
              </h3>
              <div className="text-sm opacity-60">
                {userInfo?.user?.email || "User Mail"}
              </div>
              <div className="mt-8 text-gray-400">
                <div className="flex items-center space-x-2 text-xs">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                  </svg>
                  <span>Easy listening</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audioData.map((item) => (
            <div
              key={item.id}
              className="relative bg-[#311539] rounded-lg shadow-lg overflow-hidden"
            >
              {/* Card Image */}
              <div className="relative w-full h-48 bg-gray-200">
                {item.content?.image_url ? (
                  <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={item.content.image_url}
                    alt={item.content.title || "Audio"}
                  />
                ) : (
                  <div className="flex justify-center items-center h-full text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4">
                {/* Title */}
                <h3 className="text-lg font-bold">
                  {item.content?.title || "Untitled"}
                </h3>

                {/* Type */}
                <p className="text-sm text-gray-600 mb-2">
                  {item.content?.type || "Music"}
                </p>

                {/* Custom Audio Player */}
                <audio controls className="w-full mt-2">
                  <source src={item.audio_file} type="audio/mp3" />
                  Your browser does not support the audio tag.
                </audio>

                {/* Optional: Duration */}
                {item.content?.duration && (
                  <div className="text-xs text-gray-500 mt-1">
                    Duration: {Math.floor(item.content.duration / 60)}:
                    {Math.floor(item.content.duration % 60)
                      .toString()
                      .padStart(2, "0")}{" "}
                    minutes
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalFeed;
