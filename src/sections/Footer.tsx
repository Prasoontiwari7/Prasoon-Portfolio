import { Code2, Github, Linkedin } from 'lucide-react';
import { PROFILE_LINKS } from '../lib/profile';

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="bg-[#0A0A0A]"
      style={{ padding: '40px clamp(20px, 4vw, 60px)' }}
    >
      {/* Hairline */}
      <div
        className="w-full h-px mb-8"
        style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
      />

      {/* Content row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Wordmark */}
        <div className="flex items-center gap-2.5">
          <GlobeIcon />
          <span
            className="text-[#FAFAFA] text-xs tracking-[0.18em] uppercase"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            PRASOON TIWARI
          </span>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-8">
          <button onClick={() => scrollToSection('hero')} className="nav-link">
            Home
          </button>
          <button onClick={() => scrollToSection('about')} className="nav-link">
            About
          </button>
          <button onClick={() => scrollToSection('projects')} className="nav-link">
            Projects
          </button>
          <button onClick={() => scrollToSection('expertise')} className="nav-link">
            Expertise
          </button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">
            Contact
          </button>
        </nav>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href={PROFILE_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-[#D4F87A] transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-[18px] w-[18px]" />
          </a>
          <a
            href={PROFILE_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-[#D4F87A] transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>
          <a
            href={PROFILE_LINKS.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-[#D4F87A] transition-colors duration-200"
            aria-label="LeetCode"
          >
            <Code2 className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
