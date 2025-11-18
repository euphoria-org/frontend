import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Meteors from "../common/Meteors";
import Footer from "../layout/Footer";
import { AboutSkeleton } from "../common/skeletons";
import { ResultIcon, TestIcon } from "../../icons";

const PERMAAbout = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const permaDimensions = [
    {
      id: "P",
      name: "Positive Emotion",
      color: "from-pink-500 to-rose-500",
      description:
        "Cultivating sustainable happiness through gratitude, optimism, and moments of joy that energize daily life.",
      practices: [
        "Start a daily gratitude reflection",
        "Celebrate wins, no matter how small",
        "Invest in experiences that spark joy",
      ],
    },
    {
      id: "E",
      name: "Engagement",
      color: "from-indigo-500 to-blue-500",
      description:
        "Finding flow in activities that fully absorb attention and align with strengths and curiosities.",
      practices: [
        "Schedule weekly focus sessions",
        "Experiment with creative hobbies",
        "Identify tasks that create deep focus",
      ],
    },
    {
      id: "R",
      name: "Relationships",
      color: "from-emerald-500 to-teal-500",
      description:
        "Building authentic connections that provide support, compassion, and a sense of belonging.",
      practices: [
        "Reach out to someone daily",
        "Practice open and empathetic listening",
        "Create rituals that strengthen bonds",
      ],
    },
    {
      id: "M",
      name: "Meaning",
      color: "from-purple-500 to-fuchsia-500",
      description:
        "Aligning actions with personal values and contributing to something larger than oneself.",
      practices: [
        "Define your core personal values",
        "Volunteer or contribute to a cause",
        "Connect work goals to personal purpose",
      ],
    },
    {
      id: "A",
      name: "Accomplishment",
      color: "from-amber-500 to-orange-500",
      description:
        "Setting purposeful goals and celebrating progress to build confidence and motivation.",
      practices: [
        "Break goals into weekly milestones",
        "Track progress visually",
        "Celebrate learning, not only outcomes",
      ],
    },
  ];

  const wellbeingPathways = [
    {
      title: "Daily Wellbeing Rituals",
      summary:
        "Integrate science-backed micro habits that boost mood, build resilience, and foster sustainable wellbeing.",
      steps: [
        "Morning intention or gratitude practice",
        "Mid-day mindful pause or breathing reset",
        "Evening reflection using the PERMA checklist",
      ],
    },
    {
      title: "Strength-Led Living",
      summary:
        "Identify signature strengths and intentionally apply them across relationships, career, and personal growth.",
      steps: [
        "Discover top strengths through reflections",
        "Align weekly tasks with personal strengths",
        "Seek feedback to refine strength application",
      ],
    },
    {
      title: "Community Impact",
      summary:
        "Use wellbeing insights to contribute meaningfully to friends, teams, and communities in authentic ways.",
      steps: [
        "Host wellbeing check-ins with friends",
        "Champion inclusive and supportive teams",
        "Share resources that uplift collective health",
      ],
    },
  ];

  if (showSkeleton) {
    return <AboutSkeleton />;
  }

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <Meteors number={20} />
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Discover the PERMA Wellbeing Model
            </h1>
            <p className="text-xl md:text-2xl text-neutral-100 max-w-4xl mx-auto leading-relaxed">
              Developed by Dr. Martin Seligman, PERMA offers a practical roadmap
              for meaningful, vibrant, and fulfilling living across five core
              wellbeing pillars.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
              <Link
                to="/perma-test"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Take the PERMA Assessment
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white/90 border border-white/40 rounded-full hover:bg-white/10 transform hover:scale-102 transition-all duration-300 shadow-lg"
              >
                Explore MBTI Personality Science
              </Link>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 mt-12 text-sm text-neutral-100">
              {["Evidence-Based", "Actionable Insights", "Personalized Growth"].map((item) => (
                <div key={item} className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-emerald-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-10 mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-18 h-18 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-6">
                <ResultIcon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                The Five Dimensions of Flourishing
              </h2>
              <p className="text-lg text-neutral-100 max-w-3xl mx-auto">
                PERMA captures the multidimensional nature of wellbeing. Each
                pillar is measurable, buildable, and contributes uniquely to a
                thriving life.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {permaDimensions.map((dimension) => (
                <div
                  key={dimension.id}
                  className="group bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 transition-all duration-300 hover:bg-white/15"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div
                        className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${dimension.color}`}
                      >
                        {dimension.id} • {dimension.name}
                      </div>
                      <p className="mt-4 text-neutral-100 leading-relaxed">
                        {dimension.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-3">
                      Micro Practices
                    </h4>
                    <ul className="space-y-3 text-neutral-100">
                      {dimension.practices.map((practice, idx) => (
                        <li
                          key={idx}
                          className="flex items-start space-x-3 group-hover:translate-x-1 transition-transform duration-300"
                        >
                          <span className="w-2 h-2 mt-2 rounded-full bg-white/70"></span>
                          <span>{practice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {wellbeingPathways.map((pathway) => (
              <div
                key={pathway.title}
                className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 transition-all duration-300 hover:bg-white/15"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  {pathway.title}
                </h3>
                <p className="text-neutral-100 leading-relaxed mb-6">
                  {pathway.summary}
                </p>
                <div className="space-y-4">
                  {pathway.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/15 border border-white/20 text-white flex items-center justify-center font-semibold">
                        {idx + 1}
                      </div>
                      <p className="text-neutral-100 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-10 mb-16">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  Why Measure PERMA?
                </h2>
                <p className="text-neutral-100 leading-relaxed mb-6">
                  The Euphoria PERMA assessment translates wellbeing science
                  into immersive, actionable insights. Measure your baseline,
                  track growth, and plan interventions that reflect how you want
                  to live.
                </p>
                <ul className="space-y-4 text-neutral-100">
                  {[
                    "Visualize strengths and growth areas across all five dimensions",
                    "Uncover daily habits that either enhance or drain wellbeing",
                    "Receive research-backed next steps tailored to your results",
                    "Integrate findings with MBTI insights for whole-person development",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start space-x-3"
                    >
                      <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-white/70"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
                    <TestIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Ready to Thrive?
                  </h3>
                  <p className="text-neutral-100 mt-3">
                    Complete the PERMA assessment in under 10 minutes and start
                    designing your personalized wellbeing blueprint today.
                  </p>
                </div>
                <Link
                  to="/perma-test"
                  className="flex items-center justify-center px-6 py-3 text-white rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                  style={{ backgroundColor: "var(--color-custom-2)" }}
                >
                  Begin PERMA Journey
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PERMAAbout;
