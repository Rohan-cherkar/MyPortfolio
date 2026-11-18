import { useEffect, useRef } from 'react';

export function useScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progressRef;
}

export function useActiveSection(sectionIds) {
  const activeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeRef.current = entry.target.id;
            // Dispatch custom event for navbar
            window.dispatchEvent(new CustomEvent('sectionChange', { detail: entry.target.id }));
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeRef;
}
