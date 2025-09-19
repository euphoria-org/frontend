import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerSections = [
    {
      id: 1,
      title: "Quick Links",
      links: [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
        { label: "Take Test", path: "/test" },
        { label: "Results", path: "/result" },
      ],
    },
    {
      id: 2,
      title: "Our Tests",
      links: [
        { label: "MBTI Personality Test", path: null },
        { label: "PERMA IQ Assessment", path: null },
        { label: "More coming soon...", path: null, isComingSoon: true },
      ],
    },
    {
      id: 3,
      title: "Support",
      links: [
        { label: "Help Center", path: "/help" },
        { label: "Contact Us", path: "/contact" },
        { label: "Privacy Policy", path: "/privacy" },
        { label: "Terms of Service", path: "/terms" },
      ],
    },
  ];

  const renderLink = (link) => {
    if (!link.path) {
      return (
        <span
          className={`text-neutral-100 ${
            link.isComingSoon ? "opacity-50" : ""
          }`}
        >
          {link.label}
        </span>
      );
    }

    return (
      <Link
        to={link.path}
        className="text-neutral-100 hover:text-blue-300 transition-colors"
      >
        {link.label}
      </Link>
    );
  };

  return (
    <footer className="bg-white/10 backdrop-blur-lg border-t border-white/20 shadow-lg mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-white">Euphoria</h3>
            <p className="mb-4 text-neutral-100">
              Discover your personality type and unlock your potential through
              comprehensive MBTI and PERMA IQ assessments.
            </p>
            <div className="flex space-x-4">
              {/* Social links can be added here */}
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.id}>
              <h4 className="font-semibold text-lg mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>{renderLink(link)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-100">
              © 2025 Euphoria. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
