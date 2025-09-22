import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { LoadingIcon, TestIcon, ResultIcon } from "../../icons";
import { MBTIResultsSkeleton } from "../common/skeletons";

const MBTIResultsSection = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMBTIResults();
  }, []);

  const fetchMBTIResults = async () => {
    try {
      setIsLoading(true);
      const response = await authService.getUserMBTIResults();
      if (response.success) {
        setResults(response.data);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch MBTI results");
    } finally {
      setIsLoading(false);
    }
  };

  const getMBTIDescription = (type) => {
    const descriptions = {
      INTJ: "The Architect - Strategic and insightful, they see the big picture.",
      INTP: "The Thinker - Logical and innovative, they love theories and abstract concepts.",
      ENTJ: "The Commander - Natural leaders who are strategic and goal-oriented.",
      ENTP: "The Debater - Quick-witted and clever, they love intellectual challenges.",
      INFJ: "The Advocate - Creative and insightful, they inspire others.",
      INFP: "The Mediator - Idealistic and loyal, they value harmony and authenticity.",
      ENFJ: "The Protagonist - Charismatic and inspiring, they care deeply about others.",
      ENFP: "The Campaigner - Enthusiastic and creative, they see potential everywhere.",
      ISTJ: "The Logistician - Practical and fact-minded, they are reliable and responsible.",
      ISFJ: "The Protector - Warm-hearted and dedicated, they are always ready to help.",
      ESTJ: "The Executive - Organized and decisive, they are natural administrators.",
      ESFJ: "The Consul - Caring and social, they are eager to help others.",
      ISTP: "The Virtuoso - Bold and practical, they are masters of tools and techniques.",
      ISFP: "The Adventurer - Flexible and charming, they are true artists in life.",
      ESTP: "The Entrepreneur - Smart, energetic, and perceptive, they enjoy living on the edge.",
      ESFP: "The Entertainer - Spontaneous and enthusiastic, they love being the center of attention.",
    };
    return descriptions[type] || "Unknown personality type";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return <MBTIResultsSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center">
            <div className="text-red-400 mr-2">⚠️</div>
            <span className="text-red-300">{error}</span>
          </div>
          <button
            onClick={fetchMBTIResults}
            className="mt-3 bg-custom-2 text-white px-4 py-2 rounded-lg hover:bg-custom-2/80 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">Your MBTI Results</h2>
        <div className="flex items-center space-x-2 text-sm text-white/60">
          <TestIcon className="h-4 w-4" />
          <span>
            {results.length} test{results.length !== 1 ? "s" : ""} completed
          </span>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-12">
          <TestIcon className="mx-auto h-12 w-12 text-white/40 mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            No MBTI Results Yet
          </h3>
          <p className="text-white/60 mb-4">
            You haven't taken any MBTI tests yet. Take your first test to
            discover your personality type!
          </p>
          <a
            href="/test"
            className="bg-custom-2 text-white px-6 py-2 rounded-full hover:bg-custom-2/80 transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <TestIcon className="h-4 w-4 mr-2" />
            Take MBTI Test
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Results Table */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/10 border-b border-white/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">
                      Test #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">
                      Personality Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">
                      Completed Date
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white/80">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {results.map((result, index) => (
                    <tr
                      key={result._id}
                      className="hover:bg-white/5 transition-all duration-200 cursor-pointer group"
                      onClick={() => navigate(`/result/${result._id}`)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="bg-blue-500/20 p-2 rounded-full border border-blue-400/30">
                            <ResultIcon className="h-4 w-4 text-blue-400" />
                          </div>
                          <span className="text-white font-medium">
                            #{results.length - index}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-bold border border-blue-400/30">
                            {result.mbtiType}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-white font-medium">
                            {
                              getMBTIDescription(result.mbtiType).split(
                                " - "
                              )[0]
                            }
                          </div>
                          <div className="text-white/60 text-sm">
                            {
                              getMBTIDescription(result.mbtiType).split(
                                " - "
                              )[1]
                            }
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white/70 text-sm">
                          {formatDate(result.completedAt || result.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200 group-hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/result/${result._id}`);
                          }}
                        >
                          View Details →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MBTIResultsSection;
