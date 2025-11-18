import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MBTIProvider } from "./context/MBTIContext";
import { PERMAProvider } from "./context/PERMAContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import About from "./components/About";
import PERMAAbout from "./components/PERMA_Test/PERMAAbout";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import UpdatePassword from "./components/Authentication/UpdatePassword";
import OAuthCallback from "./components/Authentication/OAuthCallback";
import MBTITest from "./components/MBTI_Test/MBTITest";
import TestResult from "./components/MBTI_Test/TestResult";
import PERMATest from "./components/PERMA_Test/PERMATest";
import PERMAResult from "./components/PERMA_Test/PERMAResult";
import Dashboard from "./components/Dashboard/Dashboard";
import ScrollToTop from "./components/common/ScrollToTop";
import Error from "./components/Error";

function App() {
  return (
    <AuthProvider>
      <MBTIProvider>
        <PERMAProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="about/perma" element={<PERMAAbout />} />
                <Route path="about/mbti" element={<About />} />
                <Route path="test" element={<MBTITest />} />
                <Route path="result" element={<TestResult />} />
                <Route path="result/:resultId" element={<TestResult />} />
                <Route path="perma-test" element={<PERMATest />} />
                <Route path="perma-result" element={<PERMAResult />} />
                <Route path="perma-result/:resultId" element={<PERMAResult />} />
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route path="/reset-password" element={<UpdatePassword />} />
              <Route path="/auth/success" element={<OAuthCallback />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </PERMAProvider>
      </MBTIProvider>
    </AuthProvider>
  );
}

export default App;
