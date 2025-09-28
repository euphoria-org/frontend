import React from "react";
import { useChatbot } from "../../context/ChatbotContext";
import { ChatIcon } from "../../icons";

const ChatbotToggle = () => {
  const { isOpen, toggleChat } = useChatbot();

  // Don't show the toggle button when chatbox is open
  if (isOpen) return null;

  return (
    <button
      onClick={toggleChat}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-white/10 backdrop-blur-lg border border-white/20
        hover:bg-white/20 hover:border-white/30
        active:scale-95
        transition-all duration-300 ease-in-out
        shadow-lg hover:shadow-xl
        flex items-center justify-center
        group
      `}
      aria-label="Open chat"
    >
      <div className="relative">
        <ChatIcon className="h-6 w-6 text-white group-hover:text-white/80 transition-colors duration-200" />

        {/* Pulse indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
    </button>
  );
};

export default ChatbotToggle;
