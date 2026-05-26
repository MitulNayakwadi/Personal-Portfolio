/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../types';

const renderMessageText = (text: string) => {
  if (!text.includes('**')) {
    return text;
  }
  const parts = text.split('**');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <strong key={index} className="font-bold text-white">
          {part}
        </strong>
      );
    }
    return part;
  });
};

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I\'m LUMI AI, Mitul\'s personal assistant. Ask me anything about Mitul\'s projects, skills, or background. 🚀' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userQuery = input.trim();
    const userMessage: ChatMessage = { role: 'user', text: userQuery };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Slight delay to allow state update to render before scrolling
    setTimeout(scrollToBottom, 50);

    // Match keywords locally to generate answer:
    const queryLower = userQuery.toLowerCase();
    let responseText = "";

    if (
      queryLower.includes("hello") || 
      queryLower.includes("hi") || 
      queryLower.includes("hey") || 
      queryLower.includes("greetings") || 
      queryLower.includes("lumi")
    ) {
      responseText = "Hi there! I'm LUMI, Mitul's personal assistant. Ask me anything about his projects, skills, memberships, or education! 🚀";
    } else if (
      queryLower.includes("who is mitul") || 
      queryLower.includes("mitul") || 
      queryLower.includes("about") || 
      queryLower.includes("background") || 
      queryLower.includes("college") || 
      queryLower.includes("education") ||
      queryLower.includes("school") ||
      queryLower.includes("matrusri")
    ) {
      responseText = "Mitul Nayakwadi is a B.E Computer Science & Engineering (CSE) student at Matrusri Engineering College. He is deeply interested in AI, machine learning, and full-stack web development. He enjoys using modern technologies to solve structural challenges. 🎓💻";
    } else if (
      queryLower.includes("project") || 
      queryLower.includes("work") || 
      queryLower.includes("portfolio") || 
      queryLower.includes("selected works") || 
      queryLower.includes("medico") || 
      queryLower.includes("collex") || 
      queryLower.includes("pay") || 
      queryLower.includes("uppal") || 
      queryLower.includes("food")
    ) {
      responseText = "Here are Mitul's featured works:\n\n" +
                     "• 🍔 **Uppal Street Food Guide**: An AI food discovery platform for Uppal Kalan using Next.js, Google Maps integration, and Gemini AI recommendations. (https://uppallocalfoodguide.vercel.app/)\n\n" +
                     "• 🩺 **Medico AI**: An healthcare assistant platform designed with Python, Flask, and TensorFlow to deliver smart medical recommendations.\n\n" +
                     "• 💳 **Collex Pay**: A campus fintech wallet allowing students to transact using \"Collex Coins\" across events & food outlets.";
    } else if (
      queryLower.includes("skill") || 
      queryLower.includes("tech") || 
      queryLower.includes("language") || 
      queryLower.includes("code") || 
      queryLower.includes("python") || 
      queryLower.includes("react") || 
      queryLower.includes("typescript") || 
      queryLower.includes("javascript") ||
      queryLower.includes("node") ||
      queryLower.includes("express")
    ) {
      responseText = "Mitul's technical toolkit includes:\n\n" +
                     "• 💪 **Languages**: Python, C, TypeScript, JavaScript\n" +
                     "• 💻 **Frontend/Backend**: Next.js, React, Node.js, Express, Tailwind CSS, Firebase\n" +
                     "• 🧠 **AI / ML**: TensorFlow, OpenCV, MediaPipe, Generative AI APIs";
    } else if (
      queryLower.includes("member") || 
      queryLower.includes("experience") || 
      queryLower.includes("ambassador") || 
      queryLower.includes("big-oh") || 
      queryLower.includes("club") || 
      queryLower.includes("google") || 
      queryLower.includes("gdsc") || 
      queryLower.includes("csi") ||
      queryLower.includes("student branch")
    ) {
      responseText = "Mitul's current experiences & roles include:\n\n" +
                     "• 🌟 **Google Student Ambassador** at Google Student Ambassadors (India) (Internship, May 2026 - Present): Leading development bootcamps and training sessions on campuses.\n\n" +
                     "• 🏆 **Big-Oh Club Member** at Matrusri Engineering College (Aug 2024 - Present): Engaged in competitive programming and algorithmic optimization.";
    } else if (
      queryLower.includes("contact") || 
      queryLower.includes("email") || 
      queryLower.includes("github") || 
      queryLower.includes("linkedin") || 
      queryLower.includes("hire") || 
      queryLower.includes("connect")
    ) {
      responseText = "You can connect with Mitul anytime via:\n\n" +
                     "• 📧 **Email**: mitulnayakwadi@gmail.com\n" +
                     "• 🌐 **LinkedIn**: linkedin.com/in/mitul-nayakwadi-6a3218319\n" +
                     "• 💻 **GitHub Profile**: github.com/MitulNayakwadi\n" +
                     "• 🚀 **Portfolio Repo**: github.com/MitulNayakwadi/My_Portfolio";
    } else {
      responseText = "I'm not quite sure about that one, but I'd love to tell you about Mitul's:\n" +
                     "• **Projects** (Medico AI, Uppal Food Guide, Collex Pay)\n" +
                     "• **Skills** (React, Python, TypeScript, AI/ML)\n" +
                     "• **Memberships & Experience** (Google Student Ambassador, Big-Oh Club)\n" +
                     "• **Contact info**\n\nWhat would you like to hear about first? ✨";
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      setIsLoading(false);
      setTimeout(scrollToBottom, 50);
    }, 600);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[90vw] md:w-96 bg-black/85 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-red-600/30"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-950/70 to-red-900/70 p-4 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-500 animate-pulse" />
                <h3 className="font-heading font-bold text-white tracking-wider">LUMI AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white" data-hover="true">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="h-64 md:h-80 overflow-y-auto p-4 space-y-3 scroll-smooth"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg text-sm whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-red-600 text-white rounded-tr-none'
                        : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                    }`}
                  >
                    {renderMessageText(msg.text)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-lg rounded-tl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-black/45">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask about projects, skills..."
                  className="flex-1 bg-transparent text-white placeholder-white/30 text-sm focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-red-600 p-2 rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50 text-white"
                  data-hover="true"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-600/40 border border-white/20 z-50 group"
        data-hover="true"
      >
        {isOpen ? (
          <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
        ) : (
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:animate-bounce" />
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
