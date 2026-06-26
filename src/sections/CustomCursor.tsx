import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Respect prefers-reduced-motion — hide custom cursor
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      cursor.style.display = 'none';
      return;
    }

    // Only show custom cursor on non-touch desktop devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;
    if (isTouchDevice || isSmallScreen) {
      cursor.style.display = 'none';
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const handleMouseEnterInteractive = () => {
      isHoveringRef.current = true;
    };

    const handleMouseLeaveInteractive = () => {
      isHoveringRef.current = false;
    };

    // Attach listeners to interactive elements
    const attachInteractiveListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, .glass-card, .polaroid-card');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      return interactives;
    };

    // Initial attachment + mutation observer for dynamic content
    let interactives = attachInteractiveListeners();
    const observer = new MutationObserver(() => {
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      interactives = attachInteractiveListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop with lerp
    let rafId: number;
    const animate = () => {
      const lerp = 0.15;
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;

      if (cursor) {
        cursor.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;

        if (isHoveringRef.current) {
          cursor.style.width = '32px';
          cursor.style.height = '32px';
          cursor.style.backgroundColor = 'transparent';
          cursor.style.border = '1px solid #D4F87A';
        } else {
          cursor.style.width = '8px';
          cursor.style.height = '8px';
          cursor.style.backgroundColor = '#D4F87A';
          cursor.style.border = 'none';
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      document.body.classList.remove('has-custom-cursor');
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none rounded-full z-[9999] hidden lg:block"
      style={{
        width: '8px',
        height: '8px',
        backgroundColor: '#D4F87A',
        mixBlendMode: 'difference',
        transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border 0.2s ease',
      }}
    />
  );
}
