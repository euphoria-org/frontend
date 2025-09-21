import React from "react";
import Meteors from "./common/Meteors";
import { useNavigate } from "react-router-dom";

export default function Error() {
    const navigate  = useNavigate();
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Meteors number={25} />
      <div className="absolute inset-0 stars-background opacity-70"></div>
      <div className="relatice z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-10 text-center">
          <h1 className="text-[100px] font-bold text-white mb-4">404</h1>
          <p className="text-[40px] text-white">Page Not Found</p>
          <div
            className="text-custom-1 mt-6 rounded-full bg-custom-2 p-4 inline-block hover:scale-105 transition-transform cursor-pointer text-xl"
            onClick={() => (navigate('/'))}
          >
            <p>Let's Move to Home Page</p>
          </div>
        </div>
      </div>
    </div>
  );
}
