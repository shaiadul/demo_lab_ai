"use client";
import React, { useState, useRef, useEffect } from "react";

export default function CreateVoice() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [voiceDescription, setVoiceDescription] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () =>
        setCurrentTime(audioRef.current.currentTime);
      audioRef.current.onloadedmetadata = () =>
        setDuration(audioRef.current.duration);
    }
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-end gap-5">
      <section className="">
        <div className="flex justify-center items-center max-w-[180px] my-4">
          <label className="switch">
            <input
              type="checkbox"
              checked={isCustom}
              onChange={() => setIsCustom(!isCustom)}
            />
            <span className="slider round"></span>
          </label>
          <span className="font-serif font-semibold text-lg ml-2">Custom</span>
        </div>
        <div className="relative p-5">
          <h2 className="font-bold mb-1 text-gray-700 block">
            Voice Description
          </h2>
          <textarea
            rows="4"
            maxLength="210"
            value={voiceDescription}
            onChange={(e) => setVoiceDescription(e.target.value)}
            className="block w-full mt-1 py-2 px-3 rounded-md shadow-sm focus:outline-none bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white dark:bg-gray-800"
          ></textarea>
          <span className="absolute px-2 py-1 text-xs font-serif text-white bg-gradient-to-r from-[#4D93F6] to-[#AA26B6] rounded right-5 bottom-5">
            {210 - voiceDescription.length}
          </span>
        </div>
        <div className="relative p-5">
          <h2 className="font-bold mb-1 text-gray-700 block">Lyrics</h2>
          <textarea
            rows="4"
            maxLength="210"
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            className="block w-full mt-1 py-2 px-3 rounded-md shadow-sm focus:outline-none bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white dark:bg-gray-800"
          ></textarea>
          <span className="absolute px-2 py-1 text-xs font-serif text-white bg-gradient-to-r from-[#4D93F6] to-[#AA26B6] rounded right-5 bottom-5">
            {210 - lyrics.length}
          </span>
        </div>
        <div className="mx-5 mb-5">
          <button className="bg-gradient-to-r from-[#4D93F6] to-[#AA26B6] w-full text-white font-bold py-2 px-4 rounded-md mx-auto">
            Create Voice
          </button>
        </div>
      </section>
      <section className="md:col-span-2 w-full p-5">
        <div className="max-w-full bg-gradient-to-r from-[#4d93f660] to-[#aa26b670] rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1500099817043-86d46000d58f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&h=250&q=80"
              className="object-cover w-full h-52"
              alt="Album Cover"
            />
            <div className="absolute p-4 inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-gray-900 backdrop backdrop-blur-5 text-white">
              <h3 className="font-bold">Super Artist</h3>
              <span className="opacity-70">Albumtitle</span>
            </div>
          </div>
          <div>
            <div className="relative h-1 bg-gray-200">
              <div
                className="absolute h-full"
                style={{
                  width: `${(currentTime / duration) * 100}%`,
                  background: "linear-gradient(to right, #4D93F6, #AA26B6)",
                }}
              >
                {/* <div className="rounded-full w-3 h-3 bg-white shadow"></div> */}
              </div>
            </div>
          </div>
          <div className="flex justify-between text-xs font-semibold text-gray-500 px-4 py-2">
            <div>{formatTime(currentTime)}</div>
            <div className="flex space-x-3 p-2">
              <button
                className="focus:outline-none"
                onClick={() => (audioRef.current.currentTime -= 10)}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="19 20 9 12 19 4 19 20"></polygon>
                  <line x1="5" y1="19" x2="5" y2="5"></line>
                </svg>
              </button>
              <button
                className="rounded-full w-8 h-8 flex items-center justify-center pl-0.5 ring-2 ring-gray-500 focus:outline-none"
                onClick={togglePlayPause}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {isPlaying ? (
                    <rect x="6" y="4" width="4" height="16"></rect>
                  ) : (
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  )}
                  {isPlaying && (
                    <rect x="14" y="4" width="4" height="16"></rect>
                  )}
                </svg>
              </button>
              <button
                className="focus:outline-none"
                onClick={() => (audioRef.current.currentTime += 10)}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 4 15 12 5 20 5 4"></polygon>
                  <line x1="19" y1="5" x2="19" y2="19"></line>
                </svg>
              </button>
            </div>
            <div>{formatTime(duration)}</div>
          </div>
          <ul className="text-xs sm:text-base border-t cursor-default">
            <li className="flex items-center space-x-3 py-2 bg-gradient-to-r from-[#4D93F6] to-[#AA26B6]">
              <div className="flex-1 pl-2">Artist - Title</div>
              <div className="text-xs text-gray-400">2:58</div>
              <button className="focus:outline-none pr-4 group">
                <svg
                  className="w-4 h-4 group-hover:text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                </svg>
              </button>
            </li>
          </ul>
          <audio
            ref={audioRef}
            src="http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race1.ogg"
          ></audio>
        </div>
      </section>
    </div>
  );
}
