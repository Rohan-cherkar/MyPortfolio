import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { navLinks } from '../data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });

    const onSection = (e) => setActiveSection(e.detail);
    window.addEventListener('sectionChange', onSection);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('sectionChange', onSection);
    };
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Centered Navbar Header */}
      <header className="fixed top-3 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`pointer-events-auto w-full max-w-6xl rounded-2xl transition-all duration-300 ${
            scrolled
              ? 'bg-[#0D0520]/85 backdrop-blur-xl border border-purple-lavender/25 shadow-[0_4px_30px_rgba(124,58,237,0.25)]'
              : 'bg-[#0D0520]/50 backdrop-blur-md border border-purple-lavender/15 shadow-[0_2px_15px_rgba(124,58,237,0.1)]'
          }`}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => { e.preventDefault(); handleNav('#hero'); }}
              className="flex items-center gap-2 group flex-shrink-0"
              aria-label="Rohan Cherkar - home"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-bold text-white text-xs sm:text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
              >
                RC
              </div>
              <span className="hidden sm:block font-semibold gradient-text text-sm whitespace-nowrap">
                Rohan Cherkar
              </span>
            </motion.a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                  className={`nav-link text-xs xl:text-sm px-1.5 py-1 ${
                    activeSection === link.href.replace('#', '') ? 'active font-semibold text-purple-light' : ''
                  }`}
                  aria-current={activeSection === link.href.replace('#', '') ? 'page' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Action Buttons & Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <a
                href="/resume.pdf"
                download
                className="hidden sm:inline-flex btn-primary text-xs xl:text-sm py-1.5 px-3.5 xl:py-2 xl:px-4"
                aria-label="Download Resume"
              >
                Resume ↓
              </a>
              <button
                className="lg:hidden p-2 rounded-lg text-purple-lavender hover:text-purple-light hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-neon"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed top-20 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="pointer-events-auto w-full max-w-md rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(13,5,32,0.96)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(196,181,253,0.2)',
                boxShadow: '0 20px 60px rgba(124,58,237,0.35)',
              }}
            >
              <div className="flex flex-col py-3">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    className={`px-6 py-2.5 text-sm font-medium transition-colors hover:bg-white/5 ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-purple-neon font-semibold bg-white/[0.04]'
                        : 'text-purple-lavender/70'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="px-6 pt-3 pb-3 border-t border-white/5 mt-1 sm:hidden">
                  <a href="/resume.pdf" download className="btn-primary w-full justify-center text-sm py-2">
                    Download Resume ↓
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
