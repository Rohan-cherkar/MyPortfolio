import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';

const TYPED_TITLES = personalInfo.title;

function TypingEffect() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkTimer = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(blinkTimer);
  }, []);

  useEffect(() => {
    const current = TYPED_TITLES[index];
    if (!deleting && subIndex === current.length) {
      const pause = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(pause);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % TYPED_TITLES.length);
      return;
    }
    const speed = deleting ? 60 : 90;
    const timer = setTimeout(() => {
      setSubIndex((s) => s + (deleting ? -1 : 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [subIndex, index, deleting]);

  return (
    <span className="gradient-text-bright font-bold">
      {TYPED_TITLES[index].substring(0, subIndex)}
      <span style={{ opacity: blink ? 1 : 0 }} className="text-purple-neon ml-0.5">|</span>
    </span>
  );
}

function FloatingBadge({ label, delay, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 20 }}
      style={style}
      className="absolute px-3 py-1.5 rounded-full text-xs font-semibold glass-card border-purple-lavender/30 text-purple-light whitespace-nowrap"
    >
      {label}
    </motion.div>
  );
}

function PulsingDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const handleNav = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const offset = 72;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
      aria-label="Hero section"
    >
      {/* Background blobs */}
      <div
        className="blob animate-blob"
        style={{ width: 500, height: 500, background: '#7C3AED', top: '10%', left: '-5%' }}
        aria-hidden="true"
      />
      <div
        className="blob animate-blob2"
        style={{ width: 400, height: 400, background: '#A855F7', top: '40%', right: '-5%', animationDelay: '-5s' }}
        aria-hidden="true"
      />
      <div
        className="blob animate-blob3"
        style={{ width: 300, height: 300, background: '#4C1D95', bottom: '10%', left: '30%', animationDelay: '-10s' }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={controls}
            className="flex flex-col gap-5 order-2 lg:order-1"
          >
            {/* Availability badge */}
            <motion.div variants={item}>
              <span className="availability-badge">
                <PulsingDot />
                {personalInfo.availability}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight"
            >
              Hi, I'm{' '}
              <span className="gradient-text text-shadow-glow">
                {personalInfo.name.split(' ')[0]}
              </span>
              <br />
              <span className="gradient-text">{personalInfo.name.split(' ')[1]}</span>
            </motion.h1>

            {/* Typing effect */}
            <motion.div variants={item} className="text-xl sm:text-2xl font-semibold text-purple-lavender/80 h-8">
              <TypingEffect />
            </motion.div>

            {/* Headline */}
            <motion.p
              variants={item}
              className="text-2xl sm:text-3xl font-bold text-white/90 leading-snug max-w-xl"
            >
              {personalInfo.headline}
            </motion.p>

            {/* Intro */}
            <motion.p
              variants={item}
              className="text-purple-lavender/70 leading-relaxed max-w-lg"
            >
              {personalInfo.shortIntro}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => handleNav('#projects')}
                className="btn-primary text-base"
              >
                View Projects <span aria-hidden="true">→</span>
              </button>
              <a
                href={personalInfo.resumeUrl}
                download
                className="btn-secondary text-base"
                aria-label="Download Rohan's Resume"
              >
                Download Resume <HiArrowDown aria-hidden="true" />
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div variants={item} className="flex items-center gap-4 pt-1">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-lavender/60 hover:text-purple-neon transition-all duration-300 hover:scale-110"
                aria-label="Rohan's GitHub profile"
              >
                <FaGithub size={24} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-lavender/60 hover:text-purple-neon transition-all duration-300 hover:scale-110"
                aria-label="Rohan's LinkedIn profile"
              >
                <FaLinkedin size={24} />
              </a>
              <div className="h-5 w-px bg-purple-lavender/20" />
              <span className="text-purple-lavender/50 text-sm">{personalInfo.location}</span>
            </motion.div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex justify-center items-center order-1 lg:order-2 relative"
          >
            <div className="relative">
              {/* Rotating gradient ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-12px] rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #7C3AED, #A855F7, #C4B5FD, #7C3AED)',
                  opacity: 0.6,
                  filter: 'blur(2px)',
                }}
                aria-hidden="true"
              />

              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
                  transform: 'scale(1.3)',
                  filter: 'blur(20px)',
                }}
                aria-hidden="true"
              />

              {/* Photo container */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden z-10"
                style={{
                  border: '3px solid transparent',
                  background: 'linear-gradient(#0D0520, #0D0520) padding-box, linear-gradient(135deg, #A855F7, #6D28D9) border-box',
                  boxShadow: '0 0 40px rgba(168,85,247,0.4)',
                }}
              >
                {/* 
                  PHOTO: Place your photo at /public/images/rohan.jpg
                  It will appear here automatically.
                */}
                {!imgError ? (
                  <img
                    src={personalInfo.photo}
                    alt="Rohan Cherkar, MERN Stack Developer"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    fetchPriority="high"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  /* Initials placeholder — shown when photo file is missing */
                  <div
                    className="w-full h-full flex flex-col items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #2D0F5E, #4C1D95)' }}
                    role="img"
                    aria-label="RC initials placeholder — add photo at /public/images/rohan.jpg"
                  >
                    <span className="text-7xl font-black gradient-text">RC</span>
                    <span className="text-purple-lavender/50 text-xs mt-2 text-center px-4">
                      {/* Add your photo at /public/images/rohan.jpg */}
                      Add photo: /public/images/rohan.jpg
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Floating tech badges */}
              <FloatingBadge label="⚛️ React" delay={1.0} style={{ top: '5%', right: '-10%' }} />
              <FloatingBadge label="🟢 Node.js" delay={1.2} style={{ bottom: '15%', right: '-15%' }} />
              <FloatingBadge label="🍃 MongoDB" delay={1.4} style={{ bottom: '5%', left: '-10%' }} />
              <FloatingBadge label="⚡ Vite" delay={1.6} style={{ top: '15%', left: '-12%' }} />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 inset-x-0 mx-auto w-fit flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-purple-lavender/40 text-xs">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-purple-lavender/30 flex justify-center pt-1"
          >
            <div className="w-1 h-2 bg-purple-neon/60 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
