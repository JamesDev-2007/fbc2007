

import React, { useState, useRef, useEffect } from 'react';
import { ChatIcon, CloseIcon, SendIcon, UserIcon, BotIcon } from './icons';
import { getChatbotResponse } from '../services/geminiService';
import type { ChatMessage } from '../types';

// New component to render formatted bot responses
const FormattedMessage: React.FC<{ text: string }> = ({ text }) => {
  const formatText = (inputText: string) => {
    // Replace **bold** with <strong>bold</strong>
    let formatted = inputText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Replace __underline__ with <u>underline</u>
    formatted = formatted.replace(/__(.*?)__/g, '<u>$1</u>');
    // Replace newlines with <br /> for paragraphs
    formatted = formatted.replace(/\n/g, '<br />');
    // Make standalone URLs clickable
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    formatted = formatted.replace(urlRegex, (url) => {
        if (url.endsWith('.') || url.endsWith(',')) {
            const link = url.slice(0, -1);
            const punctuation = url.slice(-1);
            return `<a href="${link}" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 underline">${link}</a>${punctuation}`;
        }
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 underline">${url}</a>`;
    });
    return formatted;
  };

  return (
    <div
      className="text-sm"
      dangerouslySetInnerHTML={{ __html: formatText(text) }}
    />
  );
};


const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: "Welcome! I'm FBC AI, your spiritual growth assistant. Ask me about our church, request a devotional, or explore a spiritual question." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    { emoji: '📖', text: 'Give me a devotional' },
    { emoji: '🤔', text: 'Explain John 3:16' },
    { emoji: '✝️', text: 'Who is Jesus?' },
    { emoji: '🙏', text: 'How can I grow spiritually?' },
    { emoji: '🕒', text: 'Service Times' },
    { emoji: '📍', text: 'Church Address' },
  ];


  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (messageText: string) => {
      if (messageText.trim() === '' || isLoading) return;

      setShowQuickReplies(false);

      // FIX: Explicitly type `historyForApi` to ensure the `role` property is correctly
      // typed as 'user' | 'model', resolving a TypeScript type inference issue.
      const historyForApi: { role: 'user' | 'model'; parts: { text: string }[] }[] = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));
      
      const userMessage: ChatMessage = { sender: 'user', text: messageText };
      setMessages(prev => [...prev, userMessage]);

      if (messageText === input) {
        setInput('');
      }
      setIsLoading(true);
      
      const botResponseText = await getChatbotResponse(historyForApi, messageText);
      const botMessage: ChatMessage = { sender: 'bot', text: botResponseText };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
  };

  const handleSend = () => {
      sendMessage(input);
  };
  
  const handleQuickReplyClick = (replyText: string) => {
      sendMessage(replyText);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-church-maroon text-white p-4 rounded-full shadow-lg hover:bg-church-maroon-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-church-maroon transition-transform transform hover:scale-110 z-50"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <CloseIcon className="h-8 w-8" /> : <ChatIcon className="h-8 w-8" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-[70vh] max-h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col font-open-sans z-50">
          <header className="bg-church-maroon dark:bg-church-maroon-dark text-white p-4 rounded-t-2xl flex justify-between items-center">
            <h3 className="font-bold text-lg font-poppins">Chat with FBC AI</h3>
          </header>
          <div className="flex-1 p-4 overflow-y-auto bg-warm-gray dark:bg-gray-900">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 my-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'bot' && <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full"><BotIcon className="w-5 h-5 text-church-maroon dark:text-yellow-300" /></div>}
                <div className={`max-w-xs px-4 py-2 rounded-xl ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                  {msg.sender === 'bot' ? <FormattedMessage text={msg.text} /> : <p className="text-sm">{msg.text}</p>}
                </div>
                 {msg.sender === 'user' && <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full"><UserIcon className="w-5 h-5 text-blue-500" /></div>}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 my-3">
                 <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full"><BotIcon className="w-5 h-5 text-church-maroon dark:text-yellow-300" /></div>
                 <div className="max-w-xs px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 rounded-bl-none">
                    <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 bg-church-maroon dark:bg-yellow-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-church-maroon dark:bg-yellow-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-church-maroon dark:bg-yellow-300 rounded-full animate-bounce"></span>
                    </div>
                </div>
              </div>
            )}
            {showQuickReplies && (
                <div className="flex flex-wrap gap-2 justify-start p-2 mt-2">
                    {quickReplies.map((reply) => (
                        <button
                            key={reply.text}
                            onClick={() => handleQuickReplyClick(reply.text)}
                            disabled={isLoading}
                            className="text-sm bg-white dark:bg-gray-700 border border-church-maroon dark:border-yellow-400 text-church-maroon dark:text-yellow-400 py-1 px-3 rounded-full hover:bg-church-maroon hover:text-white dark:hover:bg-yellow-400 dark:hover:text-church-maroon-dark transition-colors duration-200 disabled:opacity-50"
                        >
                            {reply.emoji} {reply.text}
                        </button>
                    ))}
                </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="border-t dark:border-gray-700 p-4 bg-white dark:bg-gray-800 rounded-b-2xl flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-church-maroon bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-yellow-400 dark:focus:border-yellow-400"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="ml-3 bg-church-maroon text-white p-3 rounded-full hover:bg-church-maroon-dark disabled:bg-gray-400 transition-colors"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;