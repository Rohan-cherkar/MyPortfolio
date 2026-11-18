import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { education } from '../data/portfolioData';
import { SectionTitle } from './About';

function TimelineItem({ edu, index, total }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col items-start md:items-center gap-6 md:gap-0`}>
      {/* Card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`md:w-[46%] glass-card-hover p-6 ${isLeft ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'}`}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${edu.color}44, ${edu.color}22)` }}
            aria-hidden="true"
          >
            {edu.icon}
          </div>
          <div>
            <div className="text-purple-lavender/50 text-xs font-semibold uppercase tracking-wider mb-1">
              {edu.period}
            </div>
            <h3 className="font-bold text-white text-base">{edu.degree}</h3>
            <p className="text-purple-neon text-sm font-medium mt-0.5">{edu.institution}</p>
            <p className="text-purple-lavender/50 text-xs mt-0.5">{edu.location}</p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: `${edu.color}22`, border: `1px solid ${edu.color}44`, color: '#DDD6FE' }}
              >
                {edu.grade}
              </span>
              {edu.highlight && (
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}
                >
                  🏆 {edu.highlight}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Center dot — desktop */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-5 h-5 items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
          className="timeline-dot"
        />
      </div>

      {/* Mobile dot */}
      <div className="md:hidden flex items-center gap-3">
        <div className="timeline-dot" />
        {index < total - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-0.5 h-12 origin-top"
            style={{ background: 'linear-gradient(180deg, #7C3AED, #A855F7)' }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="relative py-24">
      <div
        className="blob"
        style={{ width: 350, height: 350, background: '#A855F7', top: '10%', right: '-5%', opacity: 0.12 }}
        aria-hidden="true"
      />

      <div className="section-container">
        <SectionTitle>
          {'🎓 Education'}
          {'Education'}
          {'My academic background and achievements'}
        </SectionTitle>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line — desktop */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5"
            style={{ background: 'linear-gradient(180deg, #7C3AED, #A855F7, transparent)' }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-10">
            {education.map((edu, i) => (
              <TimelineItem key={edu.id} edu={edu} index={i} total={education.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
