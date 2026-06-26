import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const workflowSteps = [
  { step: '01', title: 'Problem', desc: 'Defining the core challenge and requirements' },
  { step: '02', title: 'Research', desc: 'Analyzing existing solutions and technical feasibility' },
  { step: '03', title: 'AI Prototyping', desc: 'Cursor • Claude • Kimi for rapid exploration' },
  { step: '04', title: 'Development', desc: 'Writing clean, scalable, and modular code' },
  { step: '05', title: 'Testing', desc: 'Ensuring reliability and performance' },
  { step: '06', title: 'Deployment', desc: 'Shipping to production seamlessly' },
];

function WorkflowNode({ item, index }: { item: typeof workflowSteps[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      {/* Connecting Line (except last item) */}
      {index !== workflowSteps.length - 1 && (
        <div className="hidden lg:block absolute top-[40px] left-[50%] w-full h-[1px] bg-white/10" />
      )}
      {index !== workflowSteps.length - 1 && (
        <div className="lg:hidden absolute top-[100%] left-[50%] w-[1px] h-full bg-white/10 -translate-x-1/2" />
      )}

      {/* Node */}
      <div className="w-[80px] h-[80px] rounded-full border border-white/20 flex justify-center items-center bg-[#0A0A0A] z-10 mb-6 transition-all duration-300 group-hover:border-[#D4F87A] group-hover:bg-[#D4F87A]/10">
        <span className="text-[#FAFAFA] font-light text-xl group-hover:text-[#D4F87A] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
          {item.step}
        </span>
      </div>

      <h3 className="text-[#FAFAFA] text-lg uppercase tracking-wider mb-2 text-center" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
        {item.title}
      </h3>
      <p className="text-[#888888] text-sm text-center max-w-[150px]" style={{ fontFamily: 'var(--font-body)' }}>
        {item.desc}
      </p>
    </motion.div>
  );
}

export default function HowIBuild() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { amount: 0.8, once: true });

  return (
    <section
      ref={sectionRef}
      id="how-i-build"
      className="relative bg-[#0A0A0A]"
      style={{ padding: '120px clamp(20px, 4vw, 60px)' }}
    >
      {/* Section Heading */}
      <div
        ref={headingRef}
        className="flex items-center gap-6 mb-24"
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
          HOW I BUILD
        </h2>
        <motion.div
          className="hairline-right flex-1 h-px"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)', originX: 0 }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-4 max-w-[1400px] mx-auto">
        {workflowSteps.map((item, i) => (
          <WorkflowNode key={item.step} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
