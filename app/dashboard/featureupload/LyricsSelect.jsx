"use client";
import React, { useEffect, useState } from "react";
import MusicPlayer from "./MusicPlayer";
import { fetchApi } from "@/utils/FetchApi";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Loading from "@/components/loading/Loding";
import axios from "axios";

export default function LyricsSelect({ url, setComplete }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modeData, setModeData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [playUrl, setPlayUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceDescription, setVoiceDescription] = useState("");
  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchApi("/list_vc_models", "GET");

        if (data) {
          setModeData(data);
          setLoading(false);
        } else {
          console.error("Error fetching mode data");
        }
      } catch (error) {
        console.error("Error fetching mode data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (category) => {
    setSelectedCategory(category);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item); // Store the selected item
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!selectedItem || !selectedCategory) {
      console.error("Please select a category and an item before submitting.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const authToken = user?.accessToken;
    const userId = user?.user?._id;

    const postData = {
      name: selectedItem,
      url: url,
      auth_token: authToken,
      userId: userId,
      lyrics: lyrics,
    };

    console.log("Submitting voice conversion data:", postData);

    try {
      const response = await axios.post(
        "https://38wta.apps.beam.cloud/audio_upload",
        postData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response) {
        console.log("API response:", response?.data?.npz_url);
        setLoading(false);
        setComplete(true);
        readFile(response?.data?.npz_url);
      } else {
        setLoading(false);
        console.error("Error submitting voice conversion data");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting voice conversion data:", error);
    }
  };

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
      console.log(url);
      setPlayUrl(url);
      setLoading(false);
      return url; // The URL is valid for 1 hour
    } catch (error) {
      console.error("error from download", error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="">
          <div className={`${playUrl ? "hidden" : ""}`}>
            <div className={`${selectedItem ? "hidden" : ""}`}>
              <div className="flex justify-center items-center mx-auto my-10">
                {Object.keys(modeData).map((category) => (
                  <button
                    key={category}
                    className={`bg-gradient-to-r hover:bg-gradient-to-tr duration-700 from-[#4D93F6] to-[#AA26B6] px-10 py-3 rounded-md cursor-pointer mx-2 ${
                      selectedCategory === category
                        ? "border-2 border-white"
                        : ""
                    }
                   `}
                    onClick={() => handleClick(category)}
                  >
                    <span>{category}</span>
                  </button>
                ))}
              </div>

              {selectedCategory && modeData[selectedCategory] && (
                <div className="flex flex-wrap justify-center">
                  {modeData[selectedCategory].map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleItemClick(item)} // Handle item click
                      className={`bg-gradient-to-r hover:bg-gradient-to-tr duration-700 from-[#4D93F6] to-[#AA26B6] shadow-lg rounded-lg p-5 m-2 w-1/4 cursor-pointer ${
                        selectedItem === item ? "border-2 border-white" : ""
                      }`}
                    >
                      <h3 className="font-bold">{item}</h3>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedItem && (
              <div className="relative p-5 w-[35rem] mx-auto">
                <h2 className="font-bold mb-1 text-gray-700 block">Lyrics</h2>
                <textarea
                  rows="8"
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  className="block w-full mt-1 py-2 px-3 rounded-md shadow-sm focus:outline-none bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white dark:bg-gray-800"
                ></textarea>
                <span className="absolute px-2 py-1 text-xs font-serif text-white bg-gradient-to-r from-[#4D93F6] to-[#AA26B6] rounded right-5 bottom-5">
                  {500 - lyrics.length}
                </span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex justify-center items-center mx-auto my-10"
            >
              <button
                type="submit"
                className="bg-clip-text text-transparent bg-gradient-to-r from-[#4D93F6] to-[#AA26B6] font-bold text-2xl px-10 py-2 rounded-md cursor-pointer border_gradient_purple"
              >
                Submit
              </button>
            </form>
          </div>

          <MusicPlayer playUrl={playUrl} />
        </section>
      )}
    </>
  );
}
