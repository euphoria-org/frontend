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

  const getUserDisplayName = () => {
    if (!user) return "User";

    const fullName =
      user.name ||
      user.displayName ||
      user.given_name ||
      user.firstName ||
      (user.email ? user.email.split("@")[0] : "User");

    // Get name till first space or 12 characters, whichever is shorter
    const firstSpaceIndex = fullName.indexOf(" ");
    if (firstSpaceIndex > 0 && firstSpaceIndex <= 12) {
      return fullName.substring(0, firstSpaceIndex);
    }

    return fullName.length > 12 ? fullName.substring(0, 12) : fullName;
  };

  const navLinks = [
    { path: "/", label: "Home", icon: HomeIcon },

    { path: "/about", label: "About", icon: AboutIcon },
  ];

  return (
    <>
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-full px-8 py-3">
          <div className="flex items-center space-x-10">
            <Link
              to="/"
              className="flex items-center space-x-3 text-xl font-bold transition-colors text-white drop-shadow-sm"
            >
              <img src="/Logo.png" alt="Euphoria Logo" className="w-12 h-12" />
              <span>Euphoria</span>
            </Link>

            <div className="flex items-center space-x-8">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActivePage(path) ? "shadow-md" : "hover:bg-white/20"
                  }`}
                  style={
                    isActivePage(path)
                      ? {
                          backgroundColor: "var(--color-custom-2)",
                          color: "#ffffff",
                        }
                      : {
                          color: "#ffffff",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!isActivePage(path)) {
                      e.target.style.color = "var(--color-custom-4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActivePage(path)) {
                      e.target.style.color = "#ffffff";
                    }
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-5">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 min-w-max">
                    <ProfileIcon className="w-4 h-4 text-white" />
                    <span className="text-sm font-medium text-white">
                      {getUserDisplayName()}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-full text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
                    title="Logout"
                  >
                    <LogoutIcon className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-white hover:text-blue-300 transition-colors"
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
        <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg px-4 py-3">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-3 text-xl font-bold text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img src="/Logo.png" alt="Euphoria Logo" className="w-10 h-10" />
              <span>Euphoria</span>
            </Link>

            <div className="flex items-center space-x-3">
              {isAuthenticated && (
                <div className="flex items-center space-x-2 px-2 py-1 rounded-full bg-white/20">
                  <ProfileIcon className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    {getUserDisplayName()}
                  </span>
                </div>
              )}

              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
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
                      isActivePage(path) ? "shadow-md" : "hover:bg-white/20"
                    }`}
                    style={
                      isActivePage(path)
                        ? {
                            backgroundColor: "var(--color-custom-2)",
                            color: "#ffffff",
                          }
                        : {
                            color: "#ffffff",
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
                      className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/20 transition-all duration-200"
                    >
                      <LogoutIcon className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-sm font-medium text-white hover:bg-white/20 transition-colors"
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
