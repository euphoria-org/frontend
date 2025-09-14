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
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(to bottom right, var(--color-light-blue), var(--color-light-lavender))`,
      }}
    >
      {shouldShowNavbar && <Navbar />}
      <main className={shouldShowNavbar ? "" : "min-h-screen"}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
