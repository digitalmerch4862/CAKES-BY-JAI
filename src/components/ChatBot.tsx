import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are a helpful and friendly AI assistant for "Cakes by Jai", a luxury bespoke bakery located in Cabuyao City, Laguna, Philippines.
Your goal is to assist customers with inquiries about custom cakes, pricing, ordering process, and services.

Key Information:
- Business Name: Cakes by Jai
- Location: 33 Malate St, Cabuyao City, Laguna
- Services: Custom Wedding Cakes, Birthday Cakes, Celebration Cakes, Artisanal Pastries.
- Ordering: Wedding cakes (3-6 months notice), Celebration cakes (at least 2 weeks notice).
- Contact: WhatsApp, Phone, Email (all available on the website).
- Style: Luxury, handcrafted, artisanal, using premium ingredients.

Guidelines:
- Be polite, professional, and enthusiastic.
- If you don't know an answer, suggest they contact the bakery directly via WhatsApp.
- Keep responses concise and helpful.
- Encourage users to view the gallery for inspiration.
`;

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hello! I'm Jai's AI assistant. How can I help you with your dream cake today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const model = "gemini-3-flash-preview";
      
      const chat = ai.chats.create({
        model,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      // Simple history mapping
      const history = messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));

      const response = await chat.sendMessage({
        message: userMessage,
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that. Please try again or contact us via WhatsApp!";
      setMessages(prev => [...prev, { role: "bot", text: botResponse }]);
    } catch (error) {
      console.error("ChatBot Error:", error);
      setMessages(prev => [...prev, { role: "bot", text: "I'm having a little trouble connecting right now. Feel free to message us directly on WhatsApp!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ delay: 3, duration: 0.5 }}
            className="mb-4 bg-white px-5 py-3 rounded-2xl shadow-xl border border-primary/10 text-sm font-medium text-gray-700 relative"
          >
            How can I help you?
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-primary/10 rotate-45" />
          </motion.div>
        )}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-primary/10 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold">Jai's Assistant</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-70">Always Online</div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-luxury-bg/30"
            >
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-primary text-white rounded-tr-none shadow-lg shadow-primary/20" 
                        : "bg-white text-gray-700 rounded-tl-none border border-gray-100 shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about our cakes..."
                  className="w-full pl-6 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={!isOpen ? {
          boxShadow: [
            "0 0 0 0px rgba(209, 77, 114, 0)",
            "0 0 0 15px rgba(209, 77, 114, 0.2)",
            "0 0 0 0px rgba(209, 77, 114, 0)"
          ]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all relative ${
          isOpen ? "bg-white text-primary border border-primary/10" : "bg-primary text-white"
        }`}
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-accent border-2 border-white rounded-full animate-bounce" />
        )}
      </motion.button>
    </div>
  );
};
