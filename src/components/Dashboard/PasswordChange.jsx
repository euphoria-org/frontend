import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";
import { LoadingIcon } from "../../icons";

const PasswordChange = ({ onMessage, onError }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword) {
      onError("Current password is required");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      onError("Passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      onError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    onError("");
    onMessage("");

    try {
      const response = await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      });

      if (response.success) {
        onMessage("Password updated successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        onError(response.message || "Failed to update password");
      }
    } catch (err) {
      onError(err.message || "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    onMessage("");
    onError("");
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-white">Change Password</h4>

      {user?.authProvider !== "local" && (
        <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-3 backdrop-blur-sm">
          <p className="text-blue-300 text-sm">
            � If you signed in with{" "}
            {user?.authProvider === "google" ? "Google" : "social login"}, check
            your email for the temporary password that was sent to you when you
            first registered.
          </p>
        </div>
      )}

      <form onSubmit={handlePasswordSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            required
            placeholder="Enter your current password"
            className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            required
            minLength={6}
            className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            required
            minLength={6}
            className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm"
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-custom-2 text-white px-4 py-2 rounded-lg hover:bg-custom-2/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all duration-200"
          >
            {isLoading && <LoadingIcon className="animate-spin h-4 w-4 mr-2" />}
            Update Password
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-gray-700/80 transition-all duration-200"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;
