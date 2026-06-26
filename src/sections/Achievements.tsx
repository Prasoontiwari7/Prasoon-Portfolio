import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '200+', label: 'LeetCode Problems' },
  { value: '6', suffix: ' Months', label: 'Industry Experience' },
  { value: '3+', label: 'Internships' },
  { value: 'Multiple', label: 'Leadership Roles' },
];

function StatCard({ stat, index }: { stat: typeof stats[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center p-8 border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-md"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
    >
      <h3 className="text-[#D4F87A] text-5xl md:text-7xl mb-2" style={{ fontFamily: 'var(--font-display)', lineHeight: 1 }}>
        {stat.value}
        {stat.suffix && <span className="text-3xl md:text-4xl text-[#FAFAFA]">{stat.suffix}</span>}
      </h3>
      <p className="text-[#FAFAFA] text-sm md:text-base uppercase tracking-widest text-center" style={{ fontFamily: 'var(--font-body)' }}>
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative bg-[#0A0A0A]"
      style={{ padding: '120px clamp(20px, 4vw, 60px)' }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}
