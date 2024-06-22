"use client";
import { useState } from "react";

export default function CreateVoice() {
  const [toggle, setToggle] = useState(false);
  const [voiceDescription, setVoiceDescription] = useState("");
  const [lyrics, setLyrics] = useState("");

  return (
    <div className="border grid grid-cols-1 md:grid-cols-3">
      <section className="border">
      <div className="flex justify-center items-center max-w-[180px] my-4">
          <span className="relative">
            <input
              id="Toggle1"
              type="checkbox"
              className="hidden peer"
              checked={toggle}
              onChange={() => setToggle(!toggle)}
            />
            <div className={`w-10 h-6 rounded-full shadow-inner ${toggle ? 'bg-violet-600' : 'bg-gray-600'}`}></div>
            <div className={`absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow transform transition-transform ${toggle ? 'translate-x-full bg-gray-100' : 'bg-gray-100'}`}></div>
          </span>
          <span className="font-serif font-semibold text-lg ml-2">Custom</span>
        </div>
        <div className="relative p-5">
          <h2 className="font-bold mb-1 text-gray-700 block">Voice Description</h2>
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
      </section>
    </div>
  );
}
