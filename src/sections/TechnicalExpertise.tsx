import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom icons reflecting the categories
function CodeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4F87A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function WebIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4F87A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function DataIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4F87A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}

function AiIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4F87A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

const cards = [
  {
    icon: <CodeIcon />,
    title: 'Programming',
    body: 'Python • C++ • Java • Kotlin',
  },
  {
    icon: <WebIcon />,
    title: 'Web Development',
    body: 'HTML • CSS • React • Responsive Design',
  },
  {
    icon: <DataIcon />,
    title: 'Data Science',
    body: 'Analytics • Visualization • Data Processing • Machine Learning',
  },
  {
    icon: <AiIcon />,
    title: 'AI Engineering',
    body: 'Claude • Cursor • Kimi • Prompt Engineering',
  },
];

export default function TechnicalExpertise() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Heading hairline
      const rule = headingRef.current?.querySelector('.hairline-right');
      if (rule) {
        gsap.fromTo(
          rule,
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

      // Cards stagger
      const cardEls = cardsRef.current?.querySelectorAll('.included-card');
      if (cardEls) {
        gsap.fromTo(
          cardEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="relative bg-[#0A0A0A]"
      style={{ padding: '120px clamp(20px, 4vw, 60px)' }}
    >
      {/* Section Heading */}
      <div
        ref={headingRef}
        className="flex items-center gap-6 mb-16"
      >
        <h2
          className="text-[#FAFAFA] whitespace-nowrap"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 6vw, 96px)',
            letterSpacing: '0.04em',
            lineHeight: 1,
          }}
        >
          TECHNICAL EXPERTISE
        </h2>
        <div
          className="hairline-right flex-1 h-px"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
        />
      </div>

      {/* Bento Grid */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1400px] mx-auto"
      >
        {cards.map((card) => (
          <div
            key={card.title}
            className="included-card glass-card flex flex-col gap-4 group cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '16px',
              padding: '32px',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'translateY(-4px)';
              el.style.borderColor = 'rgba(212,248,122,0.4)';
              el.style.boxShadow = '0 8px 32px rgba(212,248,122,0.08)';
              const icon = el.querySelector('.card-icon');
              if (icon) {
                (icon as HTMLElement).style.transform = 'scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'translateY(0)';
              el.style.borderColor = 'rgba(255,255,255,0.1)';
              el.style.boxShadow = 'none';
              const icon = el.querySelector('.card-icon');
              if (icon) {
                (icon as HTMLElement).style.transform = 'scale(1)';
              }
            }}
          >
            <div
              className="card-icon transition-transform duration-300"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              {card.icon}
            </div>
            <h3
              className="text-[#FAFAFA] mt-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                lineHeight: 1.4,
              }}
            >
              {card.title}
            </h3>
            <p
              className="text-white/70"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                lineHeight: 1.7,
              }}
            >
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
