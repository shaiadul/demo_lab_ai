"use client";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStop,
  faVolumeMute,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const MusicPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const setAudioDuration = () => {
        setDuration(audio.duration);
      };

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", setAudioDuration);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", setAudioDuration);
      };
    }
  }, []);

  const playPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const stop = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const changeCurrentTime = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const muteSound = () => {
    const audio = audioRef.current;
    audio.volume = 0;
  };

  const unmuteSound = () => {
    const audio = audioRef.current;
    audio.volume = 1;
  };
  
  return (
    <div className="my-10">
      <div className="flex mx-auto justify-center max-w-xs rounded-full object-cover">
        <img
          className={`rounded-full ${
            isPlaying ? "animate-pulse duration-300" : ""
          }`}
          src="https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg"
          alt="music-icon"
        />
      </div>
      <h2 className="text-4xl font-semibold font-serif text-center my-5 bg-clip-text text-transparent bg-gradient-to-r from-[#4D93F6] to-[#AA26B6]">
        Vacation Music
      </h2>
      <p className="text-md font-semibold font-serif text-center mb-5 bg-clip-text text-transparent bg-gradient-to-r from-[#4D93F6] to-[#AA26B6]">
        Aso, Middle School, Aviino
      </p>
      <audio ref={audioRef} src={src}></audio>

      <div className="flex justify-center items-center my-4 space-x-4">
        <span className="font-serif font-semibold">{formatTime(duration)}</span>

        <input
          type="range"
          min="0"
          max={duration ? Math.floor(duration) : "0"}
          value={currentTime ? Math.floor(currentTime) : "0"}
          onChange={changeCurrentTime}
          className="w-full max-w-lg h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="font-serif font-semibold">
          {formatTime(currentTime)}
        </span>
      </div>
      <div className="flex justify-center space-x-4 my-4">
        <button
          type="button"
          onClick={playPause}
          className="focus:outline-none text-[#4D93F6]"
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="2x" />
        </button>
        <button
          type="button"
          onClick={stop}
          className="focus:outline-none text-[#4D93F6]"
        >
          <FontAwesomeIcon icon={faStop} size="2x" />
        </button>
        <button
          type="button"
          onClick={muteSound}
          className="focus:outline-none text-[#4D93F6]"
        >
          <FontAwesomeIcon icon={faVolumeMute} size="2x" />
        </button>
        <button
          type="button"
          onClick={unmuteSound}
          className="focus:outline-none text-[#4D93F6]"
        >
          <FontAwesomeIcon icon={faVolumeHigh} size="2x" />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
