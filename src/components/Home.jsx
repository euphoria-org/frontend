import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TestIcon, UserIcon } from "../icons";
import Footer from "./layout/Footer";
import useCountUp from "../utils/useCountUp";
import Meteors from "./common/Meteors";
import { HomeSkeleton } from "./common/skeletons";

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const [showSkeleton, setShowSkeleton] = useState(true);

  // Add 1.5-second timer to show skeleton loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
    },
    {
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

  if (showSkeleton) {
    return <HomeSkeleton />;
  }

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <Meteors number={25} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 cantarell-bold text-white drop-shadow-lg">
              Discover Your Personality Type
            </h2>
            <p className="text-xl text-gray-100 mb-12 max-w-4xl mx-auto leading-relaxed cantarell-regular">
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
                  className="p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg hover:bg-white/20 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={testCard.image}
                      alt={testCard.title}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 cantarell-bold text-white">
                    {testCard.title}
                  </h3>
                  <p className="mb-8 leading-relaxed text-lg cantarell-regular text-neutral-100">
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
                      <p className="text-sm font-medium mb-4 text-gray-300">
                        Coming Soon
                      </p>
                      <button
                        disabled
                        className="inline-flex items-center justify-center w-full space-x-2 px-8 py-4 bg-gray-600 text-gray-300 font-semibold rounded-xl cursor-not-allowed opacity-60"
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
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl hover:bg-white/20 hover:shadow-xl transition-all duration-300 p-8 md:p-12 mb-16">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-8 cantarell-bold text-white">
                Trusted by Thousands Worldwide
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {statistics.map((stat) => (
                  <div key={stat.id} className="text-center group">
                    <div className="mb-4">
                      <span className="text-4xl md:text-5xl font-bold text-white">
                        {stat.value}
                        {stat.suffix}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-white">
                      {stat.label}
                    </h4>
                    <p className="text-sm group-hover:opacity-90 transition-colors text-neutral-100">
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
