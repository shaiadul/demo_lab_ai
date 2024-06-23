"use client";
import React, { useEffect } from "react";
import Offering from "./components/OfferingCard";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/components/authprovider/AuthContext";
import { motion } from "framer-motion";

const PersonalFeed = () => {
  const router = useRouter();
  const { user } = UserAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { localStorage } = window;
      const guard = localStorage.getItem("token");
      if (!guard && !user) {
        router.push("/authentication/signin");
      }
    }
  }, []);

  return (
    <section className="mx-5 my-10">
      <div class="relative  w-full h-36 bg-white rounded-lg shadow-lg overflow-hidden mb-32">
        <div class="absolute inset-0 rounded-lg overflow-hidden bg-red-200">
          <img
            src="https://images.unsplash.com/photo-1543794327-59a91fb815d1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=200&q=80"
            alt=""
          />
          <div class="absolute inset-0 backdrop backdrop-blur-10 bg-gradient-to-b from-transparent to-black"></div>
        </div>
        <div class="absolute flex space-x-6 transform translate-x-6 translate-y-8">
          <div class="w-36 h-36 rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1543794327-59a91fb815d1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
              alt=""
            />
          </div>
          <div class="text-white pt-12">
            <h3 class="font-bold">Album</h3>
            <div class="text-sm opacity-60">Super Interpret</div>
            <div class="mt-8 text-gray-400">
              <div class="flex items-center space-x-2 text-xs">
                <svg
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                </svg>
                <span>Easy listening</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <motion.span
        initial={{ opacity: 0, scale: 0.9, y: "100%" }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="bg-clip-text text-4xl font-bold text-transparent bg-gradient-to-r from-[#FD5261] to-[#AA26B6]"
      >
        Featured Model
      </motion.span>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10">
        <Offering />
        <Offering />
        <Offering />
        <Offering />
      </div>
    </section>
  );
};

export default PersonalFeed;
