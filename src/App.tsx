import { useEffect, useState } from 'react';
import { useLenis } from './hooks/useLenis';
import CustomCursor from './sections/CustomCursor';
import Header from './sections/Header';
import Hero from './sections/Hero';
import FeaturedProjects from './sections/FeaturedProjects';
import About from './sections/About';
import HowIBuild from './sections/HowIBuild';
import TechnicalExpertise from './sections/TechnicalExpertise';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  useLenis();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);

    if (document.readyState === 'complete') {
      handleLoad();
      return;
    }

    window.addEventListener('load', handleLoad);
    const timer = window.setTimeout(handleLoad, 2200);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className="loading-screen" aria-live="polite" role="status">
          <div className="loading-card">
            <p className="loading-eyebrow">Portfolio experience</p>
            <h1 className="loading-title">Please wait a moment while my portfolio loads.</h1>
            <p className="loading-copy">
              The experience is worth the pause — and I’m glad you stayed.
            </p>
            <div className="loading-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      )}
      <CustomCursor />
      <Header />
      <main>
        {/* ACT 1: WHO IS PRASOON? */}
        <Hero />
        
        {/* ACT 2: WHAT HAS HE BUILT? */}
        <FeaturedProjects />
        
        {/* ACT 3: WHAT EXPERIENCES SHAPED HIM? */}
        <About />
        
        {/* ACT 4: HOW DOES HE THINK? */}
        <HowIBuild />
        <TechnicalExpertise />
        
        {/* ACT 5: WHY SHOULD WE HIRE HIM? */}
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
