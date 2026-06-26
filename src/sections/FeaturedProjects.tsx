import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import LazyVideo from '../components/LazyVideo';

const projects = [
  {
    title: 'Financial Dashboard',
    subtitle: 'AI-powered personal finance dashboard with WhatsApp integration, automated expense tracking, and smart financial insights',
    stack: 'React • Node.js • Python • Tailwind',
    focus: 'AI classification • Expense intelligence • Full-stack finance platform',
    image: '/images/hero-mountains.jpg',
    video: '/videos/financial-dashboard.mp4',
    details: [
      'Built an end-to-end financial dashboard for personal expense monitoring.',
      'Integrated WhatsApp-based interactions for quick expense updates and reminders.',
      'Used AI to classify transactions and surface meaningful financial insights.',
      'Designed as a polished full-stack experience with real-time tracking and analytics.',
    ],
    links: { github: '#', demo: '#', caseStudy: '#' },
  },
  {
    title: 'Video Rendering Engine',
    subtitle: 'A high-performance video processing platform built with FFmpeg for rendering, transcoding, and media workflows',
    stack: 'FFmpeg • Python • React • FastAPI',
    focus: 'Video rendering • Media processing • Scalable backend pipelines',
    image: '/images/hero-mountains.jpg',
    video: '/videos/rendering-software.mp4',
    details: [
      'Built a custom video rendering workflow around FFmpeg for media transformation.',
      'Handled rendering, transcoding, and automation for large video assets.',
      'Designed a polished interface for uploading, processing, and tracking video jobs.',
      'Focused on reliable pipelines and a smooth developer experience.',
    ],
    links: { github: 'https://github.com/Prasoontiwari7', demo: '', caseStudy: '' },
  },
  {
    title: 'GoSecure',
    subtitle: 'Smart Tourist Safety Monitoring System',
    stack: 'React • Node.js • AWS • GIS',
    focus: 'Real-time travel safety • Location monitoring • SOS alerts',
    image: '/images/hero-mountains.jpg',
    video: '/videos/gosecure-preview.mp4',
    details: [
      'Built a safety platform for tourists visiting unfamiliar locations.',
      'Implemented live location monitoring and emergency notification workflows.',
      'Designed a mobile-friendly dashboard for route awareness and alerts.',
      'Focused on real-time traveler safety and responsive UI for on-the-go use.',
    ],
    links: { github: 'https://github.com/Prasoontiwari7', demo: 'https://gosecure7.netlify.app/contact', caseStudy: '' },
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="relative w-full rounded-2xl overflow-hidden group cursor-pointer"
      style={{
        height: 'clamp(400px, 60vh, 600px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Background Media */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {project.video ? (
          <LazyVideo
            src={project.video}
            poster={project.image}
            className="w-full h-full"
            style={{ position: 'absolute', inset: 0 }}
            autoPlayWhenVisible={true}
            rootMargin="100px 0px"
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500 z-[1]" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-12">
        <div className="max-w-3xl">
          <h4 className="text-[#D4F87A] text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-body)' }}>
            {project.stack}
          </h4>
          <h3 className="text-[#FAFAFA] text-3xl md:text-6xl mb-2" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.02em' }}>
            {project.title}
          </h3>
          <p className="text-white/80 text-base md:text-xl mb-4" style={{ fontFamily: 'var(--font-body)' }}>
            {project.subtitle}
          </p>
          <p className="text-[#888888] text-sm tracking-wider uppercase mb-8" style={{ fontFamily: 'var(--font-body)' }}>
            Focus: {project.focus}
          </p>

          {expanded && project.details && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-xl border border-white/10 bg-black/50 p-4 backdrop-blur-md"
            >
              <p className="text-[#FAFAFA] text-sm uppercase tracking-[0.2em] mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                Project Highlights
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                {project.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="text-[#D4F87A]">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Links */}
          <div className="flex gap-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-[#FAFAFA] text-sm tracking-widest uppercase hover:text-[#D4F87A] transition-colors" style={{ fontFamily: 'var(--font-body)' }}>GitHub</a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { amount: 0.8, once: true });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#0A0A0A]"
      style={{ padding: '120px clamp(20px, 4vw, 60px)' }}
    >
      {/* Section Heading */}
      <div
        ref={headingRef}
        className="flex items-center gap-6 mb-16"
      >
        <motion.div
          className="hairline-left flex-1 h-px"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)', originX: 1 }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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
          FEATURED PROJECTS
        </h2>
        <motion.div
          className="hairline-right flex-1 h-px"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)', originX: 0 }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="flex flex-col gap-10 max-w-[1400px] mx-auto">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
