# 🎯 Mitul Nayakwadi — Dual-Mode Portfolio: AniGravity Prompt

> **Use this prompt with AniGravity (or any AI code tool like v0, Bolt, Lovable, Cursor, etc.)**  
> Stack: **Vite + React + TypeScript + Tailwind CSS + Framer Motion**

---

## 🧠 CONTEXT & GOAL

Build a **single-page personal portfolio** for **Mitul Nayakwadi**, a Computer Science Engineering undergraduate.

The portfolio has **two complete visual modes** that swap with a single toggle click:

| Mode | Version | Default? |
|------|---------|---------|
| ☀️ Light | **Professional Edition** — clean, editorial, minimal | ✅ YES — loads by default |
| 🌙 Dark | **Gamified Edition** — current existing portfolio style | No — toggled on |

**Light mode is the default on first load.** Dark mode is the existing gamified version. The toggle is a small **sun/moon icon button** in the top-right nav area. Switching modes should be instant with a smooth crossfade transition (300ms opacity + slight scale).

---

## 🏗️ TECH STACK

```
Vite + React + TypeScript
Tailwind CSS (with dark: variant enabled in tailwind.config)
Framer Motion (for scroll animations + mode transition)
React Icons or Lucide React (for icons)
```

Store the current theme in `localStorage` (key: `portfolio-theme`). On mount, read from localStorage; default to `"light"` if not set.

---

## ☀️ LIGHT MODE — PROFESSIONAL PORTFOLIO

### Design Language
- **Aesthetic:** Editorial minimalism — like a high-end tech resume come alive. Think Stripe meets a personal CV.
- **Color Palette:**
  - Background: `#FAFAF8` (warm off-white)
  - Surface cards: `#FFFFFF` with `box-shadow: 0 1px 3px rgba(0,0,0,0.08)`
  - Primary accent: `#1A1A2E` (deep navy)
  - Secondary accent: `#2563EB` (electric blue — for links, tags, highlights)
  - Text primary: `#0F172A`
  - Text secondary: `#64748B`
  - Border: `#E2E8F0`
- **Typography:**
  - Display/headings: `'Playfair Display'` or `'DM Serif Display'` (Google Fonts)
  - Body/nav/labels: `'DM Sans'` or `'Outfit'` (clean, modern)
  - Monospace accents: `'JetBrains Mono'` (for tech stack tags, code snippets)
- **Layout:** Max-width `900px`, centered, generous vertical spacing, single-column

### Navigation (Light Mode)
- Fixed top bar, full-width with `backdrop-filter: blur(12px)` + subtle bottom border
- Left: Name `Mitul Nayakwadi` in display font, small
- Right: Horizontal links — `About · Skills · Projects · Experience · Contact`
- Far right: Theme toggle button (sun icon in light, moon icon in dark)
- On scroll past 80px: nav background transitions to `rgba(250,250,248,0.9)`
- Active section link gets underline indicator (animated with Framer Motion layoutId)

### Scroll Animations (Light Mode)
Use Framer Motion's `whileInView` + `viewport={{ once: true }}` for all sections:
- **Hero:** Text slides up + fades in (staggered: name → title → tagline → CTA buttons)
- **About:** Fades in from left
- **Skills:** Each skill pill animates in with staggered delay (0.05s each)
- **Projects:** Cards slide up one by one (staggerDelay: 0.1s)
- **Experience:** Timeline items slide in from left
- **Certifications:** Fade + scale from 0.95 → 1
- **Contact:** Fade up

All initial states: `opacity: 0, y: 20` → `opacity: 1, y: 0`, duration `0.5s`, ease `easeOut`.

---

### SECTION BREAKDOWN — LIGHT MODE

#### 1. HERO SECTION
```
Full-viewport-height section.
Layout: Centered text, vertically + horizontally centered.

Line 1 (small label, monospace): "Hi, I'm"
Line 2 (large display font, 72px desktop / 48px mobile): "Mitul Nayakwadi"
Line 3 (medium, body font, 22px, text-secondary): 
  "CS Engineering Student · AI & Full-Stack Developer"
Line 4 (small, 16px): 
  "Building intelligent systems at the intersection of AI, Cloud & Web."

Below text — two buttons (side by side):
  [View Projects]  →  smooth scroll to #projects, filled button (blue bg)
  [Download Resume] → links to resume PDF, outlined button

Bottom of hero: Small animated chevron-down icon (bouncing, CSS keyframes)
Subtle background: Very faint dot grid pattern (CSS radial-gradient dots, opacity 0.3)
```

#### 2. ABOUT SECTION
```
Section title: "About Me" (display font, left-aligned with decorative left border)

Two-column layout (desktop) / stacked (mobile):
  Left (60%): Bio paragraphs
  Right (40%): Info card

Bio text:
"I'm a first-year Computer Science Engineering student at Matrusri Engineering College, Hyderabad, 
passionate about building real-world solutions using AI, cloud technologies, and modern web development.

As a Google Student Ambassador, I represent cutting-edge tech initiatives within the student community 
and drive local digital bootcamps. Through the Big-Oh Club, I sharpen my problem-solving and 
algorithmic thinking continuously.

I'm fluent in English, Hindi, and Telugu, and when I'm not coding, you'll find me playing competitive 
Table Tennis, drawing, or enjoying music and cinema."

Info card (right side) — simple bordered card:
  📍 Hyderabad, Telangana, India
  🎓 B.E. CSE — Matrusri Engineering College (2024–2028)
  📧 mitulnayakwadi@gmail.com
  🔗 LinkedIn · GitHub (icon links)
```

#### 3. SKILLS SECTION
```
Section title: "Technical Skills"
Layout: Grouped by category, each category on its own row

Categories and pills:
  Languages:       Python · Java · C · JavaScript · TypeScript
  Web Dev:         HTML · CSS · Flask · React
  Cloud:           AWS · Google Cloud
  AI/ML:           Generative AI · Machine Learning · TensorFlow · Deep Learning
  Databases:       SQL · Database Design · Firebase
  Tools:           Git · GitHub · VS Code · Vite
  CS Fundamentals: Data Structures · Algorithms · OOP · Problem Solving

Each pill: rounded-full, border border-blue-200, bg-blue-50, text-blue-800, text-sm font-mono
Category label: small uppercase tracked label above each row, text-secondary
```

#### 4. PROJECTS SECTION
```
Section title: "Key Projects"

Display as a vertical list of cards (NOT a grid — more editorial/resume feel).
Each card has a subtle left border accent (2px blue).

--- CARD STRUCTURE ---
Top row: Project name (bold, 18px) + GitHub icon link (right-aligned)
Second row: Tech stack tags (monospace pills, smaller, gray bg)
Body: 2–3 bullet points describing what was built

PROJECT DATA:

1. Medico AI — AI-Driven Medical Assistance System
   Stack: Python · Streamlit · PyTorch · JavaScript · HTML · CSS
   • Implemented decision logic for preliminary health insights using ML
   • Built an interactive UI for accessible medical guidance
   • Applied ML concepts with focus on reliability and scalability
   GitHub: https://github.com/MitulNayakwadi/Medico-AI.git

2. Groundwater DWLR Management System — [SIH Project]
   Stack: JavaScript · Flask · SQL
   • Developed monitoring system for groundwater DWLR-related records
   • Organized data workflows supporting structured tracking & reporting
   • Designed for public-impact use cases and practical problem-solving
   GitHub: [link from repo]

3. SecureSphere — Cybersecurity Web Application
   Stack: React · TypeScript · Vite · Gemini AI · Supabase
   • Cybersecurity-focused app with secure software development practices
   • Implemented authentication workflows and security-oriented architecture
   • Applied backend principles for scalable, maintainable solutions
   GitHub: [link from repo]

4. Uppal Kalan Street Food Guide
   Stack: HTML · CSS · JavaScript
   • Location-based platform showcasing popular food destinations
   • Designed responsive UI for seamless cross-device navigation
   • Structured local business data to improve accessibility
   Live: https://uppallocalfoodguide.vercel.app/
   GitHub: https://github.com/MitulNayakwadi/uppallocalguide.git
```

#### 5. EXPERIENCE & LEADERSHIP SECTION
```
Section title: "Experience & Leadership"
Layout: Vertical timeline (simple — left line with dots, no heavy styling)

Timeline Item 1:
  Role: Google Student Ambassador
  Period: 2026 – Present
  • Represent Google technologies and learning initiatives within the student community
  • Promote awareness of AI, cloud technologies, and software engineering best practices
  • Support student-focused workshops and technical events

Timeline Item 2:
  Role: Big-Oh Club Member
  Period: 2025 – Present
  • Participate in algorithmic problem-solving and technical discussions
  • Collaborate with peers on coding challenges and software development
  • Strengthen analytical thinking through continuous practice
```

#### 6. EDUCATION SECTION
```
Section title: "Education"
Layout: Three cards in a row (desktop) / stacked (mobile)

Card 1 (most prominent):
  Matrusri Engineering College, Hyderabad
  B.E. Computer Science Engineering
  2024 – 2028 (Current)

Card 2:
  Excellencia Junior College, Hyderabad
  Intermediate (MPC)
  2022 – 2024 | Score: 92.4%

Card 3:
  Sri Saraswathi Sisu Mandir, Hyderabad
  Secondary School
  2022 | CGPA: 9.3
```

#### 7. CERTIFICATIONS SECTION
```
Section title: "Certifications"
Layout: Two-column list with checkmark icons

• Generative AI Mastermind — Outskill
• Python Essentials 1 — Cisco Networking Academy
• Python Full Stack Developer Virtual Internship — EduSkills
• Software Engineering Job Simulation — JPMorgan Chase & Co.
• Technology Job Simulation — Deloitte
• Database Design — Infosys Springboard
• What Is Generative AI? — LinkedIn Learning

Also add under "Achievements":
• Google Cloud Skill Badges: Prompt Design & CI/CD Pipelines
• Multiple industry-recognized software engineering job simulations
• Active contributor to technical communities & student initiatives
```

#### 8. CONTACT SECTION
```
Section title: "Get In Touch"
Centered layout, simple and clean

Tagline: "I'm always open to new opportunities, collaborations, or just a great tech conversation."

Three icon+link rows:
  📧 mitulnayakwadi@gmail.com
  💼 linkedin.com/in/mitul-nayakwadi-6a3218319
  🐙 github.com/MitulNayakwadi

Optional: Simple contact form (Name · Email · Message · Send button)
```

#### 9. FOOTER
```
Centered, minimal:
  "Designed & Built by Mitul Nayakwadi · 2026"
  Small: "Vite · React · TypeScript · Tailwind · Framer Motion"
```

---

## 🌙 DARK MODE — GAMIFIED PORTFOLIO (Existing Version)

> **Keep the existing dark/gamified portfolio exactly as-is.**  
> When the user clicks the toggle to switch to dark mode, the gamified portfolio renders.

### Implementation Strategy

Use a top-level `ThemeProvider` context:

```tsx
// context/ThemeContext.tsx
import { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({ theme: 'light', toggleTheme: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('portfolio-theme') as Theme) || 'light'
  })

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

### Root App Structure

```tsx
// App.tsx
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from './context/ThemeContext'
import ProfessionalPortfolio from './components/ProfessionalPortfolio'
import GamifiedPortfolio from './components/GamifiedPortfolio' // existing code

export default function App() {
  const { theme } = useTheme()

  return (
    <AnimatePresence mode="wait">
      {theme === 'light' ? (
        <motion.div
          key="professional"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ProfessionalPortfolio />
        </motion.div>
      ) : (
        <motion.div
          key="gamified"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <GamifiedPortfolio />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

---

## 🔘 THEME TOGGLE BUTTON

Place this button in the top-right corner of BOTH portfolio versions' navigation bars.

```tsx
// components/ThemeToggle.tsx
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-full border border-slate-200 dark:border-slate-700 
                 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200
                 hover:bg-slate-50 transition-colors"
      aria-label="Toggle portfolio mode"
      title={theme === 'light' ? 'Switch to Gamified Mode' : 'Switch to Professional Mode'}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </motion.div>
    </motion.button>
  )
}
```

---

## 📁 FILE STRUCTURE

```
src/
├── context/
│   └── ThemeContext.tsx          ← Theme state management
├── components/
│   ├── ThemeToggle.tsx           ← Sun/Moon toggle button
│   ├── ProfessionalPortfolio/
│   │   ├── index.tsx             ← Main wrapper
│   │   ├── Navbar.tsx            ← Fixed top nav with horizontal links
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Education.tsx
│   │   ├── Certifications.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── GamifiedPortfolio/
│       └── index.tsx             ← Your EXISTING portfolio code (moved here)
├── data/
│   └── portfolio.ts              ← All content data (projects, skills, etc.)
├── App.tsx
└── main.tsx
```

---

## 📦 SCROLL ANIMATION UTILITY

Create a reusable wrapper to avoid repeating animation code:

```tsx
// components/AnimateOnScroll.tsx
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export default function AnimateOnScroll({ children, delay = 0, direction = 'up' }: Props) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 24 : 0,
      x: direction === 'left' ? -24 : direction === 'right' ? 24 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  )
}
```

---

## 🎨 TAILWIND CONFIG ADDITIONS

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',         // ← REQUIRED for .dark class toggle
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        navy: '#1A1A2E',
        accent: '#2563EB',
      },
    },
  },
  plugins: [],
}
```

Add to `index.html` `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## ✅ FINAL CHECKLIST FOR AI TOOL

When generating, make sure:

- [ ] Light mode loads by default (`localStorage` fallback to `"light"`)
- [ ] `document.documentElement.classList` toggling `.dark` class
- [ ] `AnimatePresence mode="wait"` wraps both portfolio versions
- [ ] Navigation is horizontal, fixed, top-right links, with active-section highlight
- [ ] All sections use `whileInView` scroll reveal animations
- [ ] Professional portfolio uses `Playfair Display` or `DM Serif Display` for headings
- [ ] Tech stack tags use JetBrains Mono
- [ ] Color palette follows the spec above (no purple gradients!)
- [ ] ThemeToggle renders in both dark and light navbars
- [ ] Existing gamified portfolio is untouched, just wrapped in a conditional render
- [ ] Mobile responsive (hamburger menu or collapsible nav on mobile)
- [ ] Smooth section scrolling via `scroll-behavior: smooth` or Framer Motion scroll
- [ ] All real data from resume is used (no placeholder lorem ipsum)

---

*Prompt crafted for Mitul Nayakwadi's Personal Portfolio — June 2026*
