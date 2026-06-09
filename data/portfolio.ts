export interface ProjectData {
  id: string;
  name: string;
  category: string;
  techStack: string[];
  bullets: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  role: string;
  period: string;
  company: string;
  points: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  score?: string;
  prominent?: boolean;
}

export const HERO_DATA = {
  greeting: "Hi, I'm",
  name: "Mitul Nayakwadi",
  title: "CS Engineering Student · Full-Stack Developer",
  tagline: "Turning ideas into intelligent real-world projects through code, & creativity",
  resumeUrl: "https://drive.google.com/file/d/1MLD7Z5xuwqBRELUfXhxPv2SgIGFKE8rE/view?usp=sharing",
};

export const ABOUT_DATA = {
  title: "About Me",
  paragraphs: [
    "I'm a Computer Science Engineering student at Matrusri Engineering College, Hyderabad, passionate about building real-world solutions using AI, cloud technologies, and modern web development.",
    "I have a solid foundation in full-stack development and am continuously learning and improving my skills in this domain. Through the Big-Oh Club, I sharpen my problem-solving and algorithmic thinking to tackle complex computational challenges.",
    "I'm fluent in English, Hindi, and Telugu, and when I'm not coding, you'll find me drawing, enjoying music and cinema, or exploring new opportunities in tech. Always open to collaborate and grow!"
  ],
  info: {
    location: "Hyderabad, Telangana, India",
    education: "B.E. CSE — Matrusri Engineering College (2024–2028)",
    email: "mitulnayakwadi@gmail.com",
    linkedin: "https://linkedin.com/in/mitul-nayakwadi-6a3218319",
    github: "https://github.com/MitulNayakwadi"
  }
};

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: ["Python", "Java", "C", "JavaScript", "TypeScript"]
  },
  {
    category: "Web Development",
    skills: ["React", "Flask", "HTML", "CSS"]
  },
  {
    category: "AI & Machine Learning",
    skills: ["Machine Learning", "Deep Learning", "Generative AI", "TensorFlow"]
  },
  {
    category: "Databases & Cloud",
    skills: ["SQL", "Database Design", "Firebase", "AWS", "Google Cloud"]
  },
  {
    category: "Developer Tools",
    skills: ["Git", "GitHub", "VS Code", "Vite"]
  },
  {
    category: "Core Concepts",
    skills: ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)", "Problem Solving"]
  }
];

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: "medico-ai",
    name: "Medico AI — AI-Driven Medical Assistance System",
    category: "AI Healthcare",
    techStack: ["Python", "Streamlit", "PyTorch", "JavaScript", "HTML", "CSS"],
    bullets: [
      "Implemented decision logic for preliminary health insights using ML",
      "Built an interactive UI for accessible medical guidance",
      "Applied ML concepts with focus on reliability and scalability"
    ],
    githubUrl: "https://github.com/MitulNayakwadi/Medico-AI.git"
  },
  {
    id: "groundwater-dwlr",
    name: "Groundwater DWLR Management System — [SIH Project]",
    category: "GovTech / Environment",
    techStack: ["JavaScript", "Flask", "SQL"],
    bullets: [
      "Developed monitoring system for groundwater DWLR-related records",
      "Organized data workflows supporting structured tracking & reporting",
      "Designed for public-impact use cases and practical problem-solving"
    ],
    githubUrl: "https://github.com/MitulNayakwadi/DWLR"
  },
  {
    id: "securesphere",
    name: "SecureSphere — Cybersecurity Web Application",
    category: "Cybersecurity",
    techStack: ["React", "TypeScript", "Vite", "Gemini AI", "Supabase"],
    bullets: [
      "Cybersecurity-focused app with secure software development practices",
      "Implemented authentication workflows and security-oriented architecture",
      "Applied backend principles for scalable, maintainable solutions"
    ],
    githubUrl: "https://github.com/MitulNayakwadi/SecureSphere"
  },
  {
    id: "uppal-guide",
    name: "Uppal Kalan Street Food Guide",
    category: "Local Discovery",
    techStack: ["HTML", "CSS", "JavaScript"],
    bullets: [
      "Location-based platform showcasing popular food destinations",
      "Designed responsive UI for seamless cross-device navigation",
      "Structured local business data to improve accessibility"
    ],
    liveUrl: "https://uppallocalfoodguide.vercel.app/",
    githubUrl: "https://github.com/MitulNayakwadi/uppallocalguide.git"
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: "Google Student Ambassador",
    company: "Google Student Ambassador Program",
    period: "2026 – Present",
    points: [
      "Represent Google technologies and learning initiatives within the student community",
      "Promote awareness of AI, cloud technologies, and software engineering best practices",
      "Support student-focused workshops and technical events"
    ]
  },
  {
    role: "Big-Oh Club Member",
    company: "Matrusri Engineering College Coding Club",
    period: "2025 – Present",
    points: [
      "Participate in algorithmic problem-solving and technical discussions",
      "Collaborate with peers on coding challenges and software development",
      "Strengthen analytical thinking through continuous practice"
    ]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: "Matrusri Engineering College, Hyderabad",
    degree: "B.E. Computer Science Engineering",
    period: "2024 – 2028 (Current)",
    prominent: true
  },
  {
    institution: "Excellencia Junior College, Hyderabad",
    degree: "Intermediate (MPC)",
    period: "2022 – 2024",
    score: "Score: 92.4%"
  },
  {
    institution: "Sri Saraswathi Sisu Mandir, Hyderabad",
    degree: "Secondary School",
    period: "2022",
    score: "CGPA: 9.3"
  }
];

export const CERTIFICATIONS_DATA = [
  "Prompt Design in Vertex — Google Cloud",
  "Implement CI/CD Pipelines on Google Cloud — Google Cloud",
  "Python Essentials 1 — Cisco Networking Academy",
  "Software Engineering Job Simulation — JPMorgan Chase & Co.",
  "Technology Job Simulation — Deloitte",
  "Database Design — Infosys Springboard",
  "Python Full Stack Internship — EduSkills (AICTE)",
  "Python Training Certificate — EduPyramids, SINE, IIT Bombay",
  "Generative AI Fundamentals — Google Cloud Training",
  "Intro to Machine Learning — Kaggle"
];

export const ACHIEVEMENTS_DATA = [
  "Google Cloud Skill Badges: Prompt Design & CI/CD Pipelines",
  "Multiple industry-recognized software engineering job simulations",
  "Active contributor to technical communities & student initiatives"
];

export const CONTACT_DATA = {
  tagline: "I'm always open to new opportunities, collaborations, or just a great tech conversation.",
  email: "mitulnayakwadi@gmail.com",
  linkedin: "linkedin.com/in/mitul-nayakwadi-6a3218319",
  linkedinUrl: "https://linkedin.com/in/mitul-nayakwadi-6a3218319",
  github: "github.com/MitulNayakwadi",
  githubUrl: "https://github.com/MitulNayakwadi"
};
