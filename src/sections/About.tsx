import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView } from 'framer-motion';
import { Code2, Github, Linkedin } from 'lucide-react';
import ResumeModal from './ResumeModal';
import { PROFILE_LINKS, RESUME_MODAL_EVENT } from '../lib/profile';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    days: '2026',
    city: 'Deloitte Australia Data Analytics on Forage',
    photos: [
      { src: '/images/deloitte-data-analytics-forage.png', alt: 'Deloitte Data Analytics Forage program' },
      { src: '/images/deloitte-tableau-dashboard.png', alt: 'Tableau dashboard created for Deloitte simulation' },
    ],
  },
  {
    days: '2025',
    city: 'SkipperX Marketing Internship',
    photos: [
      { src: '/images/skipperx-offer-letter.png', alt: 'SkipperX Offer Letter' },
      { src: '/images/skipperx-team.png', alt: 'SkipperX Team' },
    ],
  },
  {
    days: '2026',
    city: 'Data Scientist - Shyara Tech Solutions',
    photos: [
      { src: '/images/shyara-offer-letter.svg', alt: 'Shyara Tech Offer Letter' },
      { src: '/images/shyara-acceptance.svg', alt: 'Shyara Tech Acceptance & NDA' },
    ],
  },
  {
    days: 'Future Node',
    city: 'Open To Opportunities',
    photos: [],
  },
];

function TimelineNodeComponent({ node, index }: { node: typeof timelineData[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });

  return (
    <motion.div
      ref={ref}
      className="timeline-node relative flex items-start gap-6"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.2 }}
    >
      {/* Node dot */}
      <div className="relative z-10 ml-[30%] -translate-x-1/2 mt-1">
        <div className="w-2 h-2 rounded-full bg-[#FAFAFA]" />
      </div>

      {/* Label */}
      <div className="flex-1 min-w-0">
        <div className="mb-1">
          <span
            className="text-[#D4F87A] text-xs tracking-[0.12em] uppercase"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
          >
            {node.days}
          </span>
        </div>
        <h3
          className="text-[#FAFAFA] text-sm tracking-[0.12em] uppercase mb-4"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
        >
          {node.city}
        </h3>

        {/* Photo cluster */}
        {node.photos.length > 0 ? (
          <div
            className="relative group"
            style={{ width: '200px', height: '130px' }}
          >
            <img
              src={node.photos[0].src}
              alt={node.photos[0].alt}
              className="absolute top-0 left-0 w-[160px] h-[110px] object-cover rounded-md transition-all duration-300"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                transform: 'rotate(-3deg)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(-6deg)';
                e.currentTarget.style.zIndex = '10';
                const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                if (sibling) {
                  sibling.style.transform = 'translateX(24px) rotate(6deg)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotate(-3deg)';
                e.currentTarget.style.zIndex = '1';
                const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                if (sibling) {
                  sibling.style.transform = 'translateX(16px) translateY(12px) rotate(3deg)';
                }
              }}
              loading="lazy"
            />
            <img
              src={node.photos[1].src}
              alt={node.photos[1].alt}
              className="absolute top-3 left-4 w-[160px] h-[110px] object-cover rounded-md transition-all duration-300"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                transform: 'translateX(16px) translateY(12px) rotate(3deg)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(24px) rotate(6deg)';
                e.currentTarget.style.zIndex = '10';
                const sibling = e.currentTarget.previousElementSibling as HTMLElement;
                if (sibling) {
                  sibling.style.transform = 'rotate(-6deg)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(16px) translateY(12px) rotate(3deg)';
                e.currentTarget.style.zIndex = '1';
                const sibling = e.currentTarget.previousElementSibling as HTMLElement;
                if (sibling) {
                  sibling.style.transform = 'rotate(-3deg)';
                }
              }}
              loading="lazy"
            />
          </div>
        ) : (
          <div className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70" style={{ width: '200px' }}>
            Open to new opportunities and meaningful projects.
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const p3Ref = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const handleOpenResume = () => {
      setIsResumeOpen(true);
    };

    window.addEventListener(RESUME_MODAL_EVENT, handleOpenResume);
    return () => window.removeEventListener(RESUME_MODAL_EVENT, handleOpenResume);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Heading hairline rules animation
      const leftRule = headingRef.current?.querySelector('.hairline-left');
      const rightRule = headingRef.current?.querySelector('.hairline-right');

      if (leftRule && rightRule) {
        gsap.fromTo(
          leftRule,
          { scaleX: 0, transformOrigin: 'right center' },
          {
            scaleX: 1,
            duration: 1,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
        gsap.fromTo(
          rightRule,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Paragraphs and button fade in
      gsap.fromTo(
        [p1Ref.current, p2Ref.current, p3Ref.current, btnRef.current, linksRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: {
            trigger: p1Ref.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#0A0A0A]"
      style={{ padding: '120px clamp(20px, 4vw, 60px)' }}
    >
      {/* Section Heading with hairlines */}
      <div
        ref={headingRef}
        className="flex items-center justify-center gap-6 mb-20"
      >
        <div
          className="hairline-left flex-1 h-px"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
        />
        <h2
          className="text-[#FAFAFA] whitespace-nowrap"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 6vw, 96px)',
            letterSpacing: '0.04em',
            lineHeight: 1,
          }}
        >
          ABOUT THE ENGINEER
        </h2>
        <div
          className="hairline-right flex-1 h-px"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
        />
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 max-w-[1400px] mx-auto">
        {/* Left: Text */}
        <div className="lg:w-[45%]">
          <p
            ref={p1Ref}
            className="text-[#FAFAFA] text-lg leading-relaxed mb-8"
            style={{ fontFamily: 'var(--font-body)', lineHeight: 1.7 }}
          >
            I am a third-year Computer Science student passionate about <span className="text-[#D4F87A] transition-colors duration-600">Software Engineering</span>, <span className="text-[#D4F87A] transition-colors duration-600">Data Science</span>, <span className="text-[#D4F87A] transition-colors duration-600">Artificial Intelligence</span>, and building products that solve real-world problems.
          </p>
          <p
            ref={p2Ref}
            className="text-[#FAFAFA] text-lg leading-relaxed mb-8"
            style={{ fontFamily: 'var(--font-body)', lineHeight: 1.7 }}
          >
            My journey spans startup experience, analytics, web development, marketing, leadership, and AI-powered development workflows.
          </p>
          <p
            ref={p3Ref}
            className="text-[#FAFAFA] text-lg leading-relaxed mb-10"
            style={{ fontFamily: 'var(--font-body)', lineHeight: 1.7 }}
          >
            I enjoy turning ideas into scalable digital experiences while continuously learning emerging technologies.
          </p>
          <button
            ref={btnRef}
            onClick={() => setIsResumeOpen(true)}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            <span className="text-[#FAFAFA] text-xs tracking-widest uppercase font-medium" style={{ fontFamily: 'var(--font-body)' }}>View Resume</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4F87A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <div ref={linksRef} className="mt-5 flex flex-wrap gap-3">
            <a
              href={PROFILE_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-medium uppercase tracking-widest text-[#FAFAFA] transition-all duration-300 hover:border-[#D4F87A]/50 hover:bg-white/10 hover:text-[#D4F87A]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={PROFILE_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-medium uppercase tracking-widest text-[#FAFAFA] transition-all duration-300 hover:border-[#D4F87A]/50 hover:bg-white/10 hover:text-[#D4F87A]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={PROFILE_LINKS.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-medium uppercase tracking-widest text-[#FAFAFA] transition-all duration-300 hover:border-[#D4F87A]/50 hover:bg-white/10 hover:text-[#D4F87A]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <Code2 className="h-4 w-4" />
              LeetCode
            </a>
          </div>
        </div>

        {/* Right: Timeline */}
        <div className="lg:w-[55%] relative mt-16 lg:mt-0">
          {/* Vertical hairline */}
          <div
            className="absolute left-[30%] top-0 bottom-0 w-px"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          />

          {/* Timeline nodes */}
          <div className="flex flex-col gap-16">
            {timelineData.map((node, i) => (
              <TimelineNodeComponent key={node.city} node={node} index={i} />
            ))}
          </div>
        </div>
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}
