import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { experience } from '../data/portfolioData';
import { SectionTitle } from './About';

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  return (
    <section id="experience" className="relative py-24">
      <div className="section-container">
        <SectionTitle>
          {'💼 Experience'}
          {'Experience & Training'}
          {'Hands-on experience and virtual simulations'}
        </SectionTitle>

        <div className="max-w-3xl mx-auto space-y-6">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              ref={ref}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card-hover p-6 relative overflow-hidden"
            >
              {/* Gradient accent line */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ background: `linear-gradient(180deg, ${exp.color}, #A855F7)` }}
                aria-hidden="true"
              />

              <div className="flex flex-wrap items-start justify-between gap-4 pl-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={{
                        background: 'rgba(16,185,129,0.1)',
                        border: '1px solid rgba(16,185,129,0.3)',
                        color: '#34d399',
                      }}
                    >
                      {exp.badge}
                    </span>
                    <span className="text-purple-lavender/50 text-sm">{exp.platform}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mt-2">{exp.company}</h3>
                  <p className="text-purple-neon font-semibold text-sm mt-0.5">{exp.role}</p>
                  <p className="text-purple-lavender/50 text-sm mt-0.5">{exp.period} · {exp.type}</p>

                  <p className="text-purple-lavender/70 text-sm leading-relaxed mt-3">
                    {exp.description}
                  </p>

                  {/* Task tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.tasks.map((task) => (
                      <span key={task} className="skill-chip text-xs">{task}</span>
                    ))}
                  </div>
                </div>

                {/* Company badge */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${exp.color}33, ${exp.color}1a)`, border: `1px solid ${exp.color}44` }}
                  aria-hidden="true"
                >
                  🛒
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
