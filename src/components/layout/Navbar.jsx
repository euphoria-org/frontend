import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  HomeIcon,
  TestIcon,
  AboutIcon,
  ResultIcon,
  ProfileIcon,
  LogoutIcon,
  MenuIcon,
  CloseIcon,
} from "../../icons";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActivePage = (path) => {
    return location.pathname === path;
  };

  // Helper function to get user display name
  const getUserDisplayName = () => {
    if (!user) return "User";

    // Try different possible name fields from OAuth providers
    return (
      user.name ||
      user.displayName ||
      user.given_name ||
      user.firstName ||
      (user.email ? user.email.split("@")[0] : "User")
    );
  };

  const navLinks = [
    { path: "/", label: "Home", icon: HomeIcon },
    { path: "/test", label: "Test", icon: TestIcon },
    { path: "/about", label: "About", icon: AboutIcon },
    { path: "/result", label: "Result", icon: ResultIcon },
  ];

  return (
    <>
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 shadow-lg shadow-black/25">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-xl font-bold hover:text-purple-600 transition-colors"
              style={{ color: "var(--color-navbar-link)" }}
            >
              Euphoria
            </Link>

            <div className="flex items-center space-x-6">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActivePage(path) ? "shadow-md" : "hover:bg-white/50"
                  }`}
                  style={
                    isActivePage(path)
                      ? {
                          backgroundColor: "var(--color-custom-2)",
                          color: "#ffffff",
                        }
                      : {
                          color: "var(--color-navbar-link)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!isActivePage(path)) {
                      e.target.style.color = "var(--color-custom-2)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActivePage(path)) {
                      e.target.style.color = "var(--color-navbar-link)";
                    }
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-full bg-white/50">
                    <ProfileIcon
                      className="w-4 h-4"
                      style={{ color: "var(--color-navbar-link)" }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--color-navbar-link)" }}
                    >
                      {getUserDisplayName()}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-full text-red-600 hover:bg-red-50/50 hover:text-red-700 transition-all duration-200"
                    title="Logout"
                  >
                    <LogoutIcon className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium hover:text-purple-600 transition-colors"
                    style={{ color: "var(--color-navbar-link)" }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium text-white rounded-full transition-colors shadow-md"
                    style={{
                      backgroundColor: "var(--color-custom-2)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "var(--color-custom-4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "var(--color-custom-2)";
                    }}
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-white/60 backdrop-blur-xl border-b border-white/20 px-4 py-3 shadow-lg">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-xl font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ color: "var(--color-navbar-link)" }}
            >
              Euphoria
            </Link>

            <div className="flex items-center space-x-3">
              {isAuthenticated && (
                <div className="flex items-center space-x-2 px-2 py-1 rounded-full bg-white/50">
                  <ProfileIcon
                    className="w-4 h-4"
                    style={{ color: "var(--color-navbar-link)" }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-navbar-link)" }}
                  >
                    {getUserDisplayName()}
                  </span>
                </div>
              )}

              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
                style={{ color: "var(--color-navbar-link)" }}
              >
                {isMobileMenuOpen ? (
                  <CloseIcon className="w-5 h-5" />
                ) : (
                  <MenuIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="mt-4 pb-4 border-t border-white/20">
              <div className="flex flex-col space-y-2 pt-4">
                {navLinks.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActivePage(path) ? "shadow-md" : "hover:bg-white/50"
                    }`}
                    style={
                      isActivePage(path)
                        ? {
                            backgroundColor: "var(--color-custom-2)",
                            color: "#ffffff",
                          }
                        : {
                            color: "var(--color-navbar-link)",
                          }
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </Link>
                ))}
                <div className="pt-4 border-t border-white/20">
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50/50 transition-all duration-200"
                    >
                      <LogoutIcon className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-sm font-medium hover:bg-white/50 transition-colors"
                        style={{ color: "var(--color-navbar-link)" }}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-sm font-medium text-white transition-colors"
                        style={{
                          backgroundColor: "var(--color-custom-2)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor =
                            "var(--color-custom-4)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor =
                            "var(--color-custom-2)";
                        }}
                      >
                        Signup
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="h-20 md:h-24"></div>
    </>
  );
};

export default Navbar;
