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

  return (
    <>
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
