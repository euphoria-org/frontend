import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useMBTI } from "../../context/MBTIContext";

const TestResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { result } = useMBTI();

  const rawResultData = location.state?.result || result;

  const resultData = rawResultData?.result || rawResultData;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Redirect if no result data
    if (!resultData) {
      navigate("/test");
      return;
    }
  }, [isAuthenticated, resultData, navigate]);

  if (!resultData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="text-center">
          <p className="text-purple-700 text-lg">Loading your results...</p>
        </div>
      </div>
    );
  }

  // MBTI type descriptions
  const typeDescriptions = {
    INTJ: {
      title: "The Architect",
      description:
        "Imaginative and strategic thinkers, with a plan for everything.",
      traits: ["Independent", "Decisive", "Hard-working", "Determined"],
      strengths: [
        "Strategic thinking",
        "Independent",
        "Decisive",
        "Hard-working",
        "Determined",
      ],
      weaknesses: [
        "Overly critical",
        "Arrogant",
        "Judgmental",
        "Loathe highly structured environments",
      ],
    },
    INTP: {
      title: "The Thinker",
      description:
        "Innovative inventors with an unquenchable thirst for knowledge.",
      traits: ["Logical", "Abstract", "Creative", "Innovative"],
      strengths: [
        "Great analysts",
        "Imaginative",
        "Open-minded",
        "Enthusiastic",
        "Objective",
      ],
      weaknesses: [
        "Very private",
        "Insensitive",
        "Absent-minded",
        "Condescending",
      ],
    },
    ENTJ: {
      title: "The Commander",
      description:
        "Bold, imaginative and strong-willed leaders, always finding a way or making one.",
      traits: ["Efficient", "Energetic", "Self-confident", "Strong-willed"],
      strengths: [
        "Efficient",
        "Energetic",
        "Self-confident",
        "Strong-willed",
        "Strategic thinkers",
      ],
      weaknesses: [
        "Impatient",
        "Arrogant",
        "Poor handling of emotions",
        "Cold and ruthless",
      ],
    },
    ENTP: {
      title: "The Debater",
      description:
        "Smart and curious thinkers who cannot resist an intellectual challenge.",
      traits: ["Knowledgeable", "Quick", "Original", "Excellent brainstormers"],
      strengths: [
        "Knowledgeable",
        "Quick thinkers",
        "Original",
        "Excellent brainstormers",
        "Charismatic",
      ],
      weaknesses: [
        "Very argumentative",
        "Insensitive",
        "Intolerant",
        "Can find it difficult to focus",
      ],
    },
    INFJ: {
      title: "The Advocate",
      description:
        "Quiet and mystical, yet very inspiring and tireless idealists.",
      traits: ["Creative", "Insightful", "Inspiring", "Convincing"],
      strengths: [
        "Creative",
        "Insightful",
        "Inspiring",
        "Convincing",
        "Decisive",
        "Determined",
      ],
      weaknesses: [
        "Sensitive",
        "Extremely private",
        "Perfectionist",
        "Always need to have a cause",
      ],
    },
    INFP: {
      title: "The Mediator",
      description:
        "Poetic, kind and altruistic people, always eager to help a good cause.",
      traits: ["Idealistic", "Loyal", "Adaptive", "Curious"],
      strengths: [
        "Idealistic",
        "Loyal and devoted",
        "Adaptive",
        "Curious",
        "Passionate and energetic",
      ],
      weaknesses: [
        "Too idealistic",
        "Too altruistic",
        "Impractical",
        "Dislike dealing with data",
      ],
    },
    ENFJ: {
      title: "The Protagonist",
      description:
        "Charismatic and inspiring leaders, able to mesmerize their listeners.",
      traits: ["Tolerant", "Reliable", "Charismatic", "Altruistic"],
      strengths: [
        "Tolerant",
        "Reliable",
        "Charismatic",
        "Altruistic",
        "Natural leaders",
      ],
      weaknesses: [
        "Overly idealistic",
        "Too selfless",
        "Too sensitive",
        "Fluctuating self-esteem",
      ],
    },
    ENFP: {
      title: "The Campaigner",
      description:
        "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.",
      traits: ["Enthusiastic", "Creative", "Sociable", "Energetic"],
      strengths: [
        "Enthusiastic",
        "Creative",
        "Sociable",
        "Energetic",
        "Very popular and friendly",
      ],
      weaknesses: [
        "Poor practical skills",
        "Find it difficult to focus",
        "Overthink things",
        "Get stressed easily",
      ],
    },
    ISTJ: {
      title: "The Logistician",
      description: "Practical and fact-minded, reliable and responsible.",
      traits: ["Honest", "Direct", "Strong-willed", "Dutiful"],
      strengths: [
        "Honest and direct",
        "Strong-willed",
        "Very responsible",
        "Calm and practical",
      ],
      weaknesses: [
        "Stubborn",
        "Insensitive",
        "Always by the book",
        "Judgmental",
      ],
    },
    ISFJ: {
      title: "The Protector",
      description:
        "Very dedicated and warm protectors, always ready to defend their loved ones.",
      traits: ["Supportive", "Reliable", "Patient", "Imaginative"],
      strengths: [
        "Supportive",
        "Reliable and patient",
        "Imaginative and observant",
        "Enthusiastic",
      ],
      weaknesses: [
        "Humble and shy",
        "Take things too personally",
        "Repress their feelings",
        "Overload themselves",
      ],
    },
    ESTJ: {
      title: "The Executive",
      description:
        "Excellent administrators, unsurpassed at managing things or people.",
      traits: ["Dedicated", "Strong-willed", "Direct", "Honest"],
      strengths: [
        "Dedicated",
        "Strong-willed",
        "Direct and honest",
        "Loyal and hard-working",
      ],
      weaknesses: [
        "Inflexible",
        "Uncomfortable with unconventional situations",
        "Judgmental",
        "Too focused on social status",
      ],
    },
    ESFJ: {
      title: "The Consul",
      description:
        "Extraordinarily caring, social and popular people, always eager to help.",
      traits: [
        "Strong practical skills",
        "Strong sense of duty",
        "Very loyal",
        "Sensitive and warm",
      ],
      strengths: [
        "Strong practical skills",
        "Strong sense of duty",
        "Very loyal",
        "Sensitive and warm",
      ],
      weaknesses: [
        "Worried about their social status",
        "Inflexible",
        "Reluctant to innovate",
        "Vulnerable to criticism",
      ],
    },
    ISTP: {
      title: "The Virtuoso",
      description:
        "Bold and practical experimenters, masters of all kinds of tools.",
      traits: ["Tolerant", "Flexible", "Charming", "Unpredictable"],
      strengths: [
        "Tolerant and flexible",
        "Charming",
        "Unpredictable",
        "Practical and realistic",
      ],
      weaknesses: [
        "Stubborn",
        "Insensitive",
        "Private and reserved",
        "Easily bored",
      ],
    },
    ISFP: {
      title: "The Adventurer",
      description:
        "Flexible and charming artists, always ready to explore new possibilities.",
      traits: ["Charming", "Sensitive", "Imaginative", "Passionate"],
      strengths: [
        "Charming",
        "Sensitive to others",
        "Imaginative",
        "Passionate and energetic",
      ],
      weaknesses: [
        "Fiercely independent",
        "Unpredictable",
        "Easily stressed",
        "Overly competitive",
      ],
    },
    ESTP: {
      title: "The Entrepreneur",
      description:
        "Smart, energetic and very perceptive people, who truly enjoy living on the edge.",
      traits: [
        "Tolerant",
        "Energetic",
        "Very perceptive",
        "Excellent people skills",
      ],
      strengths: [
        "Tolerant",
        "Energetic",
        "Very perceptive",
        "Excellent people skills",
      ],
      weaknesses: [
        "Sensitive",
        "Conflict-averse",
        "Easily bored",
        "Poor long-term planners",
      ],
    },
    ESFP: {
      title: "The Entertainer",
      description:
        "Spontaneous, energetic and enthusiastic people – life is never boring around them.",
      traits: ["Bold", "Practical", "Original", "Perceptive"],
      strengths: ["Bold", "Practical", "Original", "Perceptive", "Direct"],
      weaknesses: [
        "Sensitive",
        "Conflict-averse",
        "Easily bored",
        "Poor long-term planners",
      ],
    },
  };

  const typeInfo = typeDescriptions[resultData.mbtiType] || {
    title: "Unknown Type",
    description: "Description not available",
    traits: [],
    strengths: [],
    weaknesses: [],
  };

  const getDimensionName = (dimension) => {
    const dimensionNames = {
      E: "Extraversion",
      I: "Introversion",
      S: "Sensing",
      N: "Intuition",
      T: "Thinking",
      F: "Feeling",
      J: "Judging",
      P: "Perceiving",
    };
    return dimensionNames[dimension] || dimension;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">
            Your MBTI Results
          </h1>
          <p className="text-purple-700 text-lg">
            Discover your unique personality type and unlock your potential
          </p>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-purple-100 rounded-full mb-4">
              <span className="text-3xl font-bold text-purple-600">
                {resultData.mbtiType}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-purple-900 mb-2">
              {typeInfo.title}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {typeInfo.description || resultData.description}
            </p>
          </div>

          {/* Dimension Scores */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {resultData.scores &&
              Object.entries(resultData.scores).map(([dimension, score]) => (
                <div
                  key={dimension}
                  className="text-center p-4 bg-purple-50 rounded-lg"
                >
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {dimension}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {getDimensionName(dimension)}
                  </div>
                  <div className="text-lg font-semibold text-purple-800">
                    {score}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Strengths and Weaknesses */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                ✓
              </span>
              Strengths
            </h3>
            <ul className="space-y-2">
              {typeInfo.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Growth */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                ⚡
              </span>
              Areas for Growth
            </h3>
            <ul className="space-y-2">
              {typeInfo.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key Traits */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-purple-800 mb-4">Key Traits</h3>
          <div className="flex flex-wrap gap-3">
            {typeInfo.traits.map((trait, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Test Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-purple-800 mb-4">
            Test Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {Object.keys(resultData.scores || {}).length * 5 || "N/A"}
              </div>
              <div className="text-sm text-gray-600">Questions Answered</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {new Date().toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-600">Completion Date</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {resultData.mbtiType}
              </div>
              <div className="text-sm text-gray-600">Your Type</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/test"
            className="inline-flex items-center justify-center px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
          >
            Take Test Again
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
