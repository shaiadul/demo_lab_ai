"use client";

import {
  faHeadphonesSimple,
  faHome,
  faRadio,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AsideDashboard = () => {
  const pathname = usePathname();

  return (
    <div className="fixed hidden md:flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 h-full transition-all duration-300 border-none z-10 sidebar ">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow ">
        <ul className="flex flex-col py-4 space-y-1 mt-10">
          <li>
            <Link
              href="/dashboard/personalfeed"
              className={` ${
                pathname == "/dashboard/personalfeed" ? "bg-[#1b1c20]" : ""
              } relative flex flex-row items-center h-11 focus:outline-none text-white-600 hover:text-white-800 pr-6 rounded-md`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FontAwesomeIcon
                  icon={faHome}
                  className={` w-5 h-5 ${
                    pathname == "/dashboard/personalfeed"
                      ? "text-[#4D93F6]"
                      : "text-gray"
                  }`}
                />
              </span>
              <span
                className={`ml-2 text-md font-semibold tracking-wide truncate ${
                  pathname == "/dashboard/personalfeed"
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-[#4D93F6] to-[#AA26B6]"
                    : ""
                }`}
              >
                Personal Feed
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/voiceisolation"
              className={`${
                pathname == "/dashboard/voiceisolation" ? "bg-[#1b1c20]" : ""
              } relative flex flex-row items-center h-11 focus:outline-none text-white-600 hover:text-white-800 pr-6 rounded-md`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FontAwesomeIcon
                  icon={faRadio}
                  className={` w-5 h-5 ${
                    pathname == "/dashboard/voiceisolation"
                      ? "text-[#4D93F6]"
                      : "text-gray"
                  }`}
                />
              </span>
              <span
                className={`ml-2 text-md font-semibold tracking-wide truncate ${
                  pathname == "/dashboard/voiceisolation"
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-[#4D93F6] to-[#AA26B6]"
                    : ""
                }`}
              >
                Voice Isolation
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/createwithai"
              className={`${
                pathname == "/dashboard/createwithai" ? "bg-[#1b1c20]" : ""
              } relative flex flex-row items-center h-11 focus:outline-none text-white-600 hover:text-white-800 pr-6 rounded-md`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FontAwesomeIcon
                  icon={faHeadphonesSimple}
                  className={` w-5 h-5 ${
                    pathname == "/dashboard/createwithai"
                      ? "text-[#4D93F6]"
                      : "text-gray"
                  }`}
                />
              </span>
              <span
                className={`ml-2 text-md font-semibold tracking-wide truncate ${
                  pathname == "/dashboard/createwithai"
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-[#4D93F6] to-[#AA26B6]"
                    : ""
                }`}
              >
                Voice Generate
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AsideDashboard;
