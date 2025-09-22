import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileSection from "./ProfileSection";
import MBTIResultsSection from "./MBTIResultsSection";
import Footer from "../layout/Footer";
import { UserIcon, TestIcon, PermaIcon, IQIcon } from "../../icons";
import Meteors from "../common/Meteors";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: UserIcon, disabled: false },
    {
      id: "mbti-results",
      label: "MBTI Results",
      icon: TestIcon,
      disabled: false,
    },
    {
      id: "perma-results",
      label: "PERMA Results",
      icon: PermaIcon,
      disabled: true,
    },
    { id: "iq-results", label: "IQ Results", icon: IQIcon, disabled: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 stars-background opacity-70"></div>

      <Meteors number={25} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Dashboard
          </h1>
          <p className="text-white/80 mt-2 text-lg">
            Welcome back, {user?.name}!
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-3 shadow-xl max-w-fit mx-auto">
            <nav className="flex space-x-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => !tab.disabled && setActiveTab(tab.id)}
                    disabled={tab.disabled}
                    className={`${
                      activeTab === tab.id && !tab.disabled
                        ? "bg-white/25 text-white shadow-lg scale-105"
                        : tab.disabled
                        ? "text-white/30 cursor-not-allowed"
                        : "text-white/70 hover:text-white hover:bg-white/15 hover:scale-102"
                    } flex items-center space-x-2 px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-200 backdrop-blur-sm relative group min-w-max`}
                    title={tab.disabled ? "Coming Soon" : ""}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                    {tab.disabled && (
                      <div className="absolute -top-1 -right-1 bg-yellow-500/80 text-yellow-900 text-xs px-1.5 py-0.5 rounded-full font-bold backdrop-blur-sm">
                        Soon
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden">
          {activeTab === "profile" && <ProfileSection />}
          {activeTab === "mbti-results" && <MBTIResultsSection />}
          {activeTab === "perma-results" && (
            <div className="p-8 text-center">
              <PermaIcon className="h-16 w-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                PERMA Results
              </h3>
              <p className="text-white/60">
                PERMA wellbeing assessment results will be available here once
                the test is implemented.
              </p>
            </div>
          )}
          {activeTab === "iq-results" && (
            <div className="p-8 text-center">
              <IQIcon className="h-16 w-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                IQ Results
              </h3>
              <p className="text-white/60">
                Intelligence assessment results will be available here once the
                test is implemented.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
