import React, { useState } from "react";
import Layout from "../components/Layout";
import axiosInstance from "../api/axiosConfig";

const ExercisesPage = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTherapistModalOpen, setIsTherapistModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    concern: "",
    preferredTime: "",
  });

  const exercises = [
    {
      id: 1,
      title: "Diaphragmatic Breathing",
      description:
        "Practice deep, mindful breathing to reduce stress and promote relaxation.",
      gradient: "from-blue-100 to-indigo-100",
      icon: "🫁",
      duration: "5-10 minutes",
      steps: [
        "Sit or lie down in a comfortable position",
        "Place one hand on your chest and the other on your belly",
        "Breathe in slowly through your nose, feeling your belly rise",
        "Exhale slowly through your mouth, feeling your belly fall",
        "Repeat for 5-10 minutes, focusing on deep belly breaths",
      ],
      benefits: [
        "Reduces stress and anxiety",
        "Lowers blood pressure",
        "Improves focus and concentration",
      ],
    },
    {
      id: 2,
      title: "Box Breathing",
      description:
        "A technique involving equal intervals of inhale, hold, exhale, and hold to calm the nervous system.",
      gradient: "from-purple-100 to-pink-100",
      icon: "⬜",
      duration: "5 minutes",
      steps: [
        "Sit comfortably with your back straight",
        "Inhale through your nose for 4 counts",
        "Hold your breath for 4 counts",
        "Exhale through your mouth for 4 counts",
        "Hold your breath again for 4 counts",
        "Repeat this cycle for 5 minutes",
      ],
      benefits: [
        "Calms nervous system",
        "Improves mental clarity",
        "Reduces stress response",
      ],
    },
    {
      id: 3,
      title: "Mindfulness Meditation",
      description:
        "Focus on the present moment to cultivate awareness and reduce anxiety.",
      gradient: "from-green-100 to-emerald-100",
      icon: "🧘",
      duration: "10-20 minutes",
      steps: [
        "Find a quiet, comfortable space to sit",
        "Close your eyes and focus on your breath",
        "Notice thoughts without judgment, let them pass",
        "Gently return focus to your breath when mind wanders",
        "Continue for 10-20 minutes",
      ],
      benefits: [
        "Reduces anxiety and depression",
        "Improves emotional regulation",
        "Enhances self-awareness",
      ],
    },
    {
      id: 4,
      title: "Guided Imagery",
      description:
        "Use visualization to create a peaceful mental space and promote relaxation.",
      gradient: "from-amber-100 to-orange-100",
      icon: "🌅",
      duration: "10-15 minutes",
      steps: [
        "Sit or lie down in a comfortable position",
        "Close your eyes and take deep breaths",
        "Visualize a peaceful place (beach, forest, mountains)",
        "Engage all senses - what do you see, hear, smell, feel?",
        "Stay in this peaceful place for 10-15 minutes",
      ],
      benefits: [
        "Promotes deep relaxation",
        "Reduces physical tension",
        "Improves mood and outlook",
      ],
    },
    {
      id: 5,
      title: "Gratitude Journaling",
      description:
        "Reflect on things you are grateful for to boost mood and foster positivity.",
      gradient: "from-rose-100 to-red-100",
      icon: "📔",
      duration: "5-10 minutes",
      steps: [
        "Find a quiet moment in your day",
        "Write down 3-5 things you're grateful for",
        "Be specific and detailed about why you're grateful",
        "Reflect on how these things make you feel",
        "Make this a daily practice",
      ],
      benefits: [
        "Boosts mood and happiness",
        "Improves sleep quality",
        "Enhances overall well-being",
      ],
    },
  ];

  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Ahmed",
      specialization: "Anxiety & Stress Management",
      experience: "12 years",
      rating: 4.9,
      reviews: 156,
      available: true,
      image: "👩‍⚕️",
      fees: "$80/session",
      about:
        "Specialized in cognitive behavioral therapy with focus on anxiety disorders.",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Depression & Mood Disorders",
      experience: "10 years",
      rating: 4.8,
      reviews: 203,
      available: true,
      image: "👨‍⚕️",
      fees: "$75/session",
      about:
        "Expert in treating depression using evidence-based therapeutic approaches.",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialization: "Trauma & PTSD",
      experience: "15 years",
      rating: 5.0,
      reviews: 189,
      available: false,
      image: "👩‍⚕️",
      fees: "$90/session",
      about:
        "Trauma-informed therapist specializing in EMDR and somatic therapy.",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialization: "Relationship & Family Therapy",
      experience: "8 years",
      rating: 4.7,
      reviews: 134,
      available: true,
      image: "👨‍⚕️",
      fees: "$85/session",
      about:
        "Helping couples and families build stronger, healthier relationships.",
    },
  ];

  const openModal = (exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
    setTimeout(() => setSelectedExercise(null), 300);
  };

  const openTherapistModal = () => {
    setIsTherapistModalOpen(true);
    setBookingStep(1);
    document.body.style.overflow = "hidden";
  };

  const closeTherapistModal = () => {
    setIsTherapistModalOpen(false);
    setBookingStep(1);
    setSelectedTherapist(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      concern: "",
      preferredTime: "",
    });
    document.body.style.overflow = "unset";
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    setBookingStep(bookingStep + 1);
  };

  const handleSelectTherapist = (therapist) => {
    setSelectedTherapist(therapist);
    setBookingStep(3);
  };

  const handleBookingConfirm = async () => {
    try {
      if (!selectedTherapist) return;
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        concern: formData.concern,
        preferredTime: formData.preferredTime,
        therapist: {
          id: selectedTherapist.id,
          name: selectedTherapist.name,
          specialization: selectedTherapist.specialization,
          fees: selectedTherapist.fees,
          rating: selectedTherapist.rating,
          experience: selectedTherapist.experience,
        },
      };

      const res = await axiosInstance.post("/api/bookings", payload);
      if (res.status === 201) {
        alert("Booking confirmed! A confirmation email will be sent.");
        closeTherapistModal();
      } else {
        alert("Could not confirm booking. Please try again.");
      }
    } catch (err) {
      console.error("Booking error", err);
      alert("Server error while booking. Please try again later.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header */}
          <div className="mb-10 sm:mb-14  ml-[50px]">
            <h1 className="  text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Wellness Exercises
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
              Explore a variety of exercises designed to support your mental
              wellness journey
            </p>
          </div>

          {/* Exercises Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="group bg-gray-100 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:scale-105"
              >
                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {exercise.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                  {exercise.description}
                </p>
                <p className="text-sm text-gray-500 mb-6 sm:mb-8">
                  ⏱️ Duration: {exercise.duration}
                </p>

                {/* Button */}
                <button
                  onClick={() => openModal(exercise)}
                  className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-gray-800 hover:px-10"
                >
                  Start Exercise →
                </button>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              Need more personalized guidance?
            </p>
            <button
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:from-indigo-600 hover:to-purple-600 hover:scale-105"
              onClick={openTherapistModal}
            >
              Connect with a Therapist
            </button>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedExercise && (
                <div className="p-6 sm:p-8">
                  {/* Modal Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedExercise.gradient} flex items-center justify-center text-2xl`}
                        >
                          {selectedExercise.icon}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                          {selectedExercise.title}
                        </h2>
                      </div>
                      <p className="text-gray-600 mb-2">
                        {selectedExercise.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        ⏱️ Duration: {selectedExercise.duration}
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="ml-4 text-gray-400 hover:text-gray-600 transition-colors text-3xl leading-none"
                    >
                      ×
                    </button>
                  </div>

                  {/* Steps Section */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      How to Practice
                    </h3>
                    <div className="space-y-3">
                      {selectedExercise.steps.map((step, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 pt-0.5">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Benefits
                    </h3>
                    <div className="space-y-2">
                      {selectedExercise.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-green-500 text-xl">✓</span>
                          <p className="text-gray-700">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* <button className="flex-1 bg-gray-900 text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                      Begin Exercise
                    </button> */}
                    <button
                      onClick={closeModal}
                      className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Therapist Booking Modal */}
        {isTherapistModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={closeTherapistModal}
          >
            <div
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        bookingStep >= 1
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      1
                    </div>
                    <div
                      className={`w-12 h-1 ${
                        bookingStep >= 2 ? "bg-indigo-500" : "bg-gray-200"
                      }`}
                    ></div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        bookingStep >= 2
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      2
                    </div>
                    <div
                      className={`w-12 h-1 ${
                        bookingStep >= 3 ? "bg-indigo-500" : "bg-gray-200"
                      }`}
                    ></div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        bookingStep >= 3
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      3
                    </div>
                  </div>
                </div>

                {/* Step 1: User Information */}
                {bookingStep === 1 && (
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                          Your Information
                        </h2>
                        <p className="text-gray-600">
                          Please provide your details to continue
                        </p>
                      </div>
                      <button
                        onClick={closeTherapistModal}
                        className="text-gray-400 hover:text-gray-600 transition-colors text-3xl leading-none"
                      >
                        ×
                      </button>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="+92 300 1234567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Primary Concern
                        </label>
                        <select
                          name="concern"
                          value={formData.concern}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="">Select your concern</option>
                          <option value="anxiety">Anxiety & Stress</option>
                          <option value="depression">Depression</option>
                          <option value="trauma">Trauma & PTSD</option>
                          <option value="relationships">
                            Relationship Issues
                          </option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Preferred Time
                        </label>
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="">Select preferred time</option>
                          <option value="morning">Morning (8AM - 12PM)</option>
                          <option value="afternoon">
                            Afternoon (12PM - 5PM)
                          </option>
                          <option value="evening">Evening (5PM - 9PM)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleNextStep}
                        disabled={
                          !formData.name ||
                          !formData.email ||
                          !formData.phone ||
                          !formData.concern ||
                          !formData.preferredTime
                        }
                        className="flex-1 bg-indigo-500 text-white py-3.5 rounded-xl font-semibold hover:bg-indigo-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Next: Choose Therapist →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Select Therapist */}
                {bookingStep === 2 && (
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                          Choose Your Therapist
                        </h2>
                        <p className="text-gray-600">
                          Select a therapist that best matches your needs
                        </p>
                      </div>
                      <button
                        onClick={closeTherapistModal}
                        className="text-gray-400 hover:text-gray-600 transition-colors text-3xl leading-none"
                      >
                        ×
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {therapists.map((therapist) => (
                        <div
                          key={therapist.id}
                          className={`p-6 rounded-2xl border-2 transition-all ${
                            therapist.available
                              ? "border-gray-200 hover:border-indigo-500 cursor-pointer"
                              : "border-gray-100 bg-gray-50 opacity-60"
                          }`}
                          onClick={() =>
                            therapist.available &&
                            handleSelectTherapist(therapist)
                          }
                        >
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-3xl flex-shrink-0">
                              {therapist.image}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 mb-1">
                                {therapist.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">
                                {therapist.specialization}
                              </p>
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-yellow-500">★</span>
                                <span className="font-semibold">
                                  {therapist.rating}
                                </span>
                                <span className="text-gray-400">
                                  ({therapist.reviews} reviews)
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {therapist.about}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-700">
                              {therapist.experience} experience
                            </span>
                            <span className="text-sm font-bold text-indigo-600">
                              {therapist.fees}
                            </span>
                          </div>
                          {!therapist.available && (
                            <div className="mt-3 text-center text-sm text-red-500 font-semibold">
                              Currently Unavailable
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setBookingStep(1)}
                      className="text-gray-600 hover:text-gray-900 font-semibold"
                    >
                      ← Back
                    </button>
                  </div>
                )}

                {/* Step 3: Confirmation */}
                {bookingStep === 3 && selectedTherapist && (
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                          Confirm Booking
                        </h2>
                        <p className="text-gray-600">
                          Review your appointment details
                        </p>
                      </div>
                      <button
                        onClick={closeTherapistModal}
                        className="text-gray-400 hover:text-gray-600 transition-colors text-3xl leading-none"
                      >
                        ×
                      </button>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl">
                          {selectedTherapist.image}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {selectedTherapist.name}
                          </h3>
                          <p className="text-gray-600">
                            {selectedTherapist.specialization}
                          </p>
                          <div className="flex items-center gap-2 text-sm mt-1">
                            <span className="text-yellow-500">★</span>
                            <span className="font-semibold">
                              {selectedTherapist.rating}
                            </span>
                            <span className="text-gray-500">
                              • {selectedTherapist.experience}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                      <h3 className="font-bold text-gray-900 mb-4">
                        Your Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-semibold">{formData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-semibold">
                            {formData.email}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-semibold">
                            {formData.phone}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Concern:</span>
                          <span className="font-semibold capitalize">
                            {formData.concern}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Preferred Time:</span>
                          <span className="font-semibold capitalize">
                            {formData.preferredTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
                      <p className="text-sm text-green-800">
                        💡 <strong>Note:</strong> You will receive a
                        confirmation email with appointment details and a link
                        to join the session.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => setBookingStep(2)}
                        className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={handleBookingConfirm}
                        className="flex-1 bg-indigo-500 text-white py-3.5 rounded-xl font-semibold hover:bg-indigo-600 transition-colors"
                      >
                        Confirm Booking ✓
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ExercisesPage;
