import React, { useState, useRef, useEffect } from "react";
import { useChatbot } from "../../context/ChatbotContext";
import { CloseIcon, LoadingIcon, SendIcon } from "../../icons";
import { formatChatText } from "../../utils/markdownParser";

const ChatMessage = ({ message, isBot }) => {
  return (
    <div className={`flex mb-3 ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`flex items-start space-x-2 max-w-sm lg:max-w-lg ${
          isBot ? "" : "flex-row-reverse space-x-reverse"
        }`}
      >
        {isBot && (
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white text-xs font-bold">E</span>
          </div>
        )}
        <div
          className={`
            px-4 py-3 rounded-2xl text-sm shadow-lg animate-fadeIn
            ${
              isBot
                ? "bg-white/20 backdrop-blur-md border border-white/30 text-white/95 rounded-bl-md"
                : "bg-gradient-to-r from-purple-500/40 to-pink-500/40 backdrop-blur-md border border-purple-400/40 text-white rounded-br-md"
            }
          `}
        >
          <div
            className="chatbot-message leading-relaxed mb-1"
            dangerouslySetInnerHTML={{
              __html: formatChatText(message.text),
            }}
          />
          <span className="text-xs text-white/60 float-right">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-3">
      <div className="flex items-start space-x-2">
        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-white text-xs font-bold">A</span>
        </div>
        <div className="bg-white/20 backdrop-blur-md border border-white/30 px-4 py-3 rounded-2xl rounded-bl-md shadow-lg">
          <div className="flex space-x-1 items-center">
            <span className="text-white/70 text-sm mr-2">
              AURA is typing
            </span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Chatbox = () => {
  const {
    isOpen,
    messages,
    isTyping,
    error,
    sendMessage,
    clearChat,
    toggleChat,
  } = useChatbot();
  const [inputText, setInputText] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input when chat opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [messages, isTyping, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !isTyping) {
      sendMessage(inputText.trim());
      setInputText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-slideInFromTop">
      <div className="w-96 h-[32rem] lg:w-[28rem] lg:h-[36rem] bg-white/10 backdrop-blur-lg border border-white/25 rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-white/15 via-white/10 to-white/5">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white/10 border-b border-white/15 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">AURA</h3>
              <p className="text-white/60 text-xs">Online • AI Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearChat}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors duration-200"
              title="Clear chat"
            >
              <svg
                className="w-4 h-4 text-white/60 hover:text-white/80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
            <button
              onClick={toggleChat}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors duration-200"
              title="Close chat"
            >
              <CloseIcon className="w-4 h-4 text-white/60 hover:text-white/80" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 lg:h-96 overflow-y-auto p-4 custom-scrollbar">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isBot={message.isBot}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Error Notification */}
        {error && (
          <div className="px-4 py-2 bg-red-500/20 border-t border-red-400/30">
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-red-300 text-xs">
                Connection issue - responses may be delayed
              </span>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 bg-white/5 border-t border-white/15">
          <form onSubmit={handleSubmit} className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder="Type your message..."
                disabled={isTyping}
                rows={1}
                className={`
                  w-full px-4 py-3 bg-white/15 border border-white/25 rounded-xl
                  text-white placeholder-white/50 text-sm resize-none
                  focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50
                  backdrop-blur-md transition-all duration-200
                  ${isInputFocused ? "bg-white/20 border-white/35" : ""}
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
                maxLength={500}
                style={{
                  minHeight: "44px",
                  maxHeight: "88px",
                  overflowY: "hidden",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className={`
                p-3 rounded-xl transition-all duration-200 flex-shrink-0
                ${
                  inputText.trim() && !isTyping
                    ? "bg-gradient-to-r from-purple-500/40 to-pink-500/40 hover:from-purple-500/50 hover:to-pink-500/50 border border-purple-400/40 text-white shadow-lg hover:shadow-xl"
                    : "bg-white/10 border border-white/20 text-white/40 cursor-not-allowed"
                }
                backdrop-blur-md
                flex items-center justify-center
                active:scale-95
              `}
            >
              {isTyping ? (
                <LoadingIcon className="w-5 h-5" />
              ) : (
                <SendIcon className="w-5 h-5" />
              )}
            </button>
          </form>
          <p className="text-xs text-white/50 mt-2 text-center">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
