import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 1024;
    if (prefersReducedMotion || isTouchDevice || isSmallScreen) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true, // using smoothWheel as it maps to smooth: true in current Lenis versions
      orientation: 'vertical',
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    // This ensures all ScrollTrigger-based animations work correctly
    lenis.on('scroll', ScrollTrigger.update);

    // Also ensures Framer Motion useScroll works seamlessly with Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
