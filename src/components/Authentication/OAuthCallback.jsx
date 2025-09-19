import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../common/Loading";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { oauthLogin, isLoading } = useAuth();
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    if (hasProcessed) return;

    const handleOAuthCallback = async () => {
      setHasProcessed(true);

      const token = searchParams.get("token");
      const error = searchParams.get("error");

      if (error) {
        // Handle OAuth error
        console.error("OAuth error:", error);
        navigate("/login", {
          state: {
            message: "Google authentication failed. Please try again.",
          },
        });
        return;
      }

      if (token) {
        try {
          const result = await oauthLogin(token);

          if (result.success) {
            // Redirect to home page
            navigate("/", { replace: true });
          } else {
            navigate("/login", {
              state: {
                message:
                  result.message || "Authentication failed. Please try again.",
              },
            });
          }
        } catch (error) {
          console.error("Error processing OAuth callback:", error);
          navigate("/login", {
            state: {
              message: "Authentication failed. Please try again.",
            },
          });
        }
      } else {
        // No token received
        navigate("/login", {
          state: {
            message: "Authentication failed. No token received.",
          },
        });
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate, hasProcessed]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl text-center">
        <Loading
          message="Completing Google authentication..."
          size="large"
          variant="custom"
        />
        <p className="text-gray-600 text-sm mt-4">
          Please wait while we log you in.
        </p>
      </div>
    </div>
  );
};

export default OAuthCallback;
