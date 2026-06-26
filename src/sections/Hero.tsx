import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type PolaroidItem = {
  video?: string;
  title: string;
  caption: string;
  type?: string;
  animationType?: string;
};

const polaroids: PolaroidItem[] = [
  { video: '/videos/skipperx-internship.mp4', title: 'SkipperX', caption: 'Brand & Campaign Partner' },
  { video: '/videos/leetcode-internship.mp4', title: '200+', caption: 'LeetCode Problems Solved' },
  { video: '/videos/shyara-internship.mp4', title: 'Data Scientist', caption: 'Shyara Tech Solutions' },
  { video: '/videos/deloitte-dashboard.mp4', title: 'Deloitte', caption: 'Data Analytics Experience' },
  { video: '/videos/rendering-software.mp4', title: 'Video Rendering Software', caption: 'FFmpeg-based rendering workflow' },
];

function PolaroidCard({ item, isMobile, index }: { item: PolaroidItem; isMobile: boolean; index: number }) {
  const [mediaReady, setMediaReady] = useState(item.type === 'animated');

  return (
    <motion.div
      key={index}
      className="polaroid-card group flex-shrink-0 rounded-lg overflow-hidden cursor-pointer"
      style={{
        width: isMobile ? '140px' : '160px',
        height: isMobile ? '170px' : '180px',
        background: 'rgba(10,10,10,0.6)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
      }}
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 1.2 + (index * 0.1)
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(212, 248, 122, 0.15)',
        borderColor: 'rgba(212, 248, 122, 0.3)',
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      }}
      onMouseEnter={(e) => {
        const video = e.currentTarget.querySelector('video');
        if (video) (video as HTMLVideoElement).play().catch(() => {});
      }}
    >
      <div className="w-full h-[100px] overflow-hidden pointer-events-none relative">
        {item.type === 'animated' ? (
          <div
            className="w-full h-full flex items-center justify-center text-center relative"
            style={{
              background: item.animationType === 'leetcode'
                ? 'linear-gradient(135deg, #FFB800 0%, #FF6B35 100%)'
                : item.animationType === 'deloitte'
                ? 'linear-gradient(135deg, #0066B2 0%, #00A4EF 100%)'
                : 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
              animation: 'pulse-gradient 3s ease-in-out infinite',
            }}
          >
            <div className="text-white font-bold text-2xl drop-shadow-lg">
              {item.animationType === 'leetcode' ? '💻' : item.animationType === 'deloitte' ? '📊' : '🚀'}
            </div>
          </div>
        ) : (
          <video
            src={item.video}
            muted
            loop
            playsInline
            preload="auto"
            autoPlay
            className="w-full h-full object-cover"
            onLoadedData={(event) => {
              const video = event.currentTarget as HTMLVideoElement;
              setMediaReady(true);
              video.play().catch(() => {});
            }}
          />
        )}
        <div className={`absolute inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${mediaReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="text-center px-2">
            <p className="text-[#D4F87A] text-[10px] uppercase tracking-[0.24em] mb-1">Loading video</p>
            <p className="text-white/70 text-[11px]">Please wait</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-50" />
      </div>
      <div className="p-3 pt-2 pointer-events-none">
        <h3 className="text-[#D4F87A] text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: 'var(--font-body)' }}>
          {item.title}
        </h3>
        <p
          className="text-[11px] text-[#888888] leading-tight"
          style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.02em' }}
        >
          {item.caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ width: typeof window !== 'undefined' ? window.innerWidth : 0, height: typeof window !== 'undefined' ? window.innerHeight : 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewport.width > 0 ? viewport.width < 768 : false;

  // Parallax transforms (linear mapping as per prompt)
  const mountainY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : viewport.height * 0.25]);
  const typographyY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : viewport.height * 0.45]);
  const polaroidsX = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : viewport.width * -0.4]);
  const cherryY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : viewport.height * 0.1]);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const reloadWebsite = () => {
    window.location.reload();
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]"
      id="hero"
    >
      {/* ═══════════════════════════════════════════════════════════════
          LAYER 1: Sky backdrop (Background Plane)
          ═══════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, #7A8B99 0%, #B5C6D0 30%, #E2D5C4 60%, #E8D5CA 100%)',
        }}
      />
      
      {/* ═══════════════════════════════════════════════════════════════
          LAYER 1.5: Mountain Landscape (Sky Only / Background Mountain)
          ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{ y: mountainY, willChange: 'transform' }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src="/images/hero-mountains.jpg" // Placeholder for cinematic engineering universe
          alt="Cinematic data landscape"
          className="w-full h-full object-cover object-[center_30%]"
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 2: "PRASOON" display typography (Mid-ground Plane)
          Sits exactly behind the masked mountain foreground.
          ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-[2] flex flex-col justify-center items-center pointer-events-none"
        style={{
          y: typographyY,
          willChange: 'transform',
          paddingTop: '18vh',
        }}
      >
        <h2 
          className="text-[#FAFAFA] text-lg md:text-2xl tracking-[0.2em] font-medium mb-2 uppercase" 
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Hi, I'm
        </h2>
        <h1
          className="flex leading-[0.85] tracking-[0.02em]"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(100px, 18vw, 350px)',
            color: 'rgba(245,232,211,0.9)',
            textShadow: '0 2px 40px rgba(0,0,0,0.1)',
          }}
        >
          {'PRASOON'.split('').map((letter, i) => (
            <motion.span 
              key={i} 
              className="inline-block"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1], 
                delay: 0.4 + (i * 0.08) 
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Narrative Text underneath PRASOON */}
        <motion.div
          className="mt-8 text-center px-4 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-[#D4F87A] text-sm md:text-base uppercase tracking-[0.2em] mb-4 font-medium" style={{ fontFamily: 'var(--font-body)' }}>
            Software Engineer | Data Scientist | AI Builder
          </h2>
          <p className="text-white/70 text-sm md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Building intelligent systems, scalable applications, and AI-powered experiences through software engineering, data science, and modern development workflows.
          </p>
        </motion.div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 3: Mountain landscape Mask (Foreground Plane)
          Masks out the sky so the letters show through, but the peaks occlude the bottom of the letters.
          ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-[3]"
        style={{ y: mountainY, willChange: 'transform', pointerEvents: 'none' }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src="/images/hero-mountains.jpg" // Placeholder for foreground engineering landscape
          alt=""
          className="w-full h-full object-cover object-[center_30%]"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 25%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0.8) 45%, black 55%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 25%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0.8) 45%, black 55%, black 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(10,10,10,0.2) 80%, rgba(10,10,10,0.6) 100%)',
          }}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 4: Foreground Elements
          ═══════════════════════════════════════════════════════════════ */}

      {/* Cherry Blossom Branch -> Can be replaced with futuristic element later */}
      <motion.img
        src="/images/hero-cherry-branch.png"
        alt="Foreground element"
        className="absolute right-[-2vw] top-[20vh] z-[10] pointer-events-none"
        style={{
          width: 'clamp(150px, 18vw, 300px)',
          y: cherryY,
          willChange: 'transform'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      />

      {/* Kimono Figure -> Developer Silhouette (Placeholder) */}
      <motion.img
        src="/images/hero-kimono.png" // Placeholder
        alt="Developer gazing at the digital horizon"
        className="absolute right-[8vw] bottom-[8vh] z-[10] pointer-events-none"
        style={{
          width: 'clamp(200px, 25vw, 400px)',
          height: 'auto'
        }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      />

      {/* Primary & Secondary CTAs */}
      <motion.div
        className="absolute z-[12] hidden lg:flex gap-4 interactive-element"
        style={{
          right: '12vw',
          bottom: '22vh',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.6 }}
      >
        <button
          onClick={scrollToProjects}
          className="group"
          style={{
            background: 'rgba(212, 248, 122, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(212, 248, 122, 0.3)',
            borderRadius: '9999px',
            padding: '16px 48px',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#0A0A0A',
            backgroundImage: 'linear-gradient(to top, #FFFFFF, #D4F87A)',
            backgroundSize: '100% 0%',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
            transition: 'background-size 0.4s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundSize = '100% 100%';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundSize = '100% 0%';
          }}
        >
          VIEW WORK
        </button>

        <button
          type="button"
          onClick={reloadWebsite}
          className="group flex items-center justify-center"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '9999px',
            padding: '16px 48px',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#FAFAFA',
            transition: 'all 0.4s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.1)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212, 248, 122, 0.4)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.05)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          RELOAD WEBSITE
        </button>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 5: Polaroid Card Strip (Scroll + Hover states)
          ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute z-[11] bottom-[6vh] left-[clamp(20px,4vw,60px)] right-[clamp(20px,4vw,60px)] flex gap-4 overflow-x-auto pb-4 pr-2 lg:overflow-visible"
        style={{ x: polaroidsX, willChange: 'transform' }}
      >
        {polaroids.map((item, i) => (
          <PolaroidCard key={i} item={item} isMobile={isMobile} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
