import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";

export default function Profile() {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [therapyGoals, setTherapyGoals] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchUser();
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Validation: Check if all fields are empty
    if (!name.trim() && !bio.trim() && !therapyGoals.trim()) {
      setErrorMessage("Please fill at least one field to update your profile.");
      setLoading(false);
      return;
    }

    // Prepare update data - only include fields that have values
    const updateData = {};
    if (name.trim()) updateData.name = name.trim();
    if (bio.trim()) updateData.bio = bio.trim();
    if (therapyGoals.trim()) updateData.therapyGoals = therapyGoals.trim();

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage("Profile updated successfully!");

      // Input fields clear karein
      setName("");
      setBio("");
      setTherapyGoals("");

      // User data refresh karein (display ke liye)
      fetchUser();

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setErrorMessage("Failed to update profile. Please try again.");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-600">Loading...</div>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="relative inline-block mb-8  ml-[50px]">
          <span className="absolute -left-4 top-0 bottom-0 w-16 bg-yellow-300 -z-10 transform -skew-x-12"></span>
          <h1 className="text-3xl font-bold text-gray-900 relative">
            Your Profile
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
          {successMessage && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about yourself"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Therapy Goals
              </label>
              <textarea
                value={therapyGoals}
                onChange={(e) => setTherapyGoals(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What are your therapy goals?"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* Current Profile Info Display */}
        <div className="bg-white rounded-lg shadow p-6 max-w-2xl mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Current Profile Information
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {user.name || "Not set"}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Bio:</span> {user.bio || "Not set"}
            </p>
            <p>
              <span className="font-medium">Therapy Goals:</span>{" "}
              {user.therapyGoals || "Not set"}
            </p>
            <p>
              <span className="font-medium">Level:</span> {user.level}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
