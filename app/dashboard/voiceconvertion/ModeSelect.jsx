"use client";
import React, { useState } from "react";

export default function ModeSelect() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const data = {
    Singers: [
      { id: 1, title: "Singer 1", description: "Famous Singer 1" },
      { id: 2, title: "Singer 2", description: "Famous Singer 2" },
      { id: 3, title: "Singer 3", description: "Famous Singer 3" },
      { id: 4, title: "Singer 4", description: "Famous Singer 4" },
      { id: 5, title: "Singer 5", description: "Famous Singer 5" },
    ],
    Funny: [
      { id: 1, title: "Funny 1", description: "Hilarious Clip 1" },
      { id: 2, title: "Funny 2", description: "Hilarious Clip 2" },
      { id: 3, title: "Funny 3", description: "Hilarious Clip 3" },
      { id: 4, title: "Funny 4", description: "Hilarious Clip 4" },
      { id: 5, title: "Funny 5", description: "Hilarious Clip 5" },
    ],
    Other: [
      { id: 1, title: "Other 1", description: "Interesting Content 1" },
      { id: 2, title: "Other 2", description: "Interesting Content 2" },
      { id: 3, title: "Other 3", description: "Interesting Content 3" },
      { id: 4, title: "Other 4", description: "Interesting Content 4" },
      { id: 5, title: "Other 5", description: "Interesting Content 5" },
    ],
  };

  const handleClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <section className="">
        <div className="flex justify-center items-center mx-auto my-10">
          <button
            className="bg-gradient-to-r hover:bg-gradient-to-tr duration-700 from-[#4D93F6] to-[#AA26B6] px-10 py-3 rounded-md cursor-pointer"
            onClick={() => handleClick("Singers")}
          >
            <span>Singers</span>
          </button>
          <button
            className="bg-gradient-to-r hover:bg-gradient-to-tr duration-700 from-[#4D93F6] to-[#AA26B6] px-10 py-3 rounded-md cursor-pointer mx-10"
            onClick={() => handleClick("Funny")}
          >
            <span>Funny</span>
          </button>
          <button
            className="bg-gradient-to-r hover:bg-gradient-to-tr duration-700 from-[#4D93F6] to-[#AA26B6] px-10 py-3 rounded-md cursor-pointer"
            onClick={() => handleClick("Other")}
          >
            <span>Other</span>
          </button>
        </div>

        {selectedCategory && (
          <div className="flex flex-wrap justify-center">
            {data[selectedCategory].map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-r hover:bg-gradient-to-tr duration-700 from-[#4D93F6] to-[#AA26B6] shadow-lg rounded-lg p-5 m-2 w-1/4 cursor-pointer"
              >
                <h3 className="font-bold ">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
