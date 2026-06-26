import { useEffect, useState } from 'react';
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0A0A0A]/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-10 py-5">
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

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-8">
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

        {/* Profile Links */}
        <div className="flex items-center gap-3">
          <a
            href={PROFILE_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#D4F87A]/70 hover:bg-[#D4F87A] hover:text-[#0A0A0A]"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={PROFILE_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#D4F87A]/70 hover:bg-[#D4F87A] hover:text-[#0A0A0A]"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={PROFILE_LINKS.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#D4F87A]/70 hover:bg-[#D4F87A] hover:text-[#0A0A0A]"
            aria-label="LeetCode"
          >
            <Code2 className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
