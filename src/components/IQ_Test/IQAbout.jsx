import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IQIcon, TestIcon, CheckIcon } from "../../icons";
import Footer from "../layout/Footer";
import Meteors from "../common/Meteors";
import { IQAboutSkeleton } from "../common/skeletons";

const IQAbout = () => {
  const navigate = useNavigate();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (showSkeleton) {
    return <IQAboutSkeleton />;
  }

  const categories = [
    {
      id: 1,
      title: "Logical Reasoning",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm13.5 0a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"/>
        </svg>
      ),
      description:
        "Tests your ability to analyze arguments, identify patterns in logic, and draw valid conclusions from given information.",
      color: "from-purple-500/20 to-fuchsia-500/20",
      borderColor: "border-purple-400/30",
      skills: ["Deductive reasoning", "Syllogistic logic", "Analytical thinking"],
    },
    {
      id: 2,
      title: "Pattern Recognition",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      description:
        "Evaluates your capacity to identify sequences, trends, and patterns in both visual and numerical information.",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-400/30",
      skills: ["Sequence completion", "Visual patterns", "Number series"],
    },
    {
      id: 3,
      title: "Verbal Comprehension",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      description:
        "Measures your vocabulary, reading comprehension, and ability to understand and use language effectively.",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-400/30",
      skills: ["Vocabulary mastery", "Reading comprehension", "Verbal analogies"],
    },
    {
      id: 4,
      title: "Numerical Ability",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      ),
      description:
        "Assesses your mathematical reasoning, problem-solving with numbers, and ability to work with quantitative information.",
      color: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-400/30",
      skills: ["Mathematical operations", "Problem solving", "Quantitative reasoning"],
    },
    {
      id: 5,
      title: "Spatial Reasoning",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      description:
        "Tests your ability to visualize, manipulate, and reason about objects in space, including rotation and transformation.",
      color: "from-indigo-500/20 to-purple-500/20",
      borderColor: "border-indigo-400/30",
      skills: ["3D visualization", "Mental rotation", "Spatial awareness"],
    },
  ];

  const scoreRanges = [
    { 
      range: "145+", 
      label: "Genius", 
      description: "Exceptionally gifted - Top 0.1% of population",
      color: "from-purple-500 to-fuchsia-600",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      )
    },
    { 
      range: "130-144", 
      label: "Very Superior", 
      description: "Highly gifted - Top 2% of population",
      color: "from-blue-500 to-cyan-600",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      )
    },
    { 
      range: "115-129", 
      label: "Superior", 
      description: "Above average - Top 16% of population",
      color: "from-green-500 to-emerald-600",
      icon: (
        <CheckIcon className="w-8 h-8" />
      )
    },
    { 
      range: "85-114", 
      label: "Average", 
      description: "Normal intelligence - 68% of population",
      color: "from-gray-400 to-gray-600",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      range: "Below 85", 
      label: "Below Average", 
      description: "Room for development",
      color: "from-yellow-500 to-amber-600",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
  ];

  const benefits = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Know Your Strengths",
      description: "Discover your cognitive strengths across different domains and leverage them in your career and daily life."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Track Your Progress",
      description: "Take the test multiple times to track your cognitive development and see improvements over time."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      title: "Career Guidance",
      description: "Use insights from your IQ assessment to make informed decisions about education and career paths."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Personalized Insights",
      description: "Receive detailed analysis of your performance in each category with explanations and recommendations."
    },
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <Meteors number={30} />
      <div className="absolute inset-0 stars-background opacity-60"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 backdrop-blur-lg shadow-xl">
            <IQIcon className="w-14 h-14" style={{ color: "var(--color-custom-2)" }} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            IQ Test Assessment
          </h1>
          <p className="text-xl md:text-2xl text-neutral-100 max-w-4xl mx-auto leading-relaxed mb-8">
            Measure your cognitive abilities across multiple domains with our comprehensive intelligence assessment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/iq-test")}
              className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              style={{ backgroundColor: "var(--color-custom-2)" }}
            >
              <TestIcon className="w-5 h-5 mr-2" />
              Start IQ Test
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-10 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white mb-4">
                What is Intelligence Quotient?
              </h2>
              <p className="text-neutral-100 leading-relaxed mb-4">
                IQ (Intelligence Quotient) is a measure of cognitive abilities including logical reasoning, 
                pattern recognition, verbal comprehension, numerical ability, and spatial reasoning. 
              </p>
              <p className="text-neutral-100 leading-relaxed">
                Our comprehensive assessment evaluates your problem-solving skills and cognitive strengths, 
                comparing your performance to population norms to provide your IQ score and percentile ranking.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">60 Minutes</div>
                    <div className="text-neutral-100 text-sm">Test Duration</div>
                  </div>
                </div>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                  <div>
                    <div className="text-white font-semibold">25 Questions</div>
                    <div className="text-neutral-100 text-sm">Comprehensive Test</div>
                  </div>
                </div>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                  <div>
                    <div className="text-white font-semibold">5 Categories</div>
                    <div className="text-neutral-100 text-sm">Cognitive Domains</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Test Categories with Enhanced Design */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Cognitive Domains Assessed
            </h2>
            <p className="text-lg text-neutral-100 max-w-3xl mx-auto">
              Our test evaluates five critical areas of cognitive function to provide a comprehensive assessment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`bg-gradient-to-br ${category.color} backdrop-blur-lg border ${category.borderColor} rounded-3xl p-6 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="text-white group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-neutral-100 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Ranges with Visual Appeal */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-10 mb-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Understanding Your IQ Score
            </h2>
            <p className="text-lg text-neutral-100 max-w-3xl mx-auto">
              See where you stand compared to the global population
            </p>
          </div>

          <div className="space-y-4">
            {scoreRanges.map((score, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
              <div className="flex items-center space-x-6">
                <div className="text-white group-hover:scale-110 transition-transform duration-300">
                  {score.icon}
                </div>
                  <div className={`flex-shrink-0 text-center px-6 py-3 rounded-xl bg-gradient-to-r ${score.color} text-white font-bold text-lg shadow-lg`}>
                    {score.range}
                  </div>
                  <div className="flex-1">
                    <div className="text-xl font-bold text-white mb-1 group-hover:text-purple-200 transition-colors">
                      {score.label}
                    </div>
                    <div className="text-neutral-100">{score.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Take Our IQ Test?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group"
              >
              <div className="flex items-start space-x-4">
                <div className="text-purple-300 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-100 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test Instructions */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-10 mb-12">
          <h2 className="text-3xl font-semibold text-white mb-6 text-center">
            Test Instructions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-white font-bold">1</span>
                <p className="text-neutral-100 pt-1">The test contains 25 questions of varying difficulty levels</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-white font-bold">2</span>
                <p className="text-neutral-100 pt-1">You have 60 minutes to complete all questions</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-white font-bold">3</span>
                <p className="text-neutral-100 pt-1">Each question is multiple-choice with one correct answer</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-white font-bold">4</span>
                <p className="text-neutral-100 pt-1">Questions have different point values based on difficulty</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-white font-bold">5</span>
                <p className="text-neutral-100 pt-1">Work at your own pace, but manage your time wisely</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-white font-bold">6</span>
                <p className="text-neutral-100 pt-1">You can navigate between questions freely</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-white font-bold">7</span>
                <p className="text-neutral-100 pt-1">Your results will be calculated upon submission</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-white font-bold">8</span>
                <p className="text-neutral-100 pt-1">Detailed explanations provided after completion</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-400/30 shadow-xl rounded-3xl p-12 text-center">
          <h3 className="text-4xl font-bold text-white mb-4">
            Ready to Discover Your IQ?
          </h3>
          <p className="text-xl text-neutral-100 mb-8 max-w-2xl mx-auto">
            Take the comprehensive IQ test now and get your personalized cognitive profile with detailed insights
          </p>
          <button
            onClick={() => navigate("/iq-test")}
            className="group inline-flex items-center px-10 py-5 text-xl font-bold text-white rounded-2xl hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50"
            style={{ backgroundColor: "var(--color-custom-2)" }}
          >
            <IQIcon className="w-6 h-6 mr-3" />
            Begin Assessment
            <svg
              className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default IQAbout;
