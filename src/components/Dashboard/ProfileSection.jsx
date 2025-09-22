import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";
import { LoadingIcon, CheckIcon, XIcon } from "../../icons";
import PasswordChange from "./PasswordChange";
import Architect from "../Avatars/Architect";
import Advocate from "../Avatars/Advocate";
import Mediator from "../Avatars/Mediator";
import Protagonist from "../Avatars/Protagonist";
import Campaigner from "../Avatars/Campaigner";
import Debater from "../Avatars/Debater";
import Logician from "../Avatars/Logician";
import Commander from "../Avatars/Commander";
import Logistician from "../Avatars/Logistician";
import Defender from "../Avatars/Defender";
import Executive from "../Avatars/Executive";
import Consul from "../Avatars/Consul";
import Virtuoso from "../Avatars/Virtuoso";
import Adventurer from "../Avatars/Adventurer";
import Entrepreneur from "../Avatars/Entrepreneur";
import Entertainer from "../Avatars/Entertainer";

const ProfileSection = () => {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [latestMBTI, setLatestMBTI] = useState(null);

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
      });
      fetchLatestMBTI();
    }
  }, [user]);

  const fetchLatestMBTI = async () => {
    try {
      const response = await authService.getUserMBTIResults();
      if (response.success && response.data.length > 0) {
        setLatestMBTI(response.data[0]); // Get the latest result
      }
    } catch (err) {
      console.error("Error fetching MBTI results:", err);
    }
  };

  const getMBTIDescription = (type) => {
    const descriptions = {
      INTJ: "The Architect",
      INTP: "The Thinker",
      ENTJ: "The Commander",
      ENTP: "The Debater",
      INFJ: "The Advocate",
      INFP: "The Mediator",
      ENFJ: "The Protagonist",
      ENFP: "The Campaigner",
      ISTJ: "The Logistician",
      ISFJ: "The Protector",
      ESTJ: "The Executive",
      ESFJ: "The Consul",
      ISTP: "The Virtuoso",
      ISFP: "The Adventurer",
      ESTP: "The Entrepreneur",
      ESFP: "The Entertainer",
    };
    return descriptions[type] || "Unknown Type";
  };

  const getAvatarComponent = (mbtiType) => {
    const avatarMap = {
      INTJ: Architect, // The Architect
      INFJ: Advocate, // The Advocate
      INFP: Mediator, // The Mediator
      ENFJ: Protagonist, // The Protagonist
      ENFP: Campaigner, // The Campaigner
      ENTP: Debater, // The Debater
      INTP: Logician, // The Logician
      ENTJ: Commander, // The Commander
      ISTJ: Logistician, // The Logistician
      ISFJ: Defender, // The Defender
      ESTJ: Executive, // The Executive
      ESFJ: Consul, // The Consul
      ISTP: Virtuoso, // The Virtuoso
      ISFP: Adventurer, // The Adventurer
      ESTP: Entrepreneur, // The Entrepreneur
      ESFP: Entertainer, // The Entertainer
    };

    const AvatarComponent = avatarMap[mbtiType];
    return AvatarComponent ? <AvatarComponent className="w-24 h-24" /> : null;
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await authService.updateProfile(profileData);
      if (response.success) {
        setMessage("Profile updated successfully!");
        updateUser(response.data);
        setIsEditing(false); // Exit edit mode after successful update
      }
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessage("");
    setError("");
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Profile</h2>

        {message && (
          <div className="mb-4 p-4 bg-green-500/20 border border-green-400/30 rounded-xl flex items-center justify-between backdrop-blur-sm">
            <div className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-green-300">{message}</span>
            </div>
            <button
              onClick={clearMessages}
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-400/30 rounded-xl flex items-center justify-between backdrop-blur-sm">
            <div className="flex items-center">
              <XIcon className="h-5 w-5 text-red-400 mr-2" />
              <span className="text-red-300">{error}</span>
            </div>
            <button
              onClick={clearMessages}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* User Profile Display Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-6">
            Profile Overview
          </h3>

          <div className={`flex items-start ${latestMBTI ? "space-x-6" : ""}`}>
            {/* Avatar Section - Only show if user has taken MBTI test */}
            {latestMBTI && (
              <div className="flex-shrink-0">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center min-h-[200px] w-[200px] flex flex-col justify-center">
                  <div className="h-32 w-32 mx-auto mb-4">
                    {getAvatarComponent(latestMBTI.mbtiType)}
                  </div>
                  <div className="space-y-2">
                    <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-bold border border-blue-400/30">
                      {latestMBTI.mbtiType}
                    </div>
                    <p className="text-white/80 text-xs">
                      {getMBTIDescription(latestMBTI.mbtiType)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 space-y-4">
              <div>
                <span className="text-sm font-medium text-white/60">Name:</span>
                <p className="text-white font-medium text-lg">{user?.name}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-white/60">
                  Email:
                </span>
                <p className="text-white">{user?.email}</p>
              </div>
              {latestMBTI && (
                <div>
                  <span className="text-sm font-medium text-white/60">
                    Personality Type:
                  </span>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-bold border border-blue-400/30">
                      {latestMBTI.mbtiType}
                    </span>
                    <span className="text-white/80">
                      {getMBTIDescription(latestMBTI.mbtiType)}
                    </span>
                  </div>
                </div>
              )}
              <div>
                <span className="text-sm font-medium text-white/60">
                  Member Since:
                </span>
                <p className="text-white">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-6">
            Account Settings
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-white">
                  Edit Profile Information
                </h4>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-custom-2 text-white px-4 py-2 rounded-lg hover:bg-custom-2/80 transition-all duration-200"
                  >
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      required
                      className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      required
                      className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-custom-2 text-white px-4 py-2 rounded-lg hover:bg-custom-2/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all duration-200"
                    >
                      {isLoading && (
                        <LoadingIcon className="animate-spin h-4 w-4 mr-2" />
                      )}
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setProfileData({
                          name: user?.name || "",
                          email: user?.email || "",
                        });
                        clearMessages();
                      }}
                      className="bg-gray-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-gray-700/80 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">
                      Name
                    </label>
                    <p className="text-white font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">
                      Email
                    </label>
                    <p className="text-white">{user?.email}</p>
                  </div>
                </div>
              )}
            </div>
            <PasswordChange onMessage={setMessage} onError={setError} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
