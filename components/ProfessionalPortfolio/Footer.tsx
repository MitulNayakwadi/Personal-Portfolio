import AnimateOnScroll from '../AnimateOnScroll';
import { Mail, Linkedin, Github } from 'lucide-react';
import { CONTACT_DATA } from '../../data/portfolio';

export default function Footer() {
  return (
    <footer className="py-6 px-6 border-t border-slate-200/60 bg-[#FAFAF8] text-center font-body">
      <AnimateOnScroll direction="up">
        <div className="max-w-[900px] mx-auto flex flex-col items-center justify-center gap-2.5 select-none">
          {/* Brand Name */}
          <span className="font-display text-base font-bold text-[#1A1A2E] tracking-tight">
            Mitul Nayakwadi
          </span>

          {/* Socials */}
          <div className="flex items-center gap-5 text-slate-400">
            <a
              href={`mailto:${CONTACT_DATA.email}`}
              className="hover:text-[#2563EB] transition-colors"
              aria-label="Email Address"
              data-hover="true"
            >
              <Mail size={16} />
            </a>
            <a
              href={CONTACT_DATA.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2563EB] transition-colors"
              aria-label="LinkedIn Profile"
              data-hover="true"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={CONTACT_DATA.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2563EB] transition-colors"
              aria-label="GitHub Profile"
              data-hover="true"
            >
              <Github size={16} />
            </a>
          </div>

          {/* Copyright statement */}
          <p className="text-[12px] text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} Mitul Nayakwadi. All rights reserved.
          </p>
        </div>
      </AnimateOnScroll>
    </footer>
  );
}
