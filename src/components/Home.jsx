import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TestIcon, UserIcon, IQIcon, PermaIcon, MBTIIcon } from "../icons";
import Footer from "./layout/Footer";
import useCountUp from "../utils/useCountUp";
import Meteors from "./common/Meteors";
import { HomeSkeleton } from "./common/skeletons";

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
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
      image: null,
      icon: (
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
          <PermaIcon className="w-12 h-12 text-white" />
        </div>
      ),
      title: "PERMA Assessment",
      description:
        "Measure your wellbeing across five key dimensions: Positive Emotions, Engagement, Relationships, Meaning, and Achievement for a fulfilling life.",
      buttonText: "Take PERMA Test",
      route: "/perma-test",
      available: true,
    },
    {
      id: 2,
      image: null,
      icon: (
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg">
          <MBTIIcon className="w-12 h-12 text-white" />
        </div>
      ),
      title: "MBTI Personality Test",
      description:
        "Discover your Myers-Briggs personality type through comprehensive questions that reveal your preferences in how you perceive the world and make decisions.",
      buttonText: "Take MBTI Test",
      route: "/test",
      available: true,
    },
    {
      id: 3,
      image: null,
      icon: (
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
          <IQIcon className="w-12 h-12 text-white" />
        </div>
      ),
      title: "IQ Assessment",
      description:
        "Evaluate your cognitive abilities through standardized intelligence testing that measures logical reasoning, pattern recognition, and problem-solving skills.",
      buttonText: "Take IQ Test",
      route: "/iq-test",
      available: true,
    },
  ];

  if (showSkeleton) {
    return <HomeSkeleton />;
  }

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <Meteors number={25} />
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 cantarell-bold text-white drop-shadow-2xl leading-tight">
              Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">True Self</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-4xl mx-auto leading-relaxed cantarell-regular opacity-90">
              Take our scientifically-validated assessments to gain deep insights into your
              unique traits, wellbeing, and cognitive patterns. Start your journey of self-discovery today.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 mt-12 text-sm md:text-base text-neutral-100">
              {["Scientifically Validated", "Instant Results", "Personalized Insights"].map((item) => (
                <div key={item} className="flex items-center bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <svg
                    className="w-5 h-5 mr-2 text-emerald-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-10 mb-24">
            {testCards.map((testCard) => {
              return (
                <div
                  key={testCard.id}
                  className="group p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-white/15 hover:scale-[1.02] transition-all duration-500 flex flex-col"
                >
                  <div className="flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    {testCard.icon ? (
                      testCard.icon
                    ) : (
                      <img
                        src={testCard.image}
                        alt={testCard.title}
                        className="w-24 h-24 object-contain"
                      />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 cantarell-bold text-white text-center">
                    {testCard.title}
                  </h3>
                  <p className="mb-10 leading-relaxed text-lg cantarell-regular text-neutral-200 text-center flex-grow">
                    {testCard.description}
                  </p>

                  {testCard.available ? (
                    <Link
                      to={testCard.route}
                      className="inline-flex items-center justify-center w-full space-x-3 px-8 py-5 text-white font-bold rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:shadow-purple-500/25 transition-all duration-300 shadow-xl"
                    >
                      <TestIcon className="w-6 h-6" />
                      <span>{testCard.buttonText}</span>
                    </Link>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm font-medium mb-4 text-gray-400">
                        Coming Soon
                      </p>
                      <button
                        disabled
                        className="inline-flex items-center justify-center w-full space-x-2 px-8 py-5 bg-white/5 text-gray-400 font-semibold rounded-full cursor-not-allowed border border-white/10"
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
          {/* <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[2.5rem] p-12 md:p-20 mb-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
            <div className="text-center relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold mb-16 cantarell-bold text-white">
                Trusted by Thousands Worldwide
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                {statistics.map((stat) => (
                  <div key={stat.id} className="text-center group">
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                        {stat.value}
                        {stat.suffix}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-white">
                      {stat.label}
                    </h4>
                    <p className="text-base text-neutral-300 opacity-80 group-hover:opacity-100 transition-opacity">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
