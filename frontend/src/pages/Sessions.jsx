import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import sess from "/assets/session.png";
import sess2 from "/assets/session2.png";
import sess3 from "/assets/session3.png";
import sess4 from "/assets/session4.png";

export default function Sessions() {
  const { token } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [therapistName, setTherapistName] = useState("");
  const [type, setType] = useState("Video");
  const [duration, setDuration] = useState(60);
  const [date, setDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 4));
  const [selectedDate, setSelectedDate] = useState(4);

  // States for success/error messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const recommendedSessions = [
    {
      id: 1,
      title: "Coping with Stress",
      description: "Learn techniques to handle stress effectively.",
      image: sess,
    },
    {
      id: 2,
      title: "Managing Anxiety",
      description: "Strategies for managing anxiety and panic.",
      image: sess3,
    },
    {
      id: 3,
      title: "Building Self-Esteem",
      description: "Build self-confidence and self-worth.",
      image: sess2,
    },
    {
      id: 4,
      title: "Building Self-Esteem",
      description: "Build self-confidence and self-worth.",
      image: sess4,
    },
  ];

  const upcomingSessions = [
    // {
    //   id: 1,
    //   title: "Individual Therapy",
    //   date: "Jul 15, 2024 - 10:00 AM",
    //   status: "Join",
    // },
  ];

  const pastSessions = [
    {
      id: 1,
      title: "Group Therapy",
      date: "Jul 10, 2024 - 3:00 AM",
      status: "Reschedule",
    },
    {
      id: 2,
      title: "Couples Therapy",
      date: "Jul 8, 2024 - 4:00 AM",
      status: "Reschedule",
    },
  ];

  useEffect(() => {
    if (token) {
      fetchSessions();
    }
  }, [token]);

  const fetchSessions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sessions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessions(response.data);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await axios.post(
        "http://localhost:5000/api/sessions",
        { therapistName, type, duration, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Show success message inside form
      setSuccessMessage("Session booked successfully!");

      // Auto hide after 5 seconds
      setTimeout(() => setSuccessMessage(""), 2000);

      // Reset form
      setTherapistName("");
      setType("Video");
      setDuration(60);
      setDate("");

      // Refresh sessions
      fetchSessions();
    } catch (err) {
      console.error("Failed to create session:", err);
      const msg =
        err.response?.data?.message ||
        "Failed to book session. Please try again.";

      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const renderCalendar = (date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDay = getFirstDayOfMonth(date);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-center"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = i === selectedDate;
      days.push(
        <div
          key={i}
          onClick={() => setSelectedDate(i)}
          className={`text-center py-2 rounded cursor-pointer transition ${
            isSelected
              ? "bg-green-500 text-white font-bold"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <Layout>
      <div className="min-h-screen p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#0D1C14] text-2xl md:text-3xl font-bold mb-2 mt-[30px] pl-[20px]">
            Therapy Sessions
          </h1>
          <p className="text-sm md:text-base text-[#618A75] pl-[20px]">
            Manage your therapy sessions and schedule
          </p>
        </div>

        {/* Recommended Sessions */}
        <div className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-[#0D1C14] mb-4">
            Recommended Sessions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedSessions.map((session) => (
              <div key={session.id} className="rounded-lg overflow-hidden">
                <div className="w-full overflow-hidden rounded-lg">
                  <img
                    src={session.image}
                    alt={session.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="">
                  <h3 className="font-semibold text-[#0D1C14] text-sm mb-2 font-manrope mt-[20px]">
                    {session.title}
                  </h3>
                  <p className="text-xs text-[#4D9973] font-manrope">
                    {session.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Section */}
        <div className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-[#0D1C14] mb-4">
            Schedule
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 hover:bg-gray-100 rounded transition"
                >
                  <ChevronLeft size={20} className="text-[#121714]" />
                </button>
                <h3 className="font-semibold text-[#121714] text-center">
                  {monthName}
                </h3>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-gray-100 rounded transition"
                >
                  <ChevronRight size={20} className="text-[#121714]" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <div
                    key={day}
                    className="font-semibold text-[#121714] text-sm"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {renderCalendar(currentMonth)}
              </div>
            </div>

            {/* Book New Session Form */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-[#0D1C14] mb-4">
                Book New Session
              </h3>

              {/* Success Message - Form ke bilkul upar */}
              {successMessage && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg text-sm font-medium text-center">
                  {successMessage}
                </div>
              )}

              {/* Error Message - Form ke bilkul upar */}
              {errorMessage && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg text-sm font-medium text-center">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Therapist Name
                  </label>
                  <input
                    type="text"
                    value={therapistName}
                    onChange={(e) => setTherapistName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Dr. Smith"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>Video</option>
                    <option>Phone</option>
                    <option>In-Person</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (min)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
                >
                  Book Session
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-[#121714] mb-4">
            Upcoming Sessions
          </h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-6 border-b transition"
              >
                <div className="flex items-start gap-4 mb-4 md:mb-0">
                  <div>
                    <p className="font-semibold text-[#121714] text-sm md:text-base">
                      {session.title}
                    </p>
                    <p className="text-xs md:text-sm text-[#618A75]">
                      {session.date}
                    </p>
                  </div>
                </div>
                <button className="w-full md:w-auto bg-green-50 hover:bg-green-100 text-green-700 px-6 py-2 rounded text-sm font-medium transition">
                  {session.status}
                </button>
              </div>
            ))}

            {sessions
              .filter((s) => s.status === "Scheduled")
              .map((session) => (
                <div
                  key={session._id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-6 border-b hover:bg-gray-50 transition"
                >
                  <div className="flex items-start gap-4 mb-4 md:mb-0">
                    <div>
                      <p className="font-semibold text-[#121714] text-sm md:text-base">
                        {session.therapistName}
                      </p>
                      <p className="text-xs md:text-sm text-[#618A75]">
                        {new Date(session.date).toLocaleString()} -{" "}
                        {session.type} ({session.duration}min)
                      </p>
                    </div>
                  </div>
                  <button className="w-full md:w-auto bg-green-50 hover:bg-green-100 text-green-700 px-6 py-2 rounded text-sm font-medium transition">
                    Join
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Past Sessions */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-[#121714] mb-4">
            Past Sessions
          </h2>

          <div className="bg-[#F7FCFA] rounded-lg overflow-hidden">
            {pastSessions.map((session) => (
              <div
                key={session.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-6"
              >
                <div className="flex items-start gap-4 bg-[#E8F2ED]">
                  <div>
                    <p className="font-semibold text-[#121714] text-sm md:text-base">
                      {session.title}
                    </p>
                    <p className="text-xs md:text-sm text-[#618A75]">
                      {session.date}
                    </p>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 w-full md:w-auto px-4 py-2 min-w-[110px] bg-[#E8F2ED] hover:bg-gray-200 rounded-lg text-sm font-medium transition">
                  {session.status}
                </button>
              </div>
            ))}

            {sessions
              .filter((s) => s.status === "Completed")
              .map((session) => (
                <div
                  key={session._id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div>
                      <p className="font-semibold text-[#121714] text-sm md:text-base">
                        {session.therapistName}
                      </p>
                      <p className="text-xs md:text-sm text-[#618A75]">
                        {new Date(session.date).toLocaleString()} -{" "}
                        {session.type}
                      </p>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 w-full md:w-auto px-4 py-2 min-w-[110px] bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition">
                    Reschedule
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
