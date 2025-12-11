"use client";

import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";

export default function Journal() {
  const { token } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("Calm");

  useEffect(() => {
    fetchEntries();
  }, [token]);

  const fetchEntries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/journal", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(response.data);
    } catch (err) {
      console.error("Failed to fetch entries:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/journal",
        { title, content, mood },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setContent("");
      setMood("Calm");
      fetchEntries();
    } catch (err) {
      console.error("Failed to create entry:", err);
    }
  };

  return (
    <Layout>
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Journal</h1>

        {/* New Entry Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Today's thoughts..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mood
              </label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option>Happy</option>
                <option>Sad</option>
                <option>Anxious</option>
                <option>Calm</option>
                <option>Angry</option>
                <option>Neutral</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32"
                placeholder="Write your thoughts..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
            >
              Save Entry
            </button>
          </form>
        </div>

        {/* Entries List */}
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{entry.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    {
                      Happy: "bg-yellow-100 text-yellow-800",
                      Sad: "bg-blue-100 text-blue-800",
                      Anxious: "bg-orange-100 text-orange-800",
                      Calm: "bg-green-100 text-green-800",
                      Angry: "bg-red-100 text-red-800",
                      Neutral: "bg-gray-100 text-gray-800",
                    }[entry.mood] || "bg-gray-100"
                  }`}
                >
                  {entry.mood}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{entry.content}</p>
              <p className="text-xs text-gray-500">
                {new Date(entry.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
