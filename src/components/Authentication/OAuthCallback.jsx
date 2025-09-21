import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useMBTI } from "../../context/MBTIContext";
import { LoginSkeleton } from "../common/skeletons";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { oauthLogin, isLoading } = useAuth();
  const { claimTemporaryResult } = useMBTI();
  const [hasProcessed, setHasProcessed] = useState(false);
  const claimAttemptedRef = useRef(false);
  const processingRef = useRef(false);

  useEffect(() => {
    if (hasProcessed || processingRef.current) return;

    const handleOAuthCallback = async () => {
      processingRef.current = true;
      setHasProcessed(true);

      const token = searchParams.get("token");
      const error = searchParams.get("error");

      if (error) {
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
            const storedAnswers = localStorage.getItem("mbti_test_answers");
            const testCompleted = localStorage.getItem("mbti_test_completed");
            const sessionId = localStorage.getItem("mbti_session_id");
            const claimProcessed = localStorage.getItem("mbti_claim_processed");

            if (
              storedAnswers &&
              testCompleted &&
              sessionId &&
              !claimAttemptedRef.current &&
              !claimProcessed
            ) {
              try {
                claimAttemptedRef.current = true;
                localStorage.setItem("mbti_claim_processed", "true");
                const claimResponse = await claimTemporaryResult(sessionId);

                if (
                  claimResponse &&
                  claimResponse.success &&
                  claimResponse.result &&
                  claimResponse.result.id
                ) {
                  
                  localStorage.removeItem("mbti_test_answers");
                  localStorage.removeItem("mbti_test_completed");
                  localStorage.removeItem("mbti_session_id");
                  localStorage.removeItem("mbti_claim_processed");
                  navigate(`/result/${claimResponse.result.id}`, {
                    replace: true,
                  });
                } else {
                  console.warn(
                    "Failed to claim result:",
                    claimResponse?.message || "Unknown error"
                  );
                  localStorage.removeItem("mbti_claim_processed");
                  navigate("/test", { replace: true });
                }
              } catch (error) {
                console.error("Error claiming result:", error);
                localStorage.removeItem("mbti_claim_processed");

                // Check if it's a network error (backend not running)
                if (
                  error.message &&
                  error.message.includes("Failed to fetch")
                ) {
                  console.error(
                    "Backend server appears to be down. Please start the backend server."
                  );
                }

                navigate("/test", { replace: true });
              }
            } else {
              navigate("/", { replace: true });
            }
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
        navigate("/login", {
          state: {
            message: "Authentication failed. No token received.",
          },
        });
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate, hasProcessed]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      // Reset refs on unmount
      claimAttemptedRef.current = false;
      processingRef.current = false;
    };
  }, []);

  return <LoginSkeleton />;
};

export default OAuthCallback;
