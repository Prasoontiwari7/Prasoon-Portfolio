import { useEffect, useRef, useState } from 'react';

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  autoPlayWhenVisible?: boolean;
  /** Root margin for IntersectionObserver — how far before the viewport to start loading */
  rootMargin?: string;
  onReady?: () => void;
}

/**
 * LazyVideo — loads videos only when they scroll into view.
 *
 * Key optimisations:
 *  1. Native browser loading when visible.
 *  2. On mobile screens (width < 768px), renders a poster image instead of video to save bandwidth.
 *  3. Uses IntersectionObserver to trigger loading when near viewport.
 *  4. Removes blocking custom loading states; relies on the browser's native poster display until the first frame is ready.
 */
export default function LazyVideo({
  src,
  poster,
  className = '',
  style,
  muted = true,
  loop = true,
  playsInline = true,
  autoPlayWhenVisible = true,
  rootMargin = '200px 0px',
  onReady,
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // IntersectionObserver — fires once, then disconnects
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  // Mobile: render a poster image (or gradient fallback) — no video at all
  if (isMobile) {
    return (
      <div ref={containerRef} className={className} style={style}>
        {poster ? (
          <img
            src={poster}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(135deg, rgba(212,248,122,0.15) 0%, rgba(10,10,10,0.9) 100%)',
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`} style={style}>
      {/* Video element — rendered with src only when visible */}
      {isVisible && !hasError ? (
        <video
          src={src}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          preload="auto"
          autoPlay={autoPlayWhenVisible}
          className="w-full h-full object-cover"
          poster={poster}
          onCanPlay={() => onReady?.()}
          onError={() => setHasError(true)}
        />
      ) : (
        /* Poster shown before visibility triggers (or if there's an error) */
        <div className="w-full h-full absolute inset-0 z-[-1]">
          {poster ? (
            <img src={poster} alt="" className="w-full h-full object-cover" loading="lazy" />
          ) : (
             <div
               className="w-full h-full"
               style={{
                 background: 'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 100%)',
               }}
             />
          )}
        </div>
      )}

      {/* Error fallback overlay */}
      {hasError && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(212,248,122,0.1) 0%, rgba(10,10,10,0.95) 100%)',
          }}
        >
          <p className="text-white/40 text-xs uppercase tracking-widest">Preview unavailable</p>
        </div>
      )}
    </div>
  );
}
