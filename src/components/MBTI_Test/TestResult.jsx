import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const TestResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const result = location.state?.result;

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Redirect if no result data
    if (!result) {
      navigate("/test");
      return;
    }
  }, [isAuthenticated, result, navigate]);

  if (!result) {
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
        "Arrogant",
        "Judgmental",
        "Overly analytical",
        "Loathe highly structured environments",
        "Clueless in romance",
      ],
    },
    INTP: {
      title: "The Thinker",
      description:
        "Innovative inventors with an unquenchable thirst for knowledge.",
      traits: ["Logical", "Abstract", "Creative", "Innovative"],
      strengths: [
        "Great analysts and abstract thinkers",
        "Imaginative and original",
        "Open-minded",
        "Enthusiastic",
        "Objective",
        "Honest and straightforward",
      ],
      weaknesses: [
        "Very private and withdrawn",
        "Insensitive",
        "Absent-minded",
        "Condescending",
        "Loathe rules and guidelines",
        "Second-guess themselves",
      ],
    },
    ENTJ: {
      title: "The Commander",
      description: "Bold, imaginative and strong-willed leaders.",
      traits: ["Leader", "Strategic", "Efficient", "Energetic"],
      strengths: [
        "Efficient",
        "Energetic",
        "Self-confident",
        "Strong-willed",
        "Strategic thinkers",
        "Charismatic and inspiring",
      ],
      weaknesses: [
        "Intolerant",
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
      traits: ["Innovative", "Enthusiastic", "Strategic", "Charismatic"],
      strengths: [
        "Knowledgeable",
        "Quick thinkers",
        "Original",
        "Excellent brainstormers",
        "Charismatic",
        "Energetic",
      ],
      weaknesses: [
        "Very argumentative",
        "Insensitive",
        "Intolerant",
        "Find it difficult to focus",
        "Dislike practical matters",
      ],
    },
    INFJ: {
      title: "The Advocate",
      description:
        "Quiet and mystical, yet very inspiring and tireless idealists.",
      traits: ["Idealistic", "Creative", "Insightful", "Inspiring"],
      strengths: [
        "Creative",
        "Insightful",
        "Inspiring and convincing",
        "Decisive",
        "Determined and passionate",
        "Altruistic",
      ],
      weaknesses: [
        "Sensitive",
        "Extremely private",
        "Perfectionist",
        "Always need to have a cause",
        "Can burn out easily",
      ],
    },
    INFP: {
      title: "The Mediator",
      description:
        "Poetic, kind and altruistic people, always eager to help a good cause.",
      traits: ["Idealistic", "Loyal", "Adaptable", "Curious"],
      strengths: [
        "Idealistic",
        "Loyal and devoted",
        "Adaptable",
        "Curious",
        "Good at communicating",
        "Hard-working",
      ],
      weaknesses: [
        "Too idealistic",
        "Too altruistic",
        "Impractical",
        "Dislike dealing with data",
        "Take things personally",
        "Difficult to get to know",
      ],
    },
    ENFJ: {
      title: "The Protagonist",
      description:
        "Charismatic and inspiring leaders, able to mesmerize their listeners.",
      traits: ["Charismatic", "Reliable", "Natural leaders", "Altruistic"],
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
        "Struggle to make tough decisions",
      ],
    },
    ENFP: {
      title: "The Campaigner",
      description: "Enthusiastic, creative and sociable free spirits.",
      traits: ["Enthusiastic", "Creative", "Sociable", "Free-spirited"],
      strengths: [
        "Enthusiastic",
        "Creative",
        "Sociable",
        "Free-spirited",
        "Good people skills",
        "Strong communication skills",
      ],
      weaknesses: [
        "Poor practical skills",
        "Find it difficult to focus",
        "Overthink things",
        "Get stressed easily",
        "Highly emotional",
        "Independent to a fault",
      ],
    },
    ISTJ: {
      title: "The Logistician",
      description: "Practical and fact-minded, reliable and responsible.",
      traits: ["Honest", "Direct", "Strong-willed", "Dutiful"],
      strengths: [
        "Honest and direct",
        "Strong-willed and dutiful",
        "Very responsible",
        "Calm and practical",
        "Create and enforce order",
        "Jacks-of-all-trades",
      ],
      weaknesses: [
        "Stubborn",
        "Insensitive",
        "Always by the book",
        "Judgmental",
        "Often unreasonably blame themselves",
      ],
    },
    ISFJ: {
      title: "The Protector",
      description:
        "Warm-hearted and dedicated, always ready to protect their loved ones.",
      traits: ["Supportive", "Reliable", "Patient", "Imaginative"],
      strengths: [
        "Supportive",
        "Reliable and patient",
        "Imaginative and observant",
        "Enthusiastic",
        "Loyal and hard-working",
        "Good practical skills",
      ],
      weaknesses: [
        "Humble and shy",
        "Take things too personally",
        "Repress their feelings",
        "Overload themselves",
        "Reluctant to change",
        "Too altruistic",
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
        "Loyal, patient and reliable",
        "Enjoy creating order",
        "Excellent organizers",
      ],
      weaknesses: [
        "Inflexible and stubborn",
        "Uncomfortable with unconventional situations",
        "Judgmental",
        "Too focused on social status",
        "Difficult to relax",
        "Difficulty expressing emotion",
      ],
    },
    ESFJ: {
      title: "The Consul",
      description:
        "Extraordinarily caring, social and popular people, always eager to help.",
      traits: [
        "Strong practical skills",
        "Warm-hearted",
        "Duty-bound",
        "Good at connecting with others",
      ],
      strengths: [
        "Strong practical skills",
        "Strong sense of duty",
        "Very loyal",
        "Sensitive and warm",
        "Good at connecting with others",
      ],
      weaknesses: [
        "Worried about their social status",
        "Inflexible",
        "Reluctant to innovate or improvise",
        "Vulnerable to criticism",
        "Often too needy",
        "Too selfless",
      ],
    },
    ISTP: {
      title: "The Virtuoso",
      description:
        "Bold and practical experimenters, masters of all kinds of tools.",
      traits: ["Tolerant", "Flexible", "Efficient", "Optimistic"],
      strengths: [
        "Tolerant and flexible",
        "Efficient and resourceful",
        "Optimistic and energetic",
        "Great in a crisis",
        "Relaxed",
      ],
      weaknesses: [
        "Stubborn",
        "Insensitive",
        "Private and reserved",
        "Easily bored",
        "Dislike commitment",
        "Risky behavior",
      ],
    },
    ISFP: {
      title: "The Adventurer",
      description:
        "Flexible and charming artists, always ready to explore new possibilities.",
      traits: ["Charming", "Sensitive to others", "Imaginative", "Passionate"],
      strengths: [
        "Charming",
        "Sensitive to others",
        "Imaginative",
        "Passionate",
        "Curious",
        "Artistic",
      ],
      weaknesses: [
        "Fiercely independent",
        "Unpredictable",
        "Easily stressed",
        "Overly competitive",
        "Fluctuating self-esteem",
      ],
    },
    ESTP: {
      title: "The Entrepreneur",
      description:
        "Smart, energetic and very perceptive people, who truly enjoy living on the edge.",
      traits: ["Bold", "Rational", "Practical", "Original"],
      strengths: [
        "Bold",
        "Rational and practical",
        "Original",
        "Perceptive",
        "Direct",
        "Sociable",
      ],
      weaknesses: [
        "Insensitive",
        "Impatient",
        "Risk-prone",
        "Unstructured",
        "May miss the bigger picture",
        "Defiant",
      ],
    },
    ESFP: {
      title: "The Entertainer",
      description:
        "Spontaneous, energetic and enthusiastic people – life is never boring around them.",
      traits: ["Bold", "Original", "Aesthetics", "Showmanship"],
      strengths: [
        "Bold",
        "Original",
        "Aesthetics and showmanship",
        "Practical",
        "Observant",
        "Excellent people skills",
      ],
      weaknesses: [
        "Sensitive",
        "Conflict-averse",
        "Easily bored",
        "Poor long-term planners",
        "Unfocused",
      ],
    },
  };

  const typeInfo = typeDescriptions[result.mbtiType] || {
    title: "Your Personality Type",
    description:
      "A unique personality type with its own strengths and characteristics.",
    traits: [],
    strengths: [],
    weaknesses: [],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">
            Your MBTI Result
          </h1>
          <p className="text-lg text-purple-700">
            Congratulations on completing the personality test!
          </p>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-purple-100 rounded-full mb-4">
              <span className="text-3xl font-bold text-purple-600">
                {result.mbtiType}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-purple-900 mb-2">
              {typeInfo.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {typeInfo.description}
            </p>
          </div>

          {/* Dimension Scores */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {result.dimensionScores &&
              Object.entries(result.dimensionScores).map(
                ([dimension, score]) => {
                  const isPositive = score > 0;
                  const percentage = Math.abs(score);
                  const dimensionPairs = {
                    "Extraversion-Introversion": isPositive
                      ? "Extraversion (E)"
                      : "Introversion (I)",
                    "Sensing-Intuition": isPositive
                      ? "Sensing (S)"
                      : "Intuition (N)",
                    "Thinking-Feeling": isPositive
                      ? "Thinking (T)"
                      : "Feeling (F)",
                    "Judging-Perceiving": isPositive
                      ? "Judging (J)"
                      : "Perceiving (P)",
                  };

                  return (
                    <div
                      key={dimension}
                      className="bg-purple-50 rounded-lg p-4"
                    >
                      <h3 className="font-semibold text-purple-900 mb-2">
                        {dimensionPairs[dimension] || dimension}
                      </h3>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {percentage}% preference
                      </p>
                    </div>
                  );
                }
              )}
          </div>
        </div>

        {/* Strengths and Traits */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">Strengths</h3>
            <ul className="space-y-2">
              {typeInfo.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Development */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-orange-700 mb-4">
              Areas for Development
            </h3>
            <ul className="space-y-2">
              {typeInfo.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Test Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold text-purple-900 mb-4">
            Test Summary
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {result.totalQuestions || "N/A"}
              </p>
              <p className="text-gray-600">Questions Answered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {new Date(result.completedAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Completed On</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {result.mbtiType}
              </p>
              <p className="text-gray-600">Your Type</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/test"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center"
          >
            Take Test Again
          </Link>
          <Link
            to="/"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-center"
          >
            Back to Home
          </Link>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Print Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
