import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoadingIcon } from "../../icons";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { oauthLogin, isLoading } = useAuth();
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    // Prevent multiple executions
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
                message: result.message || "Authentication failed. Please try again.",
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
  }, [searchParams, navigate, hasProcessed]); // Removed oauthLogin from dependencies

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="text-center">
        <LoadingIcon className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <p className="text-purple-700 text-lg">
          Completing Google authentication...
        </p>
        <p className="text-purple-500 text-sm mt-2">
          Please wait while we log you in.
        </p>
      </div>
    </div>
  );
};

export default OAuthCallback;
