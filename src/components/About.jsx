import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TestIcon, UserIcon } from "../icons";
import Footer from "./layout/Footer";

const About = () => {
  const { isAuthenticated } = useAuth();

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

  return (
    <>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--color-header)" }}
          >
            Understanding MBTI Personality Types
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the comprehensive guide to Myers-Briggs Type Indicator and
            how it can transform your understanding of yourself and others
            through scientifically-backed personality assessment.
          </p>
        </div>

        {/* What is MBTI */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2
            className="text-3xl font-bold mb-6 text-center"
            style={{ color: "var(--color-header)" }}
          >
            What is the Myers-Briggs Type Indicator?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-4">
                The Myers-Briggs Type Indicator (MBTI) is one of the world's
                most widely used personality assessment tools, developed by
                Katharine Cook Briggs and her daughter Isabel Briggs Myers.
                Based on Carl Jung's theory of psychological types, the MBTI
                identifies how people prefer to focus their attention, take in
                information, make decisions, and approach the outside world.
              </p>
              <p className="text-gray-700 mb-4">
                The MBTI categorizes personalities into 16 distinct types, each
                representing a unique combination of four key psychological
                preferences. This system helps individuals understand their
                natural tendencies, strengths, and potential areas for growth.
              </p>
              <p className="text-gray-700 mb-4">
                Unlike other personality tests that measure traits or behaviors,
                the MBTI focuses on understanding your innate preferences - the
                mental processes that come most naturally to you and energize
                you when used.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Benefits of Understanding Your Type:
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Enhanced self-awareness and personal development</li>
                <li>Improved communication and relationship building</li>
                <li>Better career decision-making and job satisfaction</li>
                <li>More effective teamwork and leadership skills</li>
                <li>
                  Reduced stress through understanding natural preferences
                </li>
                <li>Greater appreciation for individual differences</li>
                <li>Improved problem-solving and decision-making approaches</li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Four Dimensions */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2
            className="text-3xl font-bold mb-12 text-center"
            style={{ color: "var(--color-header)" }}
          >
            The Four MBTI Dimensions
          </h2>

          <div className="space-y-8">
            {mbtiDimensions.map((dimension, index) => (
              <div
                key={dimension.id}
                className="grid md:grid-cols-2 min-h-[400px] relative"
              >
                {dimension.leftSide ? (
                  <>
                    <div className="p-8 flex flex-col justify-center">
                      <h3
                        className="font-bold text-2xl mb-6"
                        style={{ color: "var(--color-header)" }}
                      >
                        {dimension.title}
                      </h3>
                      <p
                        className="text-lg mb-4"
                        style={{ color: "var(--color-custom-5)" }}
                      >
                        {dimension.subtitle}
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        {dimension.description}
                      </p>
                    </div>
                    <div className="p-8">
                      <div className="space-y-6">
                        {dimension.traits.map((trait, traitIndex) => (
                          <div key={traitIndex} className="p-6 rounded-lg">
                            <h4
                              className="font-semibold text-xl mb-3"
                              style={{ color: "var(--color-header)" }}
                            >
                              {trait.name}
                            </h4>
                            <p className="text-gray-700 mb-2">
                              <strong>Focus:</strong> {trait.focus}
                            </p>
                            <p className="text-gray-700 mb-2">
                              <strong>
                                {dimension.id === 2
                                  ? "Information preference"
                                  : dimension.id === 3
                                  ? "Values"
                                  : dimension.id === 4
                                  ? "Lifestyle"
                                  : "Energy source"}
                                :
                              </strong>{" "}
                              {trait.energySource}
                            </p>
                            <p className="text-gray-700">
                              <strong>Characteristics:</strong>{" "}
                              {trait.characteristics}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-8 md:order-1">
                      <div className="space-y-6">
                        {dimension.traits.map((trait, traitIndex) => (
                          <div key={traitIndex} className="p-6 rounded-lg">
                            <h4
                              className="font-semibold text-xl mb-3"
                              style={{ color: "var(--color-header)" }}
                            >
                              {trait.name}
                            </h4>
                            <p className="text-gray-700 mb-2">
                              <strong>Focus:</strong> {trait.focus}
                            </p>
                            <p className="text-gray-700 mb-2">
                              <strong>
                                {dimension.id === 2
                                  ? "Information preference"
                                  : dimension.id === 3
                                  ? "Values"
                                  : dimension.id === 4
                                  ? "Lifestyle"
                                  : "Energy source"}
                                :
                              </strong>{" "}
                              {trait.energySource}
                            </p>
                            <p className="text-gray-700">
                              <strong>Characteristics:</strong>{" "}
                              {trait.characteristics}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-center md:order-2">
                      <h3
                        className="font-bold text-2xl mb-6"
                        style={{ color: "var(--color-header)" }}
                      >
                        {dimension.title}
                      </h3>
                      <p
                        className="text-lg mb-4"
                        style={{ color: "var(--color-custom-5)" }}
                      >
                        {dimension.subtitle}
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        {dimension.description}
                      </p>
                    </div>
                  </>
                )}
                {index < mbtiDimensions.length - 1 && (
                  <div
                    className="absolute bottom-0 left-1/5 right-1/5 h-px"
                    style={{ backgroundColor: "var(--color-custom-2)" }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* The 16 Personality Types Overview */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: "var(--color-header)" }}
          >
            The 16 MBTI Personality Types
          </h2>
          <p className="text-gray-700 mb-6 text-center max-w-4xl mx-auto">
            Each of the 16 types represents a unique combination of the four
            preferences, creating distinct personality profiles with their own
            strengths, challenges, and natural tendencies.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {personalityTypes.map((personality, index) => (
              <div
                key={personality.type}
                className="bg-gray-50 p-4 rounded-lg text-center"
              >
                <h4
                  className="font-bold text-lg"
                  style={{ color: "var(--color-custom-2)" }}
                >
                  {personality.type}
                </h4>
                <h5 className="font-semibold text-sm text-gray-800 mb-1">
                  {personality.name}
                </h5>
                <p className="text-xs text-gray-600">{personality.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Applications and Benefits */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: "var(--color-header)" }}
          >
            Real-World Applications of MBTI
          </h2>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {realWorldApplications.map((application, index) => {
              const IconComponent = application.icon;
              return (
                <div key={application.id} className="text-center relative">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "var(--color-custom-3)" }}
                  >
                    <IconComponent
                      className="w-8 h-8"
                      style={{ color: "var(--color-custom-2)" }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {application.title}
                  </h3>
                  <ul className="text-left text-gray-700 space-y-2">
                    {application.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                  {index < realWorldApplications.length - 1 && (
                    <div
                      className="absolute top-0 right-0 bottom-0 w-px hidden md:block"
                      style={{ backgroundColor: "var(--color-custom-2)" }}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* How Our Platform Works */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2
            className="text-3xl font-bold mb-6 text-center"
            style={{ color: "var(--color-header)" }}
          >
            How Our MBTI Assessment Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "var(--color-custom-3)" }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: "var(--color-custom-2)" }}
                >
                  1
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Complete the Assessment
              </h3>
              <p className="text-gray-600">
                Answer a comprehensive series of questions designed to identify
                your preferences across all four MBTI dimensions with scientific
                accuracy.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "var(--color-custom-3)" }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: "var(--color-custom-2)" }}
                >
                  2
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Receive Detailed Results
              </h3>
              <p className="text-gray-600">
                Get your complete personality profile including your four-letter
                type, detailed explanations, strengths, and development areas.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "var(--color-custom-3)" }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: "var(--color-custom-2)" }}
                >
                  3
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Apply Your Insights
              </h3>
              <p className="text-gray-600">
                Use your personality insights for personal growth, career
                development, relationship improvement, and better
                decision-making.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
