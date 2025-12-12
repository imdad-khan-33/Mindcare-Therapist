"use client";

import { useContext, useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Chat() {
  const { token } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = "AIzaSyACd615lcSXCpUyLuZNKBT1ZUCqfYRPN_k";

  // ✅ Try different model endpoints
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userInput }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        throw new Error(
          errorData.error?.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.candidates && data.candidates[0]) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        const aiMessage = { role: "assistant", content: aiResponse };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error("No valid response from API");
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        role: "assistant",
        content: `I'm having trouble connecting right now. Error: ${error.message}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-4 sm:p-8 h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Therapist Chat
          </h1>
          <p className="text-gray-600 text-sm">
            Safe space to share your thoughts and feelings
          </p>
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <div className="text-6xl mb-4">🤖</div>
                <p className="text-xl font-semibold mb-2">
                  Welcome to AI Therapy
                </p>
                <p className="text-sm text-gray-400">
                  Start a conversation to get support
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-xs px-4 py-3 rounded-2xl bg-gray-100">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-3">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                "Send"
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
