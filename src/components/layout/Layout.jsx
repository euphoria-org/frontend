import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/update-password",
    "/auth/success",
  ];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Static stars background with CSS */}
      <div className="absolute inset-0 stars-background opacity-70"></div>

      {shouldShowNavbar && <Navbar />}
      <main
        className={`relative z-10 ${shouldShowNavbar ? "" : "min-h-screen"}`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
