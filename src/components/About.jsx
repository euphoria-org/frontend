import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TestIcon, UserIcon } from "../icons";
import Footer from "./layout/Footer";
import Meteors from "./common/Meteors";
import { AboutSkeleton } from "./common/skeletons";

const About = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  // Add 1.5-second timer to show skeleton loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const mbtiDimensions = [
    {
      id: 1,
      title: "1. Energy Direction",
      subtitle: "Where You Focus Your Attention",
      description:
        "This dimension describes how you direct your energy and where you naturally focus your attention - either toward the outer world of people and activities, or the inner world of thoughts and reflections.",
      leftSide: true,
      traits: [
        {
          name: "Extraversion (E)",
          focus: "Outer world of people and things",
          energySource: "Interaction with others and external activities",
          characteristics:
            "Outgoing, talkative, enjoys group activities, thinks out loud, broad range of interests",
        },
        {
          name: "Introversion (I)",
          focus: "Inner world of ideas and impressions",
          energySource: "Quiet reflection and internal processing",
          characteristics:
            "Reserved, thoughtful, prefers one-on-one conversations, thinks before speaking, deep interests",
        },
      ],
    },
    {
      id: 2,
      title: "2. Information Gathering",
      subtitle: "How You Take In Information",
      description:
        "This dimension describes how you prefer to gather and process information - either focusing on concrete details and facts, or looking for patterns and future possibilities.",
      leftSide: false,
      traits: [
        {
          name: "Sensing (S)",
          focus: "Present reality and concrete facts",
          energySource: "Specific, detailed, practical information",
          characteristics:
            "Realistic, practical, observant, prefers step-by-step instructions, values experience",
        },
        {
          name: "Intuition (N)",
          focus: "Future possibilities and patterns",
          energySource: "Conceptual, theoretical, big-picture information",
          characteristics:
            "Imaginative, innovative, sees connections, enjoys brainstorming, values inspiration",
        },
      ],
    },
    {
      id: 3,
      title: "3. Decision Making",
      subtitle: "How You Make Decisions",
      description:
        "This dimension describes how you prefer to make decisions - either through logical analysis and objective reasoning, or by considering personal values and the impact on people.",
      leftSide: true,
      traits: [
        {
          name: "Thinking (T)",
          focus: "Logic, objective analysis, and cause-and-effect reasoning",
          energySource: "Fairness, consistency, and competence",
          characteristics:
            "Analytical, rational, direct, values truth over tact, focuses on tasks",
        },
        {
          name: "Feeling (F)",
          focus: "Personal values, human considerations, and impact on people",
          energySource: "Harmony, empathy, and appreciation",
          characteristics:
            "Compassionate, diplomatic, tactful, values harmony over truth, focuses on people",
        },
      ],
    },
    {
      id: 4,
      title: "4. Lifestyle Approach",
      subtitle: "How You Approach Life",
      description:
        "This dimension describes how you prefer to live your life and deal with the outside world - either in a structured, planned way or in a flexible, spontaneous manner.",
      leftSide: false,
      traits: [
        {
          name: "Judging (J)",
          focus: "Structure, closure, and planned approach",
          energySource: "Organized, scheduled, and decisive",
          characteristics:
            "Organized, methodical, prefers closure, likes things settled, works steadily",
        },
        {
          name: "Perceiving (P)",
          focus: "Flexibility, openness, and adaptable approach",
          energySource: "Spontaneous, flexible, and open-ended",
          characteristics:
            "Adaptable, spontaneous, keeps options open, likes flexibility, works in bursts",
        },
      ],
    },
  ];

  const realWorldApplications = [
    {
      id: 1,
      icon: UserIcon,
      title: "Personal Development",
      points: [
        "Understanding your natural strengths and blind spots",
        "Improving self-awareness and emotional intelligence",
        "Making better life and career decisions",
        "Developing more effective personal strategies",
      ],
    },
    {
      id: 2,
      icon: TestIcon,
      title: "Professional Growth",
      points: [
        "Career exploration and job satisfaction",
        "Leadership development and management style",
        "Team building and collaboration improvement",
        "Communication enhancement in workplace",
      ],
    },
    {
      id: 3,
      icon: UserIcon,
      title: "Relationships",
      points: [
        "Understanding and appreciating differences",
        "Improving communication with family and friends",
        "Building stronger, more authentic relationships",
        "Resolving conflicts more effectively",
      ],
    },
  ];

  const personalityTypes = [
    {
      type: "ISTJ",
      name: "The Inspector",
      desc: "Responsible, organized, practical",
    },
    {
      type: "ISFJ",
      name: "The Protector",
      desc: "Caring, reliable, conscientious",
    },
    {
      type: "INFJ",
      name: "The Advocate",
      desc: "Creative, insightful, principled",
    },
    {
      type: "INTJ",
      name: "The Architect",
      desc: "Independent, strategic, determined",
    },
    {
      type: "ISTP",
      name: "The Virtuoso",
      desc: "Bold, practical, experimental",
    },
    {
      type: "ISFP",
      name: "The Adventurer",
      desc: "Flexible, charming, artistic",
    },
    {
      type: "INFP",
      name: "The Mediator",
      desc: "Idealistic, creative, caring",
    },
    {
      type: "INTP",
      name: "The Thinker",
      desc: "Innovative, curious, flexible",
    },
    {
      type: "ESTP",
      name: "The Entrepreneur",
      desc: "Energetic, perceptive, spontaneous",
    },
    {
      type: "ESFP",
      name: "The Entertainer",
      desc: "Outgoing, friendly, spontaneous",
    },
    {
      type: "ENFP",
      name: "The Campaigner",
      desc: "Enthusiastic, creative, sociable",
    },
    { type: "ENTP", name: "The Debater", desc: "Smart, curious, playful" },
    {
      type: "ESTJ",
      name: "The Executive",
      desc: "Organized, practical, logical",
    },
    { type: "ESFJ", name: "The Consul", desc: "Caring, social, popular" },
    {
      type: "ENFJ",
      name: "The Protagonist",
      desc: "Charismatic, inspiring, natural leaders",
    },
    {
      type: "ENTJ",
      name: "The Commander",
      desc: "Bold, imaginative, strong-willed",
    },
  ];

  if (showSkeleton) {
    return <AboutSkeleton />;
  }

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <Meteors number={25} />

        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="relative text-center mb-20">
            <div className="relative z-10">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-lg">
                Understanding MBTI
                <br />
                <span className="text-4xl md:text-5xl">Personality Types</span>
              </h1>

              <p className="text-xl md:text-2xl text-neutral-100 mb-10 max-w-4xl mx-auto leading-relaxed">
                Discover the comprehensive guide to{" "}
                <span className="font-semibold text-blue-300">
                  Myers-Briggs Type Indicator
                </span>{" "}
                and how it can transform your understanding of yourself and
                others through scientifically-backed personality assessment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/test"
                  className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Take Your Assessment
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
                </Link>
              </div>

              <div className="flex justify-center items-center mt-12 space-x-8 text-sm text-neutral-100">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  No Credit Card Required
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Instant Results
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  100% Private & Secure
                </div>
              </div>
            </div>
          </div>

          {/* What is MBTI */}
          <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-10 mb-16 overflow-hidden transition-all duration-300">
            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  What is the Myers-Briggs Type Indicator?
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <p className="text-neutral-100 leading-relaxed">
                        The Myers-Briggs Type Indicator (MBTI) is one of the
                        world's most widely used personality assessment tools,
                        developed by Katharine Cook Briggs and her daughter
                        Isabel Briggs Myers. Based on Carl Jung's theory of
                        psychological types, the MBTI identifies how people
                        prefer to focus their attention, take in information,
                        make decisions, and approach the outside world.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </div>
                      <p className="text-neutral-100 leading-relaxed">
                        The MBTI categorizes personalities into 16 distinct
                        types, each representing a unique combination of four
                        key psychological preferences. This system helps
                        individuals understand their natural tendencies,
                        strengths, and potential areas for growth.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <p className="text-neutral-100 leading-relaxed">
                        Unlike other personality tests that measure traits or
                        behaviors, the MBTI focuses on understanding your innate
                        preferences - the mental processes that come most
                        naturally to you and energize you when used.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-8 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Benefits of Understanding Your Type
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        icon: "🎯",
                        text: "Enhanced self-awareness and personal development",
                      },
                      {
                        icon: "💬",
                        text: "Improved communication and relationship building",
                      },
                      {
                        icon: "🚀",
                        text: "Better career decision-making and job satisfaction",
                      },
                      {
                        icon: "👥",
                        text: "More effective teamwork and leadership skills",
                      },
                      {
                        icon: "😌",
                        text: "Reduced stress through understanding natural preferences",
                      },
                      {
                        icon: "🤝",
                        text: "Greater appreciation for individual differences",
                      },
                      {
                        icon: "🧠",
                        text: "Improved problem-solving and decision-making approaches",
                      },
                    ].map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 group"
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                          {benefit.icon}
                        </span>
                        <span className="text-neutral-100 font-medium group-hover:text-blue-300 transition-colors duration-200">
                          {benefit.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-12 mb-16  transition-all duration-300 overflow-hidden relative">
            <div className="relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-8">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  The Four MBTI Dimensions
                </h2>
                <p className="text-xl text-neutral-100 max-w-3xl mx-auto">
                  Each dimension represents a fundamental aspect of how you
                  interact with the world and process information
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6"></div>
              </div>

              <div className="space-y-16">
                {mbtiDimensions.map((dimension, index) => {
                  const gradients = [
                    "from-red-500 to-pink-500",
                    "from-blue-500 to-cyan-500",
                    "from-green-500 to-emerald-500",
                    "from-purple-500 to-indigo-500",
                  ];
                  const bgGradients = [
                    "from-red-50 to-pink-50",
                    "from-blue-50 to-cyan-50",
                    "from-green-50 to-emerald-50",
                    "from-purple-50 to-indigo-50",
                  ];

                  return (
                    <div
                      key={dimension.id}
                      className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                      {dimension.leftSide ? (
                        <>
                          {/* Info Section */}
                          <div className="space-y-8">
                            <div
                              className={`bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 transition-all duration-300`}
                            >
                              <div
                                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${gradients[index]} rounded-2xl mb-6`}
                              >
                                <span className="text-2xl font-bold text-white">
                                  {dimension.id}
                                </span>
                              </div>
                              <h3 className="text-3xl font-bold mb-4 text-white">
                                {dimension.title}
                              </h3>
                              <p className="text-xl text-blue-300 mb-6 font-medium">
                                {dimension.subtitle}
                              </p>
                              <p className="text-neutral-100 leading-relaxed text-lg">
                                {dimension.description}
                              </p>
                            </div>
                          </div>

                          {/* Traits Section */}
                          <div className="grid gap-6">
                            {dimension.traits.map((trait, traitIndex) => (
                              <div
                                key={traitIndex}
                                className="group bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-8 hover:bg-white/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                              >
                                <div className="flex items-start space-x-4">
                                  <div
                                    className={`flex-shrink-0 w-14 h-14 bg-gradient-to-r ${gradients[index]} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                  >
                                    <span className="text-white font-bold text-lg">
                                      {trait.name.charAt(0)}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-2xl font-bold text-white mb-3">
                                      {trait.name}
                                    </h4>
                                    <div className="space-y-3">
                                      <p className="text-neutral-100">
                                        <span className="font-semibold text-white">
                                          Focus:
                                        </span>{" "}
                                        {trait.focus}
                                      </p>
                                      <p className="text-neutral-100">
                                        <span className="font-semibold text-white">
                                          {dimension.id === 2
                                            ? "Information preference"
                                            : dimension.id === 3
                                            ? "Values"
                                            : dimension.id === 4
                                            ? "Lifestyle"
                                            : "Energy source"}
                                          :
                                        </span>{" "}
                                        {trait.energySource}
                                      </p>
                                      <p className="text-neutral-100">
                                        <span className="font-semibold text-white">
                                          Characteristics:
                                        </span>{" "}
                                        {trait.characteristics}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Traits Section */}
                          <div className="grid gap-6 lg:order-1">
                            {dimension.traits.map((trait, traitIndex) => (
                              <div
                                key={traitIndex}
                                className="group bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-8 hover:bg-white/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                              >
                                <div className="flex items-start space-x-4">
                                  <div
                                    className={`flex-shrink-0 w-14 h-14 bg-gradient-to-r ${gradients[index]} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                  >
                                    <span className="text-white font-bold text-lg">
                                      {trait.name.charAt(0)}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-2xl font-bold text-white mb-3">
                                      {trait.name}
                                    </h4>
                                    <div className="space-y-3">
                                      <p className="text-neutral-100">
                                        <span className="font-semibold text-white">
                                          Focus:
                                        </span>{" "}
                                        {trait.focus}
                                      </p>
                                      <p className="text-neutral-100">
                                        <span className="font-semibold text-white">
                                          {dimension.id === 2
                                            ? "Information preference"
                                            : dimension.id === 3
                                            ? "Values"
                                            : dimension.id === 4
                                            ? "Lifestyle"
                                            : "Energy source"}
                                          :
                                        </span>{" "}
                                        {trait.energySource}
                                      </p>
                                      <p className="text-neutral-100">
                                        <span className="font-semibold text-white">
                                          Characteristics:
                                        </span>{" "}
                                        {trait.characteristics}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Info Section */}
                          <div className="space-y-8 lg:order-2">
                            <div
                              className={`bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 transition-all duration-300`}
                            >
                              <div
                                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${gradients[index]} rounded-2xl mb-6`}
                              >
                                <span className="text-2xl font-bold text-white">
                                  {dimension.id}
                                </span>
                              </div>
                              <h3 className="text-3xl font-bold mb-4 text-white">
                                {dimension.title}
                              </h3>
                              <p className="text-xl text-blue-300 mb-6 font-medium">
                                {dimension.subtitle}
                              </p>
                              <p className="text-neutral-100 leading-relaxed text-lg">
                                {dimension.description}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-12 mb-16 overflow-hidden relative transition-all duration-300">
            <div className="relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl mb-8">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  The 16 MBTI Personality Types
                </h2>
                <p className="text-xl text-neutral-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                  Each of the 16 types represents a unique combination of the
                  four preferences, creating distinct personality profiles with
                  their own strengths, challenges, and natural tendencies.
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {personalityTypes.map((personality, index) => {
                  const colors = [
                    {
                      bg: "from-red-500 to-pink-500",
                      light: "from-red-50 to-pink-50",
                      border: "border-red-200",
                    },
                    {
                      bg: "from-blue-500 to-cyan-500",
                      light: "from-blue-50 to-cyan-50",
                      border: "border-blue-200",
                    },
                    {
                      bg: "from-green-500 to-emerald-500",
                      light: "from-green-50 to-emerald-50",
                      border: "border-green-200",
                    },
                    {
                      bg: "from-purple-500 to-indigo-500",
                      light: "from-purple-50 to-indigo-50",
                      border: "border-purple-200",
                    },
                    {
                      bg: "from-yellow-500 to-orange-500",
                      light: "from-yellow-50 to-orange-50",
                      border: "border-yellow-200",
                    },
                    {
                      bg: "from-pink-500 to-rose-500",
                      light: "from-pink-50 to-rose-50",
                      border: "border-pink-200",
                    },
                    {
                      bg: "from-teal-500 to-cyan-500",
                      light: "from-teal-50 to-cyan-50",
                      border: "border-teal-200",
                    },
                    {
                      bg: "from-indigo-500 to-purple-500",
                      light: "from-indigo-50 to-purple-50",
                      border: "border-indigo-200",
                    },
                    {
                      bg: "from-orange-500 to-red-500",
                      light: "from-orange-50 to-red-50",
                      border: "border-orange-200",
                    },
                    {
                      bg: "from-emerald-500 to-green-500",
                      light: "from-emerald-50 to-green-50",
                      border: "border-emerald-200",
                    },
                    {
                      bg: "from-cyan-500 to-blue-500",
                      light: "from-cyan-50 to-blue-50",
                      border: "border-cyan-200",
                    },
                    {
                      bg: "from-violet-500 to-purple-500",
                      light: "from-violet-50 to-purple-50",
                      border: "border-violet-200",
                    },
                    {
                      bg: "from-rose-500 to-pink-500",
                      light: "from-rose-50 to-pink-50",
                      border: "border-rose-200",
                    },
                    {
                      bg: "from-lime-500 to-green-500",
                      light: "from-lime-50 to-green-50",
                      border: "border-lime-200",
                    },
                    {
                      bg: "from-sky-500 to-blue-500",
                      light: "from-sky-50 to-blue-50",
                      border: "border-sky-200",
                    },
                    {
                      bg: "from-amber-500 to-yellow-500",
                      light: "from-amber-50 to-yellow-50",
                      border: "border-amber-200",
                    },
                  ];
                  const colorSet = colors[index % colors.length];

                  return (
                    <div
                      key={personality.type}
                      className={`group bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden`}
                    >
                      {/* Hover overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${colorSet.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                      ></div>

                      <div className="relative z-10">
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${colorSet.bg} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <span className="text-white font-bold text-lg">
                            {personality.type}
                          </span>
                        </div>

                        <h4 className="font-bold text-xl text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                          {personality.type}
                        </h4>

                        <h5 className="font-semibold text-base text-blue-300 mb-3 group-hover:text-blue-200 transition-colors duration-300">
                          {personality.name}
                        </h5>

                        <p className="text-sm text-neutral-100 leading-relaxed group-hover:text-white transition-colors duration-300">
                          {personality.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Applications and Benefits */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-12 mb-16 overflow-hidden relative transition-all duration-300">
            <div className="relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-8">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
                    />
                  </svg>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Real-World Applications of MBTI
                </h2>
                <p className="text-xl text-neutral-100 max-w-3xl mx-auto">
                  Discover how understanding your personality type can transform
                  every aspect of your life
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full mt-6"></div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {realWorldApplications.map((application, index) => {
                  const IconComponent = application.icon;
                  const gradients = [
                    {
                      bg: "from-pink-500 to-rose-500",
                      light: "from-pink-50 to-rose-50",
                      border: "border-pink-200",
                    },
                    {
                      bg: "from-blue-500 to-indigo-500",
                      light: "from-blue-50 to-indigo-50",
                      border: "border-blue-200",
                    },
                    {
                      bg: "from-emerald-500 to-green-500",
                      light: "from-emerald-50 to-green-50",
                      border: "border-emerald-200",
                    },
                  ];
                  const colorSet = gradients[index];

                  return (
                    <div key={application.id} className="group relative">
                      <div
                        className={`bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 h-full transform group-hover:scale-105 transition-all duration-300`}
                      >
                        {/* Hover overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${colorSet.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}
                        ></div>

                        <div className="relative z-10 text-center">
                          <div
                            className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${colorSet.bg} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                          >
                            <IconComponent className="w-10 h-10 text-white" />
                          </div>

                          <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-300 transition-colors duration-300">
                            {application.title}
                          </h3>

                          <div className="space-y-4 text-left">
                            {application.points.map((point, pointIndex) => (
                              <div
                                key={pointIndex}
                                className="flex items-start space-x-3 group-hover:translate-x-1 transition-transform duration-300"
                              >
                                <div
                                  className={`flex-shrink-0 w-6 h-6 bg-gradient-to-r ${colorSet.bg} rounded-full flex items-center justify-center mt-0.5`}
                                >
                                  <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </div>
                                <p className="text-neutral-100 leading-relaxed group-hover:text-white transition-colors duration-300">
                                  {point}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* How Our Platform Works */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-12 mb-16 overflow-hidden relative transition-all duration-300">
            <div className="relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-8">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  How Our MBTI Assessment Works
                </h2>
                <p className="text-xl text-neutral-100 max-w-3xl mx-auto">
                  Experience a seamless, scientifically-backed assessment
                  process designed for accuracy and insight
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mt-6"></div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 relative">
                {[
                  {
                    step: 1,
                    title: "Complete the Assessment",
                    description:
                      "Answer a comprehensive series of questions designed to identify your preferences across all four MBTI dimensions with scientific accuracy.",
                    icon: (
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0-8h10a2 2 0 012 2v6a2 2 0 01-2 2H9m12 0l-4-4m4 4l-4 4m-6-8l-4-4m4 4l-4 4"
                        />
                      </svg>
                    ),
                    gradient: "from-red-500 to-pink-500",
                    lightGradient: "from-red-50 to-pink-50",
                    borderColor: "border-red-200",
                  },
                  {
                    step: 2,
                    title: "Receive Detailed Results",
                    description:
                      "Get your complete personality profile including your four-letter type, detailed explanations, strengths, and development areas.",
                    icon: (
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    ),
                    gradient: "from-blue-500 to-cyan-500",
                    lightGradient: "from-blue-50 to-cyan-50",
                    borderColor: "border-blue-200",
                  },
                  {
                    step: 3,
                    title: "Apply Your Insights",
                    description:
                      "Use your personality insights for personal growth, career development, relationship improvement, and better decision-making.",
                    icon: (
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    ),
                    gradient: "from-green-500 to-emerald-500",
                    lightGradient: "from-green-50 to-emerald-50",
                    borderColor: "border-green-200",
                  },
                ].map((item, index) => (
                  <div key={item.step} className="group relative">
                    <div
                      className={`bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 h-full text-center transform group-hover:scale-105 transition-all duration-300 relative overflow-hidden`}
                    >
                      {/* Hover overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}
                      ></div>

                      <div className="relative z-10">
                        {/* Step indicator */}
                        <div
                          className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${item.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg relative`}
                        >
                          {item.icon}
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-sm font-bold text-gray-700">
                              {item.step}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                          {item.title}
                        </h3>

                        <p className="text-neutral-100 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
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

export default About;
