import React from "react";
import Layout from "../components/Layout";

const ExercisesPage = () => {
  const exercises = [
    {
      id: 1,
      title: "Diaphragmatic Breathing",
      description:
        "Practice deep, mindful breathing to reduce stress and promote relaxation.",
      image: "/assets/exercise1.png",
    },
    {
      id: 2,
      title: "Box Breathing",
      description:
        "A technique involving equal intervals of inhale, hold, exhale, and hold to calm the nervous system.",
      image: "/assets/exercise2.png",
    },
    {
      id: 3,
      title: "Mindfulness Meditation",
      description:
        "Focus on the present moment to cultivate awareness and reduce anxiety.",
      image: "/assets/exercise3.png",
    },
    {
      id: 4,
      title: "Guided Imagery",
      description:
        "Use visualization to create a peaceful mental space and promote relaxation.",
      image: "/assets/exercise4.png",
    },
    {
      id: 5,
      title: "Gratitude Journaling",
      description:
        "Reflect on things you are grateful for to boost mood and foster positivity.",
      image: "/assets/exercise5.png",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#121714] mb-2">
            Exercises
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Explore a variety of exercises designed to support your mental
            wellness journey.
          </p>
        </div>

        {/* Exercises List */}
        <div className="space-y-6">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="flex flex-col md:flex-row items-center gap-6 bg-white"
            >
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#121714] mb-2">
                  {exercise.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {exercise.description}
                </p>
                <button className="bg-[#F5F5F5] hover:bg-gray-200 text-[#121714] px-5 py-2 rounded-lg text-sm font-medium transition-colors">
                  Start
                </button>
              </div>

              {/* Image */}
              <div className="w-full md:w-[200px] lg:w-[240px] flex-shrink-0">
                <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-2xl overflow-hidden">
                  <img
                    src={exercise.image}
                    alt={exercise.title}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ExercisesPage;
