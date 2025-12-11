"use client";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";

export default function Home() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    if (token) fetchUser();
  }, [token]);

  return (
    <Layout>
      <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
        {/* Welcome Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || "Sophia"}
          </h1>
        </div>

        {/* Your Wellness Overview */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Your Wellness Overview
          </h2>

          {/* Profile Card */}
          <div className="bg-white rounded-xl p-4 mb-6 flex items-center gap-4">
            {/* <div className="w-16 h-16 rounded-full  flex items-center justify-center overflow-hidden">
              <img
                src="/assets/avatar.svg"
                alt="Sophia"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div> */}
            <div>
              <h3 className="font-semibold text-gray-900">Sophia</h3>
              <p className="text-sm text-gray-500">Current Status: Balanced</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-[#121714] mb-1">Stress Level</p>
              <p className="text-2xl font-bold text-[#121714]">Low</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-[#121714] mb-1">Anxiety Score</p>
              <p className="text-2xl font-bold text-[#121714]">Moderate</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-[#121714] mb-1">Mood Score</p>
              <p className="text-2xl font-bold text-[#121714]">7/10</p>
            </div>
          </div>
        </div>

        {/* Recommended Therapy Sessions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recommended Therapy Sessions
          </h2>

          <div className="bg-white mt-[50px] p-4 flex flex-col md:flex-row -ml-[15px] items-center -space-x-4">
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-1">
                Based on your assessment
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Cognitive Behavioral Therapy (CBT)
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Learn to identify and change negative thought patterns
              </p>
              <button className="bg-[#F0F5F2] px-4 py-2 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                Start Session
              </button>
            </div>
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center flex-shrink-0">
              <img
                src="assets/session.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Sessions
          </h2>

          <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                📅
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Thursday, 2 PM</p>
                <p className="text-sm text-gray-500">Next session</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 mb-2">
              Session Progress
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-900 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-600">60%</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-wrap  #F0F5F2 justify-between">
            <button
              onClick={() => navigate("/chat")}
              className="bg-[#2BED8C] hover:bg-green-600 text-black px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Chat with AI Therapist
            </button>
            <button className="bg-[#F0F5F2] border  hover:bg-gray-50 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors ">
              Mood Check-in
            </button>
          </div>
        </div>

        {/* Saved Items */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#121714] mb-4">
            Saved Items
          </h2>

          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F0F5F2] rounded-lg flex items-center justify-center">
                <img
                  src="assets/svg.svg"
                  alt="Breathing Exercise Icon"
                  className="w-6 h-6"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#121714]">
                  Breathing Exercise
                </p>
                <p className="text-sm text-gray-500">Last Saved</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F0F5F2] rounded-lg flex items-center justify-center">
                📝
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#121714]">Journal Entry</p>
                <p className="text-sm text-gray-500">Last Entry</p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Tips */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Daily Tips
          </h2>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-sm text-gray-700">
              Practice mindfulness for 5 minutes today. Focus on your breath and
              surroundings.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
