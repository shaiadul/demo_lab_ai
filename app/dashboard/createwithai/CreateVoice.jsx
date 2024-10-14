"use client";
import Loading from "@/components/loading/Loding";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

export default function CreateVoice() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lyrics, setLyrics] = useState("");
  const [isInstrumental, setIsInstrumental] = useState(true);
  const [loading, setLoading] = useState(false);
  const [audioUrls, setAudioUrls] = useState("");
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [auto, setAuto] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () =>
        setCurrentTime(audioRef.current.currentTime);
      audioRef.current.onloadedmetadata = () =>
        setDuration(audioRef.current.duration);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let apiUrl = "";
    let requestData = {};
    const formData = new FormData(e.target);

    const title = formData.get("title");
    if (title && tags) {
      // Manual mode
      apiUrl = "https://api.demolab.app/generate_music/";
      requestData = {
        prompt: lyrics, 
        tags: tags, 
        title: title, 
        make_instrumental: isInstrumental,
      };
    } else {
      // Auto mode
      apiUrl = "https://api.demolab.app/generate_gpt/";
      requestData = {
        prompt: lyrics, 
        make_instrumental: isInstrumental,
      };
    }

    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer 0ed0c56229ea4609a164084f2250a9dd`, 
        },
      });
      setLoading(false);
      console.log("Voice generated:", response.data);
      setAudioUrls(response?.data);
    } catch (error) {
      setLoading(false);
      console.error("Error generating voice:", error);
    }
  };


  return (
    <section>
      {loading && <Loading />}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-5 ${
          loading ? "hidden" : ""
        }`}
      >
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mx-5">
              <div className="flex justify-center items-center max-w-[220px] my-4">
                <label className="switch">
                  <input
                    type="checkbox"
                    id="instrumental"
                    checked={isInstrumental}
                    onChange={() => setIsInstrumental(!isInstrumental)}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="font-serif font-semibold text-lg ml-2">
                  Instrumental
                </span>
              </div>

              <div className="flex justify-center items-center max-w-[220px] my-4">
                <label className="switch">
                  <input
                    type="checkbox"
                    id="auto"
                    checked={auto}
                    onChange={() => setAuto(!auto)}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="font-serif font-semibold text-lg ml-2">
                  {auto ? "Auto" : "Manual"}
                </span>
              </div>
            </div>

            {!auto && (
              <div>
                <div className="relative p-5">
                  <h2 className="font-bold mb-1 text-gray-700 block">Title</h2>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter a title for your song"
                    className="block w-full mt-1 py-2 px-3 rounded-md shadow-sm focus:outline-none bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white dark:bg-gray-800"
                  />
                </div>
                <div className="relative px-5">
                  <h2 className="font-bold mb-1 text-gray-700 block">Tags</h2>
                  <div className=" w-full mt-1 py-2 px-3 rounded-md shadow-sm focus:outline-none bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white dark:bg-gray-800 flex flex-wrap items-center">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-2 py-1 rounded-md mr-2 mb-2"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          className="ml-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                          onClick={() => removeTag(index)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="bg-transparent text-md flex-grow border-none focus:outline-none dark:text-white dark:bg-gray-800"
                      placeholder="Type and press Enter"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {/* Output: {tags.join(", ")} */}
                  </p>
                </div>
              </div>
            )}

            <div className="relative p-5">
              <h2 className="font-bold mb-1 text-gray-700 block">{auto ? "Prompt" : "Lyrics"}</h2>
              <textarea
                rows="8"
                maxLength="600"
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                className="block w-full mt-1 py-2 px-3 rounded-md shadow-sm focus:outline-none bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white dark:bg-gray-800"
              ></textarea>
              <span className="absolute px-2 py-1 text-xs font-serif text-white bg-gradient-to-r from-[#4D93F6] to-[#AA26B6] rounded right-5 bottom-5">
                {600 - lyrics.length}
              </span>
            </div>

            <div className="mx-5 mb-5">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#4D93F6] to-[#AA26B6] w-full text-white font-bold py-2 px-4 rounded-md mx-auto"
              >
                {loading ? "Generating..." : "Generate Voice"}
              </button>
            </div>
          </form>
        </div>
        {audioUrls?.length > 0 ? (
          <div className="md:col-span-2 w-full p-5">
            <div className="max-w-full bg-gradient-to-r from-[#4d93f660] to-[#aa26b670] rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={audioUrls[0]?.image_url}
                  className="object-cover w-full h-52"
                  alt="Album Cover"
                />
                <div className="absolute p-4 inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-gray-900 backdrop backdrop-blur-5 text-white">
                  <h3 className="font-bold">{audioUrls[0]?.title}</h3>
                  <span className="opacity-70">{audioUrls[0]?.tags}</span>
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
                  ></div>
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
                src={audioUrls[1]?.audio_url}
                className="w-full h-0"
                controls
              ></audio>
            </div>
          </div>
        ) : (
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-[#4D93F6] to-[#AA26B6] text-xl font-serif font-bold text-center py-5 md:col-span-2 max-w-xl flex justify-center items-center mx-auto">
            Our AI music generator simplifies the creative process, perfect for
            both seasoned songwriters and beginners. Just write your
            lyrics—whether it’s a love song, rap, or pop chorus—and let the AI
            handle any genre. You can then choose to include an instrumental
            track or keep it vocal-only, giving you complete control over your
            musical creation.
          </div>
        )}
      </div>
    </section>
  );
}
