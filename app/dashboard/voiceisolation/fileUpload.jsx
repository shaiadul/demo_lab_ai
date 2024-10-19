"use client";
import React, { useState, useEffect } from "react";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Loading from "@/components/loading/Loding";
import MusicPlayer from "./MusicPlayer";
import { fetchApi } from "@/utils/FetchApi";
import axios from "axios";

const ImageUpload = ({ setCurrentStep, setComplete }) => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [currentFileUrl, setCurrentFileUrl] = useState(null);
  const [allUrls, setAllUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setLoading(true);
    if (!file) return;
    const user = JSON.parse(localStorage.getItem("user"));

    const authToken = user?.access_token;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    const formdata = new FormData();
    formdata.append("data", file);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://api.demolab.app/upload_file", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCurrentStep(2);
        setIsFileUploaded(true);

        const file_key = result?.file_key;
        console.log("result: ", result);
        console.log("file_key", file_key);

        setLoading(false);
        // handleApiCall(file_key);
        handleMusicSeparator(file_key);
      });
  };

  const handleMusicSeparator = async (url) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const authToken = user?.access_token;
    const myHeaders = {
      Authorization: `Bearer ${authToken}`,
    };

    try {
      const response = await axios.post(
        "https://api.demolab.app/music_sep",
        {
          url: url,
        },
        { headers: myHeaders }
      );

      console.log("music_sep response", response);
      setComplete(true);
      if (response) {
        const voiceUrls = response?.data?.data?.voice_urls || [];

        setAllUrls(voiceUrls);
        readFiles(voiceUrls);
      }
    } catch (error) {
      console.error("Error during API call", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApiCall = async (url) => {
    setLoading(true);
    console.log("handleApiCallingg,,,,,,,,,,,,,,,,");

    const user = JSON.parse(localStorage.getItem("user"));
    const authToken = user?.access_token;
    const myHeaders = {
      Authorization: `Bearer ${authToken}`,
    };

    if (url) {
      try {
        const response = await axios.get(
          `https://api.demolab.app/read_file?file_key=${url}`,
          { headers: myHeaders }
        );

        console.log("music_sep response", response);
        setComplete(true);
        if (response) {
          const voiceUrls = response?.data;
          const allUrls = [];

          const promises = voiceUrls.map(async (voiceUrl) => {
            const fileKey = voiceUrl;
            const urlsLink = await readFile(fileKey);
            allUrls.push(urlsLink);
            return urlsLink;
          });

          const playedUrls = await Promise.all(promises);
          setAllUrls(response);
        }
      } catch (error) {
        console.error("Error during API call", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const readFiles = async (fileKeys) => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const authToken = user?.access_token;
    const myHeaders = {
      Authorization: `Bearer ${authToken}`,
    };

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const fetchPromises = fileKeys.map(async (fileKey) => {
        const fileUrl = `https://api.demolab.app/read_file?file_key=${fileKey}`;
        const response = await fetch(fileUrl, requestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.text();
        return result;
      });

      const results = await Promise.all(fetchPromises);
      const cleanedResults = results.map((url) => url.replace(/^"|"$/g, ""));
      console.log("Files content:", cleanedResults);
      setCurrentFileUrl(cleanedResults);
      setLoading(false);
    } catch (error) {
      console.error("Error from download:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  console.log("all rul: ", currentFileUrl);

  const downloadFile = async () => {
    // Fetch the file content
    const response = await fetch(currentFileUrl);
    const blob = await response.blob();

    // Create a link element and set its attributes
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "remove_bg.png";

    // Append the link to the body, trigger a click event, and remove the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="font-sans mt-20">
      {loading && (
        <div className="flex justify-center items-center h-full w-full bg-gray-900 bg-opacity-50 z-50 fixed top-0 left-0 right-0 both-screen">
          <Loading />
        </div>
      )}
      {currentFileUrl ? (
        <div
          className={`my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
            loading ? "hidden" : ""
          }`}
        >
          {currentFileUrl?.map((url, index) => (
            <div
              key={index}
              className="relative bg-[#311539] rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative w-full h-48 bg-gray-200">
                <div className="flex justify-center items-center h-full text-gray-500">
                  <span>No Image</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold">Uploaded File {index + 1}</h3>

                <audio controls className="w-full mt-2">
                  <source src={url} type="audio/mp3" />
                  Your browser does not support the audio tag.
                </audio>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <label
          htmlFor="dropzone-file"
          className={`mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border_gradient_purple p-6 text-center ${
            loading ? "hidden" : ""
          }`}
        >
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-[#AA26B6]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <h2 className="mt-4 text-xl font-medium text-gray-400 tracking-wide">
              Upload File
            </h2>
            <p className="mt-2 text-gray-500 tracking-wide">
              Upload or drag & drop your voice file.
            </p>

            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="audio/*"
              onChange={handleFileUpload}
            />
          </>
        </label>
      )}
    </div>
  );
};

export default ImageUpload;
