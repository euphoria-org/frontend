import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TestIcon, UserIcon } from "../icons";
import Footer from "./layout/Footer";

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  const testCards = [
    {
      id: 1,
      icon: TestIcon,
      title: "MBTI Personality Test",
      description:
        "Discover your Myers-Briggs personality type through comprehensive questions that reveal your preferences in how you perceive the world and make decisions.",
      buttonText: "Take MBTI Test",
      route: "/test",
      available: true,
    },
    {
      id: 2,
      icon: UserIcon,
      title: "PERMA Assessment",
      description:
        "Measure your wellbeing across five key dimensions: Positive Emotions, Engagement, Relationships, Meaning, and Achievement for a fulfilling life.",
      buttonText: "Take PERMA Test",
      route: "/perma-test",
      available: false,
    },
    {
      id: 3,
      icon: TestIcon,
      title: "IQ Assessment",
      description:
        "Evaluate your cognitive abilities through standardized intelligence testing that measures logical reasoning, pattern recognition, and problem-solving skills.",
      buttonText: "Take IQ Test",
      route: "/iq-test",
      available: false,
    },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--color-header)" }}
          >
            Discover Your Personality Type
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Take our comprehensive assessments and gain insights into your
            unique traits, preferences, and behavioral patterns. Understanding
            yourself better can help you in personal growth, career decisions,
            and relationships.
          </p>
        </div>

        {/* Test Cards Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testCards.map((testCard) => {
            const IconComponent = testCard.icon;
            return (
              <div
                key={testCard.id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--color-custom-3)" }}
                >
                  <IconComponent
                    className="w-8 h-8"
                    style={{ color: "var(--color-custom-2)" }}
                  />
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "var(--color-header)" }}
                >
                  {testCard.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {testCard.description}
                </p>

                {testCard.available ? (
                  isAuthenticated ? (
                    <Link
                      to={testCard.route}
                      className="inline-flex items-center justify-center w-full space-x-2 px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-colors shadow-md"
                      style={{ backgroundColor: "var(--color-custom-2)" }}
                    >
                      <TestIcon className="w-5 h-5" />
                      <span>{testCard.buttonText}</span>
                    </Link>
                  ) : (
                    <div className="text-center">
                      <p
                        className="text-sm font-medium mb-3"
                        style={{ color: "var(--color-custom-5)" }}
                      >
                        Please log in to take this test
                      </p>
                      <Link
                        to="/login"
                        className="inline-flex items-center justify-center w-full space-x-2 px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-colors shadow-md"
                        style={{ backgroundColor: "var(--color-custom-2)" }}
                      >
                        <UserIcon className="w-5 h-5" />
                        <span>Login to Start</span>
                      </Link>
                    </div>
                  )
                ) : (
                  <div className="text-center">
                    <button
                      disabled
                      className="inline-flex items-center justify-center w-full space-x-2 px-6 py-3 text-gray-500 font-semibold rounded-lg bg-gray-100 cursor-not-allowed"
                    >
                      <TestIcon className="w-5 h-5" />
                      <span>Coming Soon</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
