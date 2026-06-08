/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MessageCircle, X, Send, Sparkles, ArrowUpRight } from 'lucide-react';
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

const GothicTopCrystalSVG: React.FC = () => {
  return (
    <svg
      viewBox="0 0 120 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-11 h-16 md:w-12 md:h-18 object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.7)] hover:drop-shadow-[0_0_25px_rgba(239,68,68,0.95)] transition-all duration-300 select-none filter contrast-125"
    >
      <defs>
        {/* Crystal Red Gradient */}
        <linearGradient id="gRedCrystal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff4560" />
          <stop offset="40%" stopColor="#e11d48" />
          <stop offset="75%" stopColor="#9f1239" />
          <stop offset="100%" stopColor="#4c0519" />
        </linearGradient>

        {/* Outer Metallic Bronze Frame Gradient */}
        <linearGradient id="gBronzeFrame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c5a880" />
          <stop offset="25%" stopColor="#8c6d4f" />
          <stop offset="50%" stopColor="#5c4533" />
          <stop offset="75%" stopColor="#3d2b20" />
          <stop offset="100%" stopColor="#1c120c" />
        </linearGradient>

        {/* Banner Metallic Border Gradient */}
        <linearGradient id="gGoldHighlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dfc19b" />
          <stop offset="50%" stopColor="#9c7a52" />
          <stop offset="100%" stopColor="#5c4021" />
        </linearGradient>

        {/* Outer Glow filter for magical effect */}
        <filter id="crystalGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Text Red Fire Glow filter */}
        <filter id="topTextGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComponentTransfer in="blur" result="brightBlur">
            <feFuncA type="linear" slope="2"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="brightBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main Base Shadow Overlay */}
      <path
        d="M60,8 L102,52 L88,110 L60,126 L32,110 L18,52 Z"
        fill="#040202"
        opacity="0.9"
        filter="blur(2px)"
      />

      {/* TALL RED MAGIC CRYSTAL CORE */}
      <g filter="url(#crystalGlow)">
        {/* Back crystal body */}
        <path
          d="M60,12 L92,50 L80,102 L60,118 L40,102 L28,50 Z"
          fill="url(#gRedCrystal)"
          stroke="#ff2e55"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Crystal Facet Lines & Front facing 3D planes */}
        {/* Central Diamond Facet */}
        <path
          d="M60,30 L80,55 L60,85 L40,55 Z"
          fill="#ff4d6a"
          fillOpacity="0.25"
          stroke="#ffa2b2"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Top Triangular Cap plane */}
        <path d="M60,12 L60,30 L80,55 L92,50 Z" fill="#ff708a" fillOpacity="0.15" />
        <path d="M60,12 L60,30 L40,55 L28,50 Z" fill="#ff708a" fillOpacity="0.15" />

        {/* Bottom Triangular Base plane */}
        <path d="M60,118 L60,85 L40,55 L40,102 Z" fill="#7f0c2a" fillOpacity="0.3" />
        <path d="M60,118 L60,85 L80,55 L80,102 Z" fill="#7f0c2a" fillOpacity="0.3" />

        {/* Glowing Glyphs overlay */}
        <path
          d="M60,42 L57,50 L63,50 Z M56,58 C58,55 62,55 64,58 M60,65 L60,75 M57,70 L63,70"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
          filter="drop-shadow(0 0 4px #ff0033)"
        />
      </g>

      {/* BRONZE GOTHIC CLAWS (Frames the crystal sides and peak) */}
      {/* Centered Top spike crown */}
      <path
        d="M52,6 L60,18 L68,6 L60,32 Z"
        fill="url(#gBronzeFrame)"
        stroke="#1c120c"
        strokeWidth="1"
      />

      {/* Left side claws */}
      <path
        d="M28,42 C18,52 16,74 24,92 C27,99 35,106 42,109"
        stroke="url(#gBronzeFrame)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20,54 L28,58 L22,66 Z"
        fill="url(#gBronzeFrame)"
        stroke="#1c120c"
        strokeWidth="0.8"
      />
      <path
        d="M21,78 L31,76 L24,86 Z"
        fill="url(#gBronzeFrame)"
        stroke="#1c120c"
        strokeWidth="0.8"
      />

      {/* Right side claws */}
      <path
        d="M92,42 C102,52 104,74 96,92 C93,99 85,106 78,109"
        stroke="url(#gBronzeFrame)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M100,54 L92,58 L98,66 Z"
        fill="url(#gBronzeFrame)"
        stroke="#1c120c"
        strokeWidth="0.8"
      />
      <path
        d="M99,78 L89,76 L96,86 Z"
        fill="url(#gBronzeFrame)"
        stroke="#1c120c"
        strokeWidth="0.8"
      />

      {/* BRONZE TEXT BANNER PLATE AT THE BOTTOM */}
      <g>
        {/* Banner Shadow */}
        <path
          d="M12,116 L108,116 L104,152 L60,166 L16,152 Z"
          fill="#000"
          opacity="0.5"
          filter="blur(1px)"
        />

        {/* Main Banner Outer frame */}
        <path
          d="M14,118 L106,118 C112,120 112,126 108,132 L102,150 L60,164 L18,150 L12,132 C8,126 8,120 14,118 Z"
          fill="url(#gBronzeFrame)"
          stroke="url(#gGoldHighlight)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Sharp Gothic spikes pointing downwards from banner edges */}
        <path d="M14,142 L8,154 L18,148 Z" fill="url(#gBronzeFrame)" stroke="#1c120c" strokeWidth="0.8" />
        <path d="M106,142 L112,154 L102,148 Z" fill="url(#gBronzeFrame)" stroke="#1c120c" strokeWidth="0.8" />
        <path d="M60,164 L60,176 L55,168 Z" fill="url(#gBronzeFrame)" stroke="#1c120c" strokeWidth="0.8" />
        <path d="M60,164 L60,176 L65,168 Z" fill="url(#gBronzeFrame)" stroke="#1c120c" strokeWidth="0.8" />

        {/* Inner Glowing Red Core Plate */}
        <path
          d="M20,124 L100,124 L95,145 L60,155 L25,145 Z"
          fill="#1b0003"
          stroke="#b91c1c"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Stylized Glowing Red serified "TOP" Text */}
        <text
          x="60"
          y="143"
          textAnchor="middle"
          fill="#ffffff"
          fontWeight="bold"
          fontSize="18"
          fontFamily="Syncopate, 'Space Grotesk', serif"
          letterSpacing="1.5"
          filter="url(#topTextGlow)"
          className="select-none tracking-widest fill-white text-base font-extrabold"
          style={{ textShadow: '0 0 8px #ef4444, 0 0 16px #ff0000' }}
        >
          TOP
        </text>
      </g>
    </svg>
  );
};

type KnowledgeItem = {
  title: string;
  keywords: string[];
  answer: string;
  action?: {
    label: string;
    path: string;
  };
};

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I\'m LUMI AI, Mitul\'s personal assistant. Ask me anything about Mitul\'s projects, skills, or background. 🚀' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [bullets, setBullets] = useState<{ id: number }[]>([]);
  const [isShooting, setIsShooting] = useState(false);
  const [isMuzzleFlash, setIsMuzzleFlash] = useState(false);

  const knowledgeBase = useMemo<KnowledgeItem[]>(() => [
    {
      title: 'About Mitul',
      keywords: ['about', 'who is mitul', 'who are you', 'background', 'college', 'education', 'matrusri', 'student', 'intro', 'introduction', 'hyderabad'],
      answer: 'Mitul Nayakwadi is a CSE student at Matrusri Engineering College, based in Hyderabad, Telangana, India. He is passionate about AI, development, cloud computing, and building creative tech products through practical experimentation.',
      action: { label: 'Read About Me', path: '#about' }
    },
    {
      title: 'Personality & Mindset',
      keywords: ['personality', 'mindset', 'curious', 'experimental', 'creative', 'futuristic', 'innovation', 'long term', 'impact'],
      answer: 'Mitul is curious, highly experimental, and focused on long-term impact. He enjoys blending AI with real-world interaction and prefers building practical projects over theory-only learning.',
      action: { label: 'See Skills', path: '#skills' }
    },
    {
      title: 'Projects',
      keywords: ['project', 'projects', 'work', 'portfolio', 'medico', 'collex', 'uppal', 'food', 'demo', 'fitpack', 'home workout', 'social fitness'],
      answer: 'Featured work includes Uppal Street Food Guide, Medico AI, and Collex Pay, plus the FitPack concept: a social-style home workout platform with workout sharing, chat/community interaction, and consistency-focused design.',
      action: { label: 'View Projects', path: '#projects' }
    },
    {
      title: 'Skills',
      keywords: ['skill', 'skills', 'tech', 'language', 'code', 'python', 'react', 'typescript', 'javascript', 'node', 'express', 'firebase', 'java', 'c', 'cloud'],
      answer: 'Core technical strengths include C, Python, Java, problem solving, DSA, basic AI concepts, cloud computing, web development, UI/UX, automation, and creative coding.',
      action: { label: 'See Skills', path: '#skills' }
    },
    {
      title: 'Learning Journey',
      keywords: ['learning', 'journey', 'roadmap', 'practice', 'daily', '2 hours', 'python fundamentals', 'java fundamentals', 'full stack'],
      answer: 'Mitul is consistently improving Python and Java fundamentals, practicing DSA daily, and investing around two focused hours each day to grow in AI and full-stack development through project-based learning.',
      action: { label: 'See Skills', path: '#skills' }
    },
    {
      title: 'Experience',
      keywords: ['experience', 'member', 'ambassador', 'google', 'club', 'internship', 'big-oh'],
      answer: 'His experience highlights include Google Student Ambassador and Big-Oh Club Member, with a strong focus on workshops, collaboration, and problem solving.',
      action: { label: 'View Experience', path: '#experience' }
    },
    {
      title: 'Education',
      keywords: ['education', 'school', 'degree', 'college', 'be', 'cse'],
      answer: 'The education timeline includes B.E. in Computer Science and Engineering, Intermediate, and Secondary School, all shown in the timeline section.',
      action: { label: 'View Education', path: '#education' }
    },
    {
      title: 'Academic Topics',
      keywords: ['dsa topics', 'stack', 'queue', 'circular queue', 'array adt', 'linked list', 'binary search', 'hashing', 'infix', 'postfix', 'math', 'ode', 'matrices', 'electrical'],
      answer: 'Academic practice includes Stack, Queue, Circular Queue, Array ADT, Linked Lists, Binary Search, Hashing, Infix-to-Postfix, Postfix Evaluation, plus ODEs, Matrices, and Basic Electrical Engineering.',
      action: { label: 'View Education', path: '#education' }
    },
    {
      title: 'Creative Direction',
      keywords: ['ui', 'ux', 'design', 'animated', 'cursor', 'dark fantasy', 'futuristic', 'branding', 'logo', 'visual storytelling', 'immersive'],
      answer: 'Mitul prefers clean modern aesthetics with animated, immersive UI. He actively experiments with futuristic interfaces, dark fantasy styles, custom branding, logo design, and visual storytelling in tech products.',
      action: { label: 'Read About Me', path: '#about' }
    },
    {
      title: 'Fitness & Lifestyle',
      keywords: ['fitness', 'diet', 'vegetarian', 'non veg', 'workout', 'body transformation', 'home workouts'],
      answer: 'Mitul follows a mostly vegetarian diet, includes non-veg meals 2-3 times per week, and focuses on consistency-based home workouts and gradual body transformation.',
      action: { label: 'Read About Me', path: '#about' }
    },
    {
      title: 'Contact',
      keywords: ['contact', 'email', 'github', 'linkedin', 'hire', 'connect', 'reach'],
      answer: 'You can reach Mitul through email, LinkedIn, or GitHub from the contact section at the bottom of the page.',
      action: { label: 'Open Contact', path: '#contact' }
    },
    {
      title: 'Future Goals',
      keywords: ['future', 'goals', 'aim', 'career', 'startup', 'brand', 'impact', 'ai engineer', 'cloud engineer'],
      answer: 'Future goals are to become highly skilled in AI and cloud engineering, build impactful real-world products, strengthen full-stack and UI/UX capabilities, and create startup-level projects with a strong personal tech brand.',
      action: { label: 'View Projects', path: '#projects' }
    }
  ], []);

  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');

  const scoreKnowledgeItem = (query: string, item: KnowledgeItem) => {
    const normalizedQuery = normalize(query);
    const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
    let score = 0;

    item.keywords.forEach((keyword) => {
      if (normalizedQuery.includes(keyword)) {
        score += 4;
      }
    });

    tokens.forEach((token) => {
      if (item.title.toLowerCase().includes(token)) {
        score += 2;
      }
      if (item.keywords.some(keyword => keyword.includes(token))) {
        score += 1;
      }
    });

    return score;
  };

  const getResponse = (query: string) => {
    const trimmed = query.trim();
    const lower = trimmed.toLowerCase();
    const wantsDetailed = ['detail', 'detailed', 'explain', 'deep', 'elaborate', 'step by step', 'more info'].some(term => lower.includes(term));

    if (!trimmed) {
      return {
        text: 'Ask me about Mitul\'s projects, skills, personality, learning journey, goals, or contact details.',
        action: { label: 'Open Contact', path: '#contact' }
      };
    }

    if (['hi', 'hello', 'hey', 'yo', 'greetings'].some(prefix => lower.startsWith(prefix))) {
      return {
        text: 'Hello! I\'m LUMI AI. I can help with Mitul\'s projects, AI/cloud interests, creative tech direction, learning journey, and contact details.',
        action: { label: 'View Projects', path: '#projects' }
      };
    }

    if (lower.includes('date of birth') || lower.includes('dob') || lower.includes('birthday')) {
      return {
        text: 'Mitul\'s date of birth is 23/08/2006.',
        action: { label: 'View Education', path: '#education' }
      };
    }

    if (lower.includes('where') && lower.includes('from')) {
      return {
        text: 'Mitul is based in Hyderabad, Telangana, India.',
        action: { label: 'Open Contact', path: '#contact' }
      };
    }

    if (lower.includes('resume') || lower.includes('cv')) {
      return {
        text: 'The resume link is available from the hero section buttons and the contact area of the site.',
        action: { label: 'Go to Home', path: '#hero' }
      };
    }

    const bestMatch = knowledgeBase
      .map((item) => ({ item, score: scoreKnowledgeItem(trimmed, item) }))
      .sort((a, b) => b.score - a.score)[0];

    if (bestMatch && bestMatch.score > 0) {
      const conciseAnswer = bestMatch.item.answer;
      const detailedTail = ' If you want, I can break this down with a focused roadmap and practical next steps.';
      return {
        text: wantsDetailed ? `${conciseAnswer}${detailedTail}` : conciseAnswer,
        action: bestMatch.item.action
      };
    }

    return {
      text: 'I can help with projects, AI/cloud strengths, DSA practice, creative UI work, learning goals, and contact details. Ask anything specific and I\'ll keep it clear and practical.',
      action: { label: 'Read About Me', path: '#about' }
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const nearBottom = scrollPosition >= pageHeight - 16;

      // Only show the scroll-to-top button when the user has reached the end of the site.
      if (nearBottom) {
        setShowScrollTop(true);
        // Automatically close the assistant chat when scrolling down to give space to the scroll-to-top button
        setIsOpen(false);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShootAndScroll = () => {
    const bulletId = Date.now();
    setBullets(prev => [...prev, { id: bulletId }]);
    setIsMuzzleFlash(true);
    setIsShooting(true);

    // Smooth scroll back to top, utilizing Lenis smooth scroll if it is active
    if (window.lenisInstance) {
      window.lenisInstance.scrollTo('#hero', { duration: 1.5 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    setTimeout(() => {
      setIsMuzzleFlash(false);
    }, 200);

    setTimeout(() => {
      setIsShooting(false);
    }, 300);

    // Clean up bullet container after the shoot animation finishes
    setTimeout(() => {
      setBullets(prev => prev.filter(b => b.id !== bulletId));
    }, 600);
  };

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
    const response = getResponse(userQuery);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'model', text: response.text, action: response.action }]);
      setIsLoading(false);
      setTimeout(scrollToBottom, 50);
    }, 600);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Bullet container for scroll gun animation */}
      <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ overflow: 'visible' }}>
        {bullets.map(bullet => (
          <motion.div
            key={bullet.id}
            initial={{ y: -15, x: "-50%", opacity: 1, scale: 1.3 }}
            animate={{ y: -window.innerHeight - 300, opacity: [1, 0.9, 0.3, 0], scale: [1.3, 0.9, 0.4] }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="absolute left-1/2 w-1.5 h-8 rounded-full bg-gradient-to-b from-yellow-300 via-red-500 to-red-800 shadow-[0_0_15px_#f59e0b,0_0_30px_#ef4444]"
            style={{ transform: 'translateX(-50%)' }}
          />
        ))}
      </div>

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
                    {msg.action && (
                      <button
                        type="button"
                        onClick={() => {
                          if (msg.action?.path.startsWith('#')) {
                            const target = document.querySelector(msg.action.path);
                            if (target) {
                              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          } else {
                            window.open(msg.action.path, '_blank', 'noopener,noreferrer');
                          }
                        }}
                        className="mt-3 inline-flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-white hover:bg-gray-50 text-red-600 border border-red-200 px-3 py-2 rounded-lg transition-colors w-full"
                      >
                        {msg.action.label} <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}
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

      {/* Toggle Button / Gun Scroll-To-Top Button Swap */}
      <AnimatePresence mode="wait">
        {!showScrollTop ? (
          <motion.button
            key="chat-toggle"
            initial={{ opacity: 0, y: 25, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.85 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
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
        ) : (
          <motion.button
            key="scroll-gun"
            initial={{ opacity: 0, y: 25, scale: 0.85 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              translateY: isShooting ? [0, 8, 0] : 0
            }}
            exit={{ opacity: 0, y: 25, scale: 0.85 }}
            transition={{ 
              duration: 0.25, 
              ease: "easeOut",
              translateY: { duration: 0.2, ease: "easeOut" }
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShootAndScroll}
            className="flex items-center justify-center bg-transparent border-none outline-none shadow-none z-50 group relative overflow-visible pointer-events-auto"
            data-hover="true"
            title="Shoot to Scroll Top"
          >
            {/* Playful mini tooltip */}
            <span className="absolute right-20 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[9px] font-mono font-bold uppercase text-red-400 bg-neutral-950 border border-white/10 rounded-md tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              🚀 Shoot to Top
            </span>

            {/* Glowing red muzzle flash aura on click */}
            <AnimatePresence>
              {isMuzzleFlash && (
                <motion.div
                  initial={{ scale: 0.4, opacity: 1 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-300 to-red-600 blur-[2px] z-40 pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* Glowing crystal SVG */}
            <motion.div
              animate={isShooting ? { scale: [1, 0.85, 1.05, 1], rotate: [0, -3, 3, 0] } : {}}
              transition={{ duration: 0.25 }}
            >
              <GothicTopCrystalSVG />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChat;
