import React from "react";

const Meteors = ({ number = 25 }) => {
  return (
    <>
      {Array.from({ length: number }).map((_, idx) => (
        <span
          key={idx}
          className="meteor absolute h-0 w-0 animate-meteor-effect"
          style={{
            top: "-100px",
            left: `${-100 + idx * 30}px`, // Start from left side, spread meteors along top-left area
            animationDelay: `${Math.random() * 20}s`, // Much longer delays
            animationDuration: `${Math.random() * 10 + 15}s`, // Much slower: 15-25 seconds
          }}
        />
      ))}
    </>
  );
};

export default Meteors;
