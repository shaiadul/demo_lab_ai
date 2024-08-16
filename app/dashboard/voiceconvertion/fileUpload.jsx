"use client";
import React, { useState, useEffect } from "react";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Loading from "@/components/loading/Loding";
import ModeSelect from "./ModeSelect";

const ImageUpload = ({ setCurrentStep, setComplete }) => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [currentFileUrl, setCurrentFileUrl] = useState(null);
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
      });
  };

  return (
    <div className="font-sans mt-20">
      {loading && <Loading />}

      {currentFileUrl ? (
        <>
          <ModeSelect url={currentFileUrl} setComplete={setComplete} />
        </>
      ) : (
        <label
          htmlFor="dropzone-file"
          className={`mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border_gradient_purple p-6 text-center ${
            loading ? "hidden" : "block"
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
