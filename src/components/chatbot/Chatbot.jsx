import React from "react";
import { ChatbotProvider } from "../../context/ChatbotContext";
import ChatbotToggle from "./ChatbotToggle";
import Chatbox from "./Chatbox";

const Chatbot = () => {
  return (
    <ChatbotProvider>
      <ChatbotToggle />
      <Chatbox />
    </ChatbotProvider>
  );
};

export default Chatbot;
