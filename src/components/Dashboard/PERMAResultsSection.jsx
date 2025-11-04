import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { LoadingIcon, TestIcon, ResultIcon } from "../../icons";
import { MBTIResultsSkeleton } from "../common/skeletons";

const PERMAResultsSection = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPERMAResults();
  }, []);

  const fetchPERMAResults = async () => {
    try {
      setIsLoading(true);
      const response = await authService.getUserPERMAResults();
      if (response.success) {
        setResults(response.data);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch PERMA results");
    } finally {
      setIsLoading(false);
    }
  };

  const getWellbeingLevelInfo = (level) => {
    const levels = {
      "Very Low": {
        color: "red",
        description: "Needs significant improvement in wellbeing",
      },
      Low: {
        color: "orange",
        description: "Below average wellbeing levels",
      },
      Moderate: {
        color: "yellow",
        description: "Average wellbeing levels",
      },
      High: {
        color: "green",
        description: "Above average wellbeing",
      },
      "Very High": {
        color: "emerald",
        description: "Exceptional wellbeing levels",
      },
    };
    return (
      levels[level] || {
        color: "gray",
        description: "Wellbeing level unknown",
      }
    );
  };

  const getDimensionColor = (dimension) => {
    const colors = {
      P: "purple",
      E: "blue",
      R: "pink",
      M: "yellow",
      A: "green",
    };
    return colors[dimension] || "gray";
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
            onClick={fetchPERMAResults}
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
        <h2 className="text-2xl font-semibold text-white">
          Your PERMA Results
        </h2>
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
            No PERMA Results Yet
          </h3>
          <p className="text-white/60 mb-4">
            You haven't taken any PERMA wellbeing assessments yet. Take your
            first test to discover your wellbeing profile!
          </p>
          <a
            href="/perma-test"
            className="bg-custom-2 text-white px-6 py-2 rounded-full hover:bg-custom-2/80 transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <TestIcon className="h-4 w-4 mr-2" />
            Take PERMA Test
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
                      Wellbeing Level
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">
                      Average Score
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">
                      Dimensions
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
                  {results.map((result, index) => {
                    const levelInfo = getWellbeingLevelInfo(
                      result.wellbeingLevel
                    );
                    return (
                      <tr
                        key={result._id}
                        className="hover:bg-white/5 transition-all duration-200 cursor-pointer group"
                        onClick={() => navigate(`/perma-result/${result._id}`)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="bg-purple-500/20 p-2 rounded-full border border-purple-400/30">
                              <ResultIcon className="h-4 w-4 text-purple-400" />
                            </div>
                            <span className="text-white font-medium">
                              #{results.length - index}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col space-y-1">
                            <span
                              className={`bg-${levelInfo.color}-500/20 text-${levelInfo.color}-300 px-3 py-1 rounded-full text-sm font-bold border border-${levelInfo.color}-400/30 inline-block w-fit`}
                            >
                              {result.wellbeingLevel}
                            </span>
                            <span className="text-white/60 text-xs">
                              {levelInfo.description}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="text-white font-bold text-lg">
                              {result.averageScore?.toFixed(1)}
                            </div>
                            <div className="text-white/60 text-sm">/ 10</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(result.scores || {}).map(
                              ([dimension, score]) => (
                                <div
                                  key={dimension}
                                  className={`bg-${getDimensionColor(
                                    dimension
                                  )}-500/20 text-${getDimensionColor(
                                    dimension
                                  )}-300 px-2 py-1 rounded text-xs font-semibold border border-${getDimensionColor(
                                    dimension
                                  )}-400/30`}
                                >
                                  {dimension}: {score?.toFixed(1)}
                                </div>
                              )
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-white/70 text-sm">
                            {formatDate(result.completedAt || result.createdAt)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-200 group-hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/perma-result/${result._id}`);
                            }}
                          >
                            View Details →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PERMAResultsSection;
