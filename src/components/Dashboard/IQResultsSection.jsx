import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { iqService } from "../../services/iqService";
import { LoadingIcon, IQIcon, ResultIcon } from "../../icons";
import { IQResultsSkeleton } from "../common/skeletons";

const IQResultsSection = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchIQResults();
  }, []);

  const fetchIQResults = async () => {
    try {
      setIsLoading(true);
      const response = await iqService.getUserResults();
      if (response.success) {
        setResults(response.data);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch IQ results");
    } finally {
      setIsLoading(false);
    }
  };

  const getIQLevelDescription = (level) => {
    const descriptions = {
      "Genius": "Exceptional cognitive abilities and problem-solving skills.",
      "Very Superior": "Outstanding intellectual capabilities and reasoning.",
      "Superior": "Above average intelligence with strong analytical skills.",
      "High Average": "Good cognitive abilities with solid reasoning skills.",
      "Average": "Normal range of intellectual functioning.",
      "Low Average": "Below average cognitive abilities but functional.",
      "Borderline": "Limited intellectual functioning requiring support.",
    };
    return descriptions[level] || "Intelligence assessment completed";
  };

  const getIQLevelColor = (level) => {
    const colors = {
      "Genius": "purple",
      "Very Superior": "blue",
      "Superior": "cyan",
      "High Average": "green",
      "Average": "yellow",
      "Low Average": "orange",
      "Borderline": "red",
    };
    return colors[level] || "gray";
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
    return <IQResultsSkeleton />;
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
            onClick={fetchIQResults}
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
        <h2 className="text-2xl font-semibold text-white">Your IQ Results</h2>
        <div className="flex items-center space-x-2 text-sm text-white/60">
          <IQIcon className="h-4 w-4" />
          <span>
            {results.length} test{results.length !== 1 ? "s" : ""} completed
          </span>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-12">
          <IQIcon className="mx-auto h-12 w-12 text-white/40 mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            No IQ Results Yet
          </h3>
          <p className="text-white/60 mb-4">
            You haven't taken any IQ tests yet. Take your first test to
            assess your cognitive abilities!
          </p>
          <a
            href="/iq-test"
            className="bg-custom-2 text-white px-6 py-2 rounded-full hover:bg-custom-2/80 transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <IQIcon className="h-4 w-4 mr-2" />
            Take IQ Test
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
                      IQ Score
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">
                      Intelligence Level
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">
                      Percentile
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
                    const levelColor = getIQLevelColor(result.iqLevel);
                    return (
                      <tr
                        key={result._id}
                        className="hover:bg-white/5 transition-all duration-200 cursor-pointer group"
                        onClick={() => navigate(`/iq-result/${result._id}`)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className={`bg-${levelColor}-500/20 p-2 rounded-full border border-${levelColor}-400/30`}>
                              <ResultIcon className={`h-4 w-4 text-${levelColor}-400`} />
                            </div>
                            <span className="text-white font-medium">
                              #{results.length - index}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <span className={`bg-${levelColor}-500/20 text-${levelColor}-300 px-4 py-1 rounded-full text-lg font-bold border border-${levelColor}-400/30`}>
                              {result.iqScore}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-white font-medium">
                              {result.iqLevel}
                            </div>
                            <div className="text-white/60 text-sm">
                              {getIQLevelDescription(result.iqLevel)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-white/10 rounded-full h-2">
                              <div
                                className={`bg-${levelColor}-400 h-2 rounded-full transition-all duration-500`}
                                style={{ width: `${result.percentile}%` }}
                              ></div>
                            </div>
                            <span className="text-white/70 text-sm font-medium">
                              {result.percentile}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-white/70 text-sm">
                            {formatDate(result.completedAt || result.createdAt)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            className={`text-${levelColor}-400 hover:text-${levelColor}-300 text-sm font-medium transition-colors duration-200 group-hover:underline`}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/iq-result/${result._id}`);
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

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Latest Score</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {results[0]?.iqScore || 0}
                  </p>
                </div>
                <div className="bg-purple-500/20 p-3 rounded-full">
                  <IQIcon className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Highest Score</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {Math.max(...results.map((r) => r.iqScore)) || 0}
                  </p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-full">
                  <IQIcon className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Average Score</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {results.length > 0
                      ? Math.round(
                          results.reduce((sum, r) => sum + r.iqScore, 0) /
                            results.length
                        )
                      : 0}
                  </p>
                </div>
                <div className="bg-blue-500/20 p-3 rounded-full">
                  <IQIcon className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IQResultsSection;
