import { useEffect, useRef } from 'react';
import { useScrollProgress, useActiveSection } from './hooks/useScrollProgress';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Achievements from './components/Achievements';
import GitHub from './components/GitHub';
import Contact from './components/Contact';
import Footer from './components/Footer';

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'achievements', 'github', 'contact'];

export default function App() {
  const progressRef = useScrollProgress();
  useActiveSection(SECTIONS);

  // Lenis smooth scroll (if available)
  useEffect(() => {
    let lenis;
    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis');
        lenis = new Lenis({ lerp: 0.08, duration: 1.2 });
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
      } catch {
        // Lenis not critical — native smooth scroll is set in CSS
      }
    };
    initLenis();
    return () => { if (lenis) lenis.destroy(); };
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: '#0D0520' }}>
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="scroll-progress-bar"
        style={{ width: '0%' }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Global background mesh */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 15% 50%, rgba(76,29,149,0.4) 0%, transparent 60%), radial-gradient(ellipse at 85% 20%, rgba(109,40,217,0.3) 0%, transparent 60%), #0D0520',
        }}
        aria-hidden="true"
      />

      {/* Mesh grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(196,181,253,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,181,253,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Achievements />
          <GitHub />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
