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
    const id = user?.user?._id;
    const token = user?.accessToken;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const formdata = new FormData();
    formdata.append("userId", id);
    formdata.append("file", file, file["name"]);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://api.shardmind.io/api/v1/storage/upload?file", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCurrentStep(2);
        setIsFileUploaded(true);

        const originalFileName = result?.result?.originalFilename;
        const url = `users/${id}/${originalFileName}`;
        const data = JSON.stringify({
          auth_token: token,
          url,
        });

        const parsedData = JSON.parse(data);

        setCurrentFileUrl(parsedData?.url);
        setLoading(false);
        handleApiCall(parsedData?.url);
      });
  };

  const handleApiCall = async (url) => {
    setLoading(true);
    console.log("handleApiCallingg,,,,,,,,,,,,,,,,");

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user?._id;
    const authToken = user?.accessToken;

    const postData = {
      url: url,
      auth_token: authToken,
      userId: userId,
    };

    console.log("postData", postData);

    if (url) {
      const response = await axios.post(
        "https://38wta.apps.beam.cloud/music_sep",
        postData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("music_sep response", response?.data?.voice_urls);
      setComplete(true);
      setLoading(false);
      if (response?.data?.voice_urls) {
        const voiceUrls = response?.data?.voice_urls;
        const allUrls = [];

        const promises = voiceUrls.map(async (voiceUrl) => {
          const fileKey = voiceUrl;
          const urlsLink = await readFile(fileKey);
          allUrls.push(urlsLink);
          return urlsLink;
        });

        const playedUrls = await Promise.all(promises);
        setAllUrls(playedUrls);
      }
    }
  };

  console.log("all rul: ", allUrls);

  const readFile = async (fileKey) => {
    setLoading(true);
    const client = new S3Client({
      region: "nyc3",
      credentials: {
        accessKeyId: "DO00E62JWRAHTAANAADR",
        secretAccessKey: "Z5ICzGAlMg/7B3WTAUzAbPy9SX910ZrrVovadJjc98s",
      },
      endpoint: "https://nyc3.digitaloceanspaces.com",
    });

    const command = new GetObjectCommand({
      Bucket: "shardmind.ai",
      Key: fileKey,
    });

    try {
      const url = await getSignedUrl(client, command, { expiresIn: 3600 });
      console.log("Signed URL:", url);
      setCurrentFileUrl(url);
      setLoading(false);
      return url; // The URL is valid for 1 hour
    } catch (error) {
      console.error("Error from download:", error);
      setLoading(false);
    }
  };

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
      {loading && <Loading />}
      {currentFileUrl ? (
        <>
          {allUrls.map((url, index) => {
            return <MusicPlayer key={index} url={url} />;
          })}
        </>
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
