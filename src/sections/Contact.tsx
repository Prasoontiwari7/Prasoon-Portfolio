import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from '../lib/profile';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', comment: '' });
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const form = formRef.current;
    if (!section || !bg || !form) return;

    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(bg, {
        y: () => window.innerHeight * 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Form panel entrance
      gsap.fromTo(
        form,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState('sending');
    setSubmitMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.comment || 'No comment provided.',
          _replyto: formData.email,
          _subject: `Portfolio message from ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const result = await response.json().catch(() => null) as { success?: string | boolean; message?: string } | null;

      if (!response.ok || result?.success === 'false' || result?.success === false) {
        throw new Error(result?.message || 'Unable to send message.');
      }

      setFormData({ name: '', email: '', phone: '', comment: '' });
      setSubmitState('success');
      setSubmitMessage('Thanks! Your message has been sent.');
    } catch {
      setSubmitState('error');
      setSubmitMessage(`Message could not be sent. Please email me directly at ${CONTACT_EMAIL}.`);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ padding: '120px clamp(20px, 4vw, 60px)' }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/images/contact-sakura-fuji.jpg"
          alt="Cherry blossoms framing Mount Fuji and a red pagoda"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,183,197,0.08) 0%, transparent 40%, transparent 80%, rgba(10,10,10,0.4) 100%)',
          }}
        />
      </div>

      {/* Form Panel */}
      <div
        ref={formRef}
        className="relative z-10 w-full max-w-[480px]"
        style={{
          background: 'rgba(20,20,20,0.5)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '48px',
        }}
      >
        <h2
          className="text-[#FAFAFA] mb-2"
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: '24px',
            fontWeight: 300,
            lineHeight: 1.5,
          }}
        >
          Want to work together,
          <br />
          or have a question?
        </h2>

        <p
          className="mb-8"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: 400,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#888888',
          }}
        >
          Send a message
        </p>

        <div
          className="mb-8 flex flex-col gap-2 text-sm text-white/70"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-[#D4F87A]">
            {CONTACT_EMAIL}
          </a>
          <a href={CONTACT_PHONE_HREF} className="transition-colors hover:text-[#D4F87A]">
            {CONTACT_PHONE_DISPLAY}
          </a>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label
              className="block mb-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              Your name
            </label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => {
                setSubmitState('idle');
                setSubmitMessage('');
                setFormData({ ...formData, name: e.target.value });
              }}
              required
            />
          </div>

          <div>
            <label
              className="block mb-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => {
                setSubmitState('idle');
                setSubmitMessage('');
                setFormData({ ...formData, email: e.target.value });
              }}
              required
            />
          </div>

          <div>
            <label
              className="block mb-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              Phone number
            </label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder="Enter your phone"
              value={formData.phone}
              onChange={(e) => {
                setSubmitState('idle');
                setSubmitMessage('');
                setFormData({ ...formData, phone: e.target.value });
              }}
              required
            />
          </div>

          <div>
            <label
              className="block mb-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              Comment
            </label>
            <textarea
              name="message"
              className="form-input resize-none"
              rows={3}
              placeholder="Any questions or comments..."
              value={formData.comment}
              onChange={(e) => {
                setSubmitState('idle');
                setSubmitMessage('');
                setFormData({ ...formData, comment: e.target.value });
              }}
            />
          </div>

          {submitMessage && (
            <p
              className={submitState === 'error' ? 'text-red-300' : 'text-[#D4F87A]'}
              style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.6 }}
            >
              {submitMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={submitState === 'sending'}
            className="w-full mt-2 transition-colors duration-300"
            style={{
              background: '#FAFAFA',
              color: '#0A0A0A',
              borderRadius: '9999px',
              padding: '16px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: 'none',
              opacity: submitState === 'sending' ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (submitState !== 'sending') {
                (e.currentTarget as HTMLButtonElement).style.background = '#D4F87A';
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#FAFAFA';
            }}
          >
            {submitState === 'sending' ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </section>
  );
}
