import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TestIcon, UserIcon } from "../icons";
import Footer from "./layout/Footer";
import useCountUp from "../utils/useCountUp";

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  // Statistics with animated counters
  const testAccuracy = useCountUp(94, 2500);
  const totalTests = useCountUp(15420, 3000);
  const activeUsers = useCountUp(8750, 2800);
  const satisfactionRate = useCountUp(96, 2200);

  const statistics = [
    {
      id: 1,
      value: testAccuracy,
      suffix: "%",
      label: "Test Accuracy",
      description: "Scientifically validated results",
    },
    {
      id: 2,
      value: totalTests,
      suffix: "+",
      label: "Tests Completed",
      description: "Assessments taken globally",
    },
    {
      id: 3,
      value: activeUsers,
      suffix: "+",
      label: "Active Users",
      description: "People discovering themselves",
    },
    {
      id: 4,
      value: satisfactionRate,
      suffix: "%",
      label: "Satisfaction Rate",
      description: "Users found insights valuable",
    },
  ];

  const testCards = [
    {
      id: 1,
      image: "/PERMA.png",
      title: "PERMA Assessment",
      description:
        "Measure your wellbeing across five key dimensions: Positive Emotions, Engagement, Relationships, Meaning, and Achievement for a fulfilling life.",
      buttonText: "Take PERMA Test",
      route: "/perma-test",
      available: false,
    },{
      id: 2,
      image: "/MBTI.png",
      title: "MBTI Personality Test",
      description:
        "Discover your Myers-Briggs personality type through comprehensive questions that reveal your preferences in how you perceive the world and make decisions.",
      buttonText: "Take MBTI Test",
      route: "/test",
      available: true,
    },
    {
      id: 3,
      image: "/IQ.png",
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
      <div className="min-h-screen bg-gradient-to-br">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-20">
            <h2
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              style={{ color: "var(--color-header)" }}
            >
              Discover Your Personality Type
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Take our comprehensive assessments and gain insights into your
              unique traits, preferences, and behavioral patterns. Understanding
              yourself better can help you in personal growth, career decisions,
              and relationships.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testCards.map((testCard) => {
              return (
                <div
                  key={testCard.id}
                  className="p-8 rounded-2xl border border-gray-200 hover:border-gray-300  hover:scale-105 transition-all duration-300 group backdrop-blur-sm bg-white"
                >
                  <div className="flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={testCard.image}
                      alt={testCard.title}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: "var(--color-header)" }}
                  >
                    {testCard.title}
                  </h3>
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    {testCard.description}
                  </p>

                  {testCard.available ? (
                    <Link
                      to={testCard.route}
                      className="inline-flex items-center justify-center w-full space-x-2 px-8 py-4 text-white font-semibold rounded-xl hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg"
                      style={{ backgroundColor: "var(--color-custom-2)" }}
                    >
                      <TestIcon className="w-6 h-6" />
                      <span>{testCard.buttonText}</span>
                    </Link>
                  ) : (
                    <div className="text-center">
                      <p
                        className="text-sm font-medium mb-4"
                        style={{ color: "var(--color-custom-5)" }}
                      >
                        Coming Soon
                      </p>
                      <button
                        disabled
                        className="inline-flex items-center justify-center w-full space-x-2 px-8 py-4 bg-gray-400 text-white font-semibold rounded-xl cursor-not-allowed opacity-60"
                      >
                        <TestIcon className="w-6 h-6" />
                        <span>Coming Soon</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Statistics Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16 border border-gray-100">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-8 text-gray-800">
                Trusted by Thousands Worldwide
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {statistics.map((stat) => (
                  <div key={stat.id} className="text-center group">
                    <div className="mb-4">
                      <span
                        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                        style={{ color: "var(--color-custom-2)" }}
                      >
                        {stat.value}
                        {stat.suffix}
                      </span>
                    </div>
                    <h4
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-header)" }}
                    >
                      {stat.label}
                    </h4>
                    <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
