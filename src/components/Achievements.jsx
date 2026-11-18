import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { achievements } from '../data/portfolioData';
import { SectionTitle } from './About';

const typeColors = {
  achievement: { bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.3)', text: '#fbbf24', label: 'Achievement' },
  certification: { bg: 'rgba(124,58,237,0.15)', border: 'rgba(196,181,253,0.25)', text: '#C4B5FD', label: 'Certification' },
  simulation: { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', text: '#34d399', label: 'Simulation' },
  hackathon: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', text: '#f87171', label: 'Hackathon' },
};

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="achievements" className="relative py-24">
      <div className="section-container">
        <SectionTitle>
          {'🏆 Achievements'}
          {'Achievements & Certifications'}
          {'Recognition and continuous learning'}
        </SectionTitle>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {achievements.map((ach) => {
            const color = typeColors[ach.type] || typeColors.certification;
            return (
              <motion.div
                key={ach.id}
                variants={item}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card p-5 flex flex-col gap-3 cursor-default group transition-all duration-300"
                style={{
                  borderColor: 'rgba(196,181,253,0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = color.border;
                  e.currentTarget.style.boxShadow = `0 8px 30px ${color.bg.replace('0.1)', '0.2)')}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(196,181,253,0.15)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 self-start"
                  style={{ background: color.bg, border: `1px solid ${color.border}` }}
                  aria-hidden="true"
                >
                  {ach.icon}
                </div>

                {/* Type badge */}
                <span
                  className="self-start px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{ background: color.bg, border: `1px solid ${color.border}`, color: color.text }}
                >
                  {color.label}
                </span>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-bold text-white text-sm leading-snug">{ach.title}</h3>
                  <p className="text-purple-lavender/60 text-xs mt-1">{ach.issuer}</p>
                  <p className="text-purple-lavender/40 text-xs mt-0.5">{ach.year}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
