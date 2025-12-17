import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Plus, X, Pencil, Trash2, Loader2 } from "lucide-react";

const JournalPage = () => {
  const { token } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // Editing states
  const [editingEntry, setEditingEntry] = useState(null);

  // Notification states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch entries from backend
  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/journal", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(response.data);
    } catch (err) {
      setError("Failed to fetch journal entries.");
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEntries();
    }
  }, [token]);

  const clearForm = () => {
    setNewTitle("");
    setNewContent("");
    setEditingEntry(null);
    setShowForm(false);
    setError("");
  };

  const showSuccessMessage = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 2000);
  };

  // Handle Create and Update
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      setError("Title and content cannot be empty.");
      return;
    }

    const entryData = { title: newTitle, content: newContent };

    try {
      if (editingEntry) {
        await axios.put(
          `http://localhost:5000/api/journal/${editingEntry._id}`,
          entryData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        showSuccessMessage("Entry updated successfully!");
      } else {
        // Create new entry
        await axios.post("http://localhost:5000/api/journal", entryData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showSuccessMessage("New entry added successfully!");
      }
      clearForm();
      fetchEntries();
    } catch (err) {
      setError(`Failed to ${editingEntry ? "update" : "save"} entry.`);
      console.error("Submit error:", err);
    }
  };

  // Handle Delete
  const handleDeleteEntry = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await axios.delete(`http://localhost:5000/api/journal/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showSuccessMessage("Entry deleted successfully!");
        fetchEntries();
      } catch (err) {
        setError("Failed to delete entry.");
        console.error("Delete error:", err);
      }
    }
  };

  // Handle Edit button click
  const handleEditClick = (entry) => {
    setEditingEntry(entry);
    setNewTitle(entry.title);
    setNewContent(entry.content);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto ">
          <div className="flex justify-between items-center mb-8 mt-4 md:mt-6">
            <div>
              <h1 className="text-[#0D1C14] text-2xl md:text-3xl font-bold mb-2">
                My Journal
              </h1>
              <p className="text-sm md:text-base text-[#618A75]">
                Reflect on your thoughts, feelings, and progress.
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className={`flex items-center gap-2 font-medium px-4 py-2 rounded-lg transition-colors ${
                showForm
                  ? "bg-gray-200 text-gray-800 hover:bg-green-500"
                  : "bg-[#2BED8C] text-black "
              }`}
            >
              {showForm ? (
                <X size={20} />
              ) : (
                <>
                  <Plus size={20} />
                  <span className="hidden sm:inline  ">New Entry</span>
                </>
              )}
            </button>
          </div>

          {/* New Entry Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fade-in-down">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {editingEntry ? "Edit Journal Entry" : "Create a New Entry"}
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What's on your mind?"
                  />
                </div>
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    rows="5"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your thoughts and feelings..."
                  ></textarea>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={clearForm}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#2BED8C] text-black rounded-lg hover:bg-green-500"
                  >
                    {editingEntry ? "Update Entry" : "Save Entry"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Journal Entries List */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-green-500" size={40} />
            </div>
          ) : (
            <div className="space-y-6">
              {success && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
                  {success}
                </div>
              )}
              {entries.length === 0 && !showForm && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-700">
                    No journal entries yet.
                  </h3>
                  <p className="text-gray-500 mt-1">
                    Click "New Entry" to add your first thought.
                  </p>
                </div>
              )}
              {entries.map((entry) => (
                <div
                  key={entry._id}
                  className="bg-white rounded-lg shadow p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {entry.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(entry)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteEntry(entry._id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mt-2 whitespace-pre-wrap">
                    {entry.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JournalPage;
