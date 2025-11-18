import React, { createContext, useContext, useState, useCallback } from "react";
import chatbotService from "../services/chatbotService";

const ChatbotContext = createContext();

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm AURA, your AI wellness assistant. I'm here to help you with any questions about MBTI, PERMA well-being, IQ assessments, or anything else related to your mental wellness journey. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [error, setError] = useState(null);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const addMessage = useCallback((text, isBot = false) => {
    const newMessage = {
      id: Date.now(),
      text,
      isBot,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  }, []);

  const sendMessage = useCallback(
    async (text) => {
      setError(null);
      const userMessage = addMessage(text, false);
      setIsTyping(true);

      try {
        // Make API call to chatbot backend
        const response = await chatbotService.sendMessage(text, conversationId);

        if (response.success) {
          // Add AI response
          addMessage(response.data.message, true);

          // Update conversation ID if this is a new conversation
          if (response.data.conversationId && !conversationId) {
            setConversationId(response.data.conversationId);
          }
        } else {
          throw new Error(response.message || "Failed to get response from AI");
        }
      } catch (error) {
        console.error("Error sending message:", error);

        // Add error message to chat
        addMessage(
          "I'm sorry, I'm having trouble responding right now. Please check your connection and try again. If the problem persists, our MBTI test is still available for you to explore!",
          true
        );

        setError(error.message);
      } finally {
        setIsTyping(false);
      }
    },
    [addMessage, conversationId]
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm AURA, your AI wellness assistant. I'm here to help you with any questions about MBTI, PERMA well-being, IQ assessments, or anything else related to your mental wellness journey. How can I assist you today?",
        isBot: true,
        timestamp: new Date(),
      },
    ]);
    setConversationId(null);
    setError(null);
  }, []);

  const value = {
    isOpen,
    messages,
    isTyping,
    conversationId,
    error,
    toggleChat,
    addMessage,
    sendMessage,
    clearChat,
  };

  return (
    <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>
  );
};

export default ChatbotContext;
