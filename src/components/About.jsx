import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { aboutMe } from '../data/portfolioData';

function AnimatedCounter({ value, suffix = '', prefix = '', decimals = 0, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const stepTime = Math.abs(Math.floor(duration / (end * 100)));
    const steps = Math.ceil(end / (decimals > 0 ? 0.01 : 1));
    const increment = end / steps;
    const timer = setInterval(() => {
      start = Math.min(start + increment, end);
      setCount(parseFloat(start.toFixed(decimals)));
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, value, decimals, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
}

function SectionTitle({ children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-14"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-widest"
        style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(196,181,253,0.2)', color: '#C4B5FD' }}>
        {children[0]}
      </div>
      <h2 className="section-heading gradient-text">{children[1]}</h2>
      {children[2] && <p className="text-purple-lavender/60 max-w-xl mx-auto">{children[2]}</p>}
    </motion.div>
  );
}

export { SectionTitle };

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background accent */}
      <div
        className="blob"
        style={{ width: 400, height: 400, background: '#6D28D9', top: '20%', right: '-10%', opacity: 0.15 }}
        aria-hidden="true"
      />

      <div className="section-container">
        <SectionTitle>
          {'👨‍💻 About Me'}
          {'About Me'}
          {''}
        </SectionTitle>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
        >
          {/* Bio text */}
          <motion.div variants={item} className="lg:col-span-3 glass-card p-8">
            <h3 className="text-xl font-bold text-purple-light mb-4">
              B.E. Information Technology Graduate
            </h3>
            <p className="text-purple-lavender/80 leading-relaxed text-base">
              {aboutMe.bio}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {['Full-Stack Development', 'Clean Code', 'Problem Solving', 'Open to Work'].map((tag) => (
                <span key={tag} className="skill-chip text-xs">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Stat cards */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-4">
            {aboutMe.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={item}
                className="glass-card-hover p-6 flex items-center gap-5"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(168,85,247,0.2))' }}
                  aria-hidden="true"
                >
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-black gradient-text-bright">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix || ''}
                      decimals={stat.decimals}
                      duration={2000 + i * 300}
                    />
                  </div>
                  <div className="text-purple-lavender/70 text-sm font-medium mt-0.5">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
