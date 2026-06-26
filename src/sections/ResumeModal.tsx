import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Github, Linkedin, Mail, Phone } from 'lucide-react';
import {
  CONTACT_EMAIL,
  CONTACT_LOCATION,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  PROFILE_LINKS,
} from '../lib/profile';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Blurred backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide" data-lenis-prevent="true">
              {/* Picture & Header */}
              <div className="relative w-full bg-[#111111] border-b border-white/10 p-8 md:p-12 flex flex-col md:flex-row items-center md:items-end gap-8">
                {/* Portrait Image */}
                <div className="shrink-0">
                  <img
                    src="/images/prasoon-profile.jpg"
                    alt="Prasoon Tiwari"
                    className="w-40 md:w-52 h-auto rounded-xl border-4 border-[#0A0A0A] shadow-2xl object-cover"
                    onError={(e) => {
                      // Fallback if image not found yet
                      (e.target as HTMLImageElement).src = '/images/hero-mountains.jpg';
                    }}
                  />
                </div>
                {/* Title & Role */}
                <div className="text-center md:text-left pb-2">
                  <h1 className="text-4xl md:text-6xl text-[#FAFAFA] mb-2" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.02em' }}>
                    PRASOON TIWARI
                  </h1>
                  <p className="text-[#D4F87A] text-sm tracking-widest uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                    Software Engineer | Data Scientist | AI Builder
                  </p>
                </div>
              </div>

              {/* Resume Body */}
              <div className="p-8 md:p-12 pt-8 text-[#FAFAFA]/80 space-y-12" style={{ fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
                
                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 text-sm text-[#888888]">
                  <span>{CONTACT_LOCATION}</span>
                  <span>|</span>
                  <a href={CONTACT_PHONE_HREF} className="inline-flex items-center gap-1.5 hover:text-[#D4F87A] transition-colors">
                    <Phone className="h-3.5 w-3.5" />
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                  <span>|</span>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-1.5 hover:text-[#D4F87A] transition-colors">
                    <Mail className="h-3.5 w-3.5" />
                    {CONTACT_EMAIL}
                  </a>
                  <span>|</span>
                  <a href={PROFILE_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#D4F87A] transition-colors">
                    <Linkedin className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                  <span>|</span>
                  <a href={PROFILE_LINKS.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#D4F87A] transition-colors">
                    <Github className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                  <span>|</span>
                  <a href={PROFILE_LINKS.leetcode} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#D4F87A] transition-colors">
                    <Code2 className="h-3.5 w-3.5" />
                    LeetCode
                  </a>
                </div>

                <hr className="border-white/10" />

                {/* Professional Summary */}
                <section>
                  <h2 className="text-xl text-[#FAFAFA] tracking-widest uppercase mb-4 font-semibold">Professional Summary</h2>
                  <p>
                    Computer Science undergraduate with hands-on experience in Data Science, Software Development, and AI-assisted engineering. Worked as a Data Scientist at Shyara Tech Solutions Pvt. Ltd. and completed internships in Data Analytics, Marketing, and Web Development. Skilled in building responsive web applications, Android applications, and data-driven solutions. Strong problem-solving abilities demonstrated through 200+ LeetCode problems solved and active involvement in technical projects, leadership roles, and innovation-driven initiatives.
                  </p>
                </section>

                <hr className="border-white/10" />

                {/* Education */}
                <section>
                  <h2 className="text-xl text-[#FAFAFA] tracking-widest uppercase mb-6 font-semibold">Education</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg text-[#D4F87A] font-medium">B.Tech - Computer Science Engineering</h3>
                      <p className="text-white/60">Jaypee University of Engineering and Technology (JUET) | Expected Graduation: 2027</p>
                    </div>
                    <div>
                      <h3 className="text-lg text-[#FAFAFA] font-medium">Class XII (CBSE)</h3>
                      <p className="text-white/60">The Aryans School, Jhansi</p>
                    </div>
                    <div>
                      <h3 className="text-lg text-[#FAFAFA] font-medium">Class X (ICSE)</h3>
                      <p className="text-white/60">Rani Laxmi Bai Public School, Jhansi</p>
                    </div>
                  </div>
                </section>

                <hr className="border-white/10" />

                {/* Experience */}
                <section>
                  <h2 className="text-xl text-[#FAFAFA] tracking-widest uppercase mb-6 font-semibold">Experience</h2>
                  <div className="space-y-8">
                    <div>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                        <h3 className="text-lg text-[#D4F87A] font-medium">Data Scientist Intern (6 Months - Most Impactful)</h3>
                        <span className="text-white/50 text-sm">Shyara Tech Solutions Pvt. Ltd.</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-white/80">
                        <li>Spearheaded comprehensive data analysis and preprocessing workflows for multiple business datasets.</li>
                        <li>Built predictive models and AI-driven automation tools to drive data-backed decision-making.</li>
                        <li>Engineered ETL pipelines and data visualizations using Python, SQL, and advanced analytics.</li>
                        <li>Collaborated with cross-functional teams to implement machine learning solutions for business optimization.</li>
                        <li>Significantly contributed to workflow automation, reducing manual processes and improving efficiency by 40%.</li>
                        <li>Mentored junior team members and developed best practices for data handling and model evaluation.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                        <h3 className="text-lg text-[#FAFAFA] font-medium">Marketing Intern</h3>
                        <span className="text-white/50 text-sm">SkipperX (1 Month)</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-white/80">
                        <li>Conducted market research and competitor analysis.</li>
                        <li>Assisted in campaign planning and customer engagement initiatives.</li>
                        <li>Supported business growth through data-backed marketing insights.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg text-[#FAFAFA] font-medium mb-2">Deloitte Australia Data Analytics Job Simulation - Forage</h3>
                      <ul className="list-disc pl-5 space-y-1 text-white/80">
                        <li>Completed a Deloitte job simulation involving data analysis and forensic technology.</li>
                        <li>Created a data dashboard using Tableau.</li>
                        <li>Used Excel to classify data and draw business conclusions.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg text-[#FAFAFA] font-medium mb-2">Web Development Virtual Internship</h3>
                      <ul className="list-disc pl-5 space-y-1 text-white/80">
                        <li>Built responsive user interfaces using modern web technologies.</li>
                        <li>Applied frontend development best practices to improve usability and performance.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <hr className="border-white/10" />

                {/* Technical Skills */}
                <section>
                  <h2 className="text-xl text-[#FAFAFA] tracking-widest uppercase mb-6 font-semibold">Technical Skills</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-[#D4F87A] mb-1">Programming Languages</h3>
                      <p>Python, C++, C, Kotlin, Java (Basic)</p>
                    </div>
                    <div>
                      <h3 className="text-[#D4F87A] mb-1">Web Development</h3>
                      <p>HTML5, CSS3, React.js, Responsive Web Design</p>
                    </div>
                    <div>
                      <h3 className="text-[#D4F87A] mb-1">Data Science</h3>
                      <p>Data Analysis, Data Cleaning, EDA, Data Visualization</p>
                    </div>
                    <div>
                      <h3 className="text-[#D4F87A] mb-1">AI & Modern Development</h3>
                      <p>Prompt Engineering, AI-Assisted Development, Claude, Cursor, Kimi</p>
                    </div>
                    <div>
                      <h3 className="text-[#D4F87A] mb-1">Tools</h3>
                      <p>GitHub, Android Studio, Visual Studio Code, Supabase</p>
                    </div>
                    <div>
                      <h3 className="text-[#D4F87A] mb-1">Core Concepts</h3>
                      <p>Data Structures & Algorithms, Object-Oriented Programming, Problem Solving</p>
                    </div>
                  </div>
                </section>

                <hr className="border-white/10" />

                {/* Projects */}
                <section>
                  <h2 className="text-xl text-[#FAFAFA] tracking-widest uppercase mb-6 font-semibold">Projects</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg text-[#FAFAFA] font-medium">Financial Dashboard | AI-Powered Personal Finance Platform</h3>
                      <p className="text-[#D4F87A] text-sm mb-2">Tech Stack: React, Node.js, Python, Tailwind, WhatsApp API</p>
                      <ul className="list-disc pl-5 space-y-1 text-white/80">
                        <li>Built an end-to-end financial dashboard for personal expense monitoring and tracking.</li>
                        <li>Integrated WhatsApp-based interactions for real-time expense updates and intelligent reminders.</li>
                        <li>Implemented AI classification models to categorize transactions and surface actionable financial insights.</li>
                        <li>Designed a polished full-stack experience with real-time analytics and mobile-responsive UI.</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg text-[#FAFAFA] font-medium">Video Rendering Engine | FFmpeg-Based Media Processing</h3>
                      <p className="text-[#D4F87A] text-sm mb-2">Tech Stack: FFmpeg, Python, React, FastAPI</p>
                      <ul className="list-disc pl-5 space-y-1 text-white/80">
                        <li>Engineered a high-performance video processing platform built on FFmpeg for rendering and transcoding.</li>
                        <li>Implemented scalable backend pipelines for handling large video assets and batch processing workflows.</li>
                        <li>Designed an intuitive dashboard for job submission, progress tracking, and media management.</li>
                        <li>Focused on reliability, performance optimization, and seamless developer experience.</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg text-[#FAFAFA] font-medium">GoSecure | Smart Tourist Safety Monitoring System</h3>
                      <p className="text-[#D4F87A] text-sm mb-2">Tech Stack: React.js, Node.js, AWS, GIS, Location APIs</p>
                      <ul className="list-disc pl-5 space-y-1 text-white/80">
                        <li>Developed a comprehensive safety platform for tourists traveling to unfamiliar destinations.</li>
                        <li>Implemented real-time location monitoring and emergency notification systems with SOS capabilities.</li>
                        <li>Built a mobile-friendly dashboard with route awareness, safety alerts, and incident tracking.</li>
                        <li>Focused on responsive design, accessibility, and real-time traveler safety features.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <hr className="border-white/10" />

                {/* Achievements */}
                <section>
                  <h2 className="text-xl text-[#FAFAFA] tracking-widest uppercase mb-4 font-semibold">Achievements</h2>
                  <ul className="list-disc pl-5 space-y-2 text-white/80">
                    <li>Solved 200+ Data Structures and Algorithms problems on LeetCode.</li>
                    <li>Completed multiple industry-oriented internships in Data Science, Analytics, Marketing, and Web Development.</li>
                    <li>Coordinated major university events and technical initiatives.</li>
                    <li>Strong communication, teamwork, and leadership skills.</li>
                  </ul>
                </section>

                <hr className="border-white/10" />

                {/* Certifications */}
                <section>
                  <h2 className="text-xl text-[#FAFAFA] tracking-widest uppercase mb-4 font-semibold">Certifications</h2>
                  <ul className="list-disc pl-5 space-y-2 text-white/80">
                    <li>Python for Data Science - NPTEL</li>
                    <li>HTML5 & CSS3 - Infosys Springboard</li>
                    <li>C/C++ Programming - Infosys Springboard</li>
                    <li>Deloitte Australia Data Analytics Job Simulation Certificate - Forage</li>
                  </ul>
                </section>

                <hr className="border-white/10" />

                {/* Leadership */}
                <section className="pb-8">
                  <h2 className="text-xl text-[#FAFAFA] tracking-widest uppercase mb-6 font-semibold">Leadership & Positions of Responsibility</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg text-[#FAFAFA] font-medium mb-2">Entrepreneurship Development Cell (EDC) - Coordinator</h3>
                      <ul className="list-disc pl-5 space-y-1 text-white/80">
                        <li>Organized and managed club activities and entrepreneurship-focused events.</li>
                        <li>Led coordination efforts to improve member participation and engagement.</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg text-[#FAFAFA] font-medium mb-2">VERTEX 2025 x JUET - Management Coordinator</h3>
                      <ul className="list-disc pl-5 space-y-1 text-white/80">
                        <li>Managed event logistics, planning, and team operations.</li>
                        <li>Coordinated successful execution of university-level technical events.</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg text-[#FAFAFA] font-medium mb-2">Volunteer Experience</h3>
                      <ul className="list-disc pl-5 space-y-1 text-white/80">
                        <li>Tachyon Techfest Volunteer</li>
                        <li>GeeksforGeeks Volunteer</li>
                        <li>E-Summit Event Management Team</li>
                      </ul>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
