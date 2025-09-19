import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MBTIProvider } from "./context/MBTIContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import UpdatePassword from "./components/Authentication/UpdatePassword";
import OAuthCallback from "./components/Authentication/OAuthCallback";
import MBTITest from "./components/MBTI_Test/MBTITest";
import TestResult from "./components/MBTI_Test/TestResult";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <AuthProvider>
      <MBTIProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="test" element={<MBTITest />} />
              <Route path="result" element={<TestResult />} />
              <Route path="result/:resultId" element={<TestResult />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/reset-password" element={<UpdatePassword />} />
            <Route path="/auth/success" element={<OAuthCallback />} />
          </Routes>
        </BrowserRouter>
      </MBTIProvider>
    </AuthProvider>
  );
}

export default App;
