import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { navLinks, personalInfo } from '../data/portfolioData';
import { motion } from 'framer-motion';

export default function Footer() {
  const handleNav = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      className="relative border-t pt-14 pb-8"
      style={{ borderColor: 'rgba(196,181,253,0.1)' }}
      role="contentinfo"
    >
      {/* Gradient fade top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)' }}
        aria-hidden="true"
      />

      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Logo / Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                aria-label="Rohan Cherkar initials"
              >
                RC
              </div>
              <span className="font-bold text-white text-lg">Rohan Cherkar</span>
            </div>
            <p className="text-purple-lavender/50 text-sm leading-relaxed max-w-xs">
              MERN Stack Developer from Mumbai, India. Building modern web experiences with clean, scalable code.
            </p>
            <div className="flex items-center gap-4 mt-5">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-lavender/50 hover:text-purple-neon transition-all duration-200 hover:scale-110"
                aria-label="Rohan's GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-lavender/50 hover:text-purple-neon transition-all duration-200 hover:scale-110"
                aria-label="Rohan's LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-purple-lavender/50 hover:text-purple-neon transition-all duration-200 hover:scale-110"
                aria-label="Email Rohan"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-purple-lavender/70 text-xs font-semibold uppercase tracking-widest mb-4">
              Quick Navigation
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                  className="text-purple-lavender/60 hover:text-purple-neon text-sm transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-purple-lavender/70 text-xs font-semibold uppercase tracking-widest mb-4">
              Get In Touch
            </h3>
            <div className="space-y-2.5">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-purple-lavender/60 hover:text-purple-neon text-sm transition-colors"
              >
                <FaEnvelope size={12} aria-hidden="true" /> {personalInfo.email}
              </a>
              <div className="text-purple-lavender/60 text-sm">📍 {personalInfo.location}</div>
              <div className="availability-badge mt-4 text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Open to Work
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(196,181,253,0.08)' }}
        >
          <p className="text-purple-lavender/40 text-sm text-center">
            © 2026 Rohan Cherkar. All rights reserved. Built with React + Vite + Tailwind.
          </p>
          <p className="text-purple-lavender/30 text-xs">
            Designed & Developed with ❤️ in Mumbai, India
          </p>
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white z-40 shadow-glow"
        style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
        whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(168,85,247,0.6)' }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-label="Back to top"
      >
        <FaArrowUp size={16} aria-hidden="true" />
      </motion.button>
    </footer>
  );
}
