import { useEffect, useRef, useState } from 'react';

// Touch device detection
const isTouch = () =>
  typeof window !== 'undefined' &&
  (navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches);

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    if (isTouch()) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      if (!visible) setVisible(true);
    };

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.15);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.15);
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    // Hovered state on interactive elements
    const addHover = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select')) {
        ringRef.current?.classList.add('hovered');
      }
    };
    const removeHover = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select')) {
        ringRef.current?.classList.remove('hovered');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', addHover);
    document.addEventListener('mouseout', removeHover);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', addHover);
      document.removeEventListener('mouseout', removeHover);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [visible]);

  if (isTouch()) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor cursor-dot"
        style={{ opacity: visible ? 1 : 0 }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="custom-cursor cursor-ring"
        style={{ opacity: visible ? 1 : 0 }}
        aria-hidden="true"
      />
    </>
  );
}
