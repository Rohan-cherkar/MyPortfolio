import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaPaperPlane } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import { SectionTitle } from './About';
import toast, { Toaster } from 'react-hot-toast';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'YOUR_FORMSPREE_ENDPOINT';

function ContactLink({ icon, label, href, value }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      className="glass-card-hover p-4 flex items-center gap-4 group"
      aria-label={label}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-purple-neon flex-shrink-0 group-hover:scale-110 transition-transform"
        style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)' }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div>
        <div className="text-purple-lavender/50 text-xs font-medium">{label}</div>
        <div className="text-white text-sm font-semibold mt-0.5 group-hover:text-purple-neon transition-colors">{value}</div>
      </div>
    </a>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message too short';
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Message sent! I'll get back to you soon. 🚀", { duration: 5000 });
        setForm({ name: '', email: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      toast.error('Something went wrong. Try emailing me directly!', { duration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl text-white placeholder-purple-lavender/40 outline-none transition-all duration-200 text-sm ${
      errors[field]
        ? 'border-red-500/60 bg-red-500/5 focus:border-red-400'
        : 'border-purple-lavender/20 bg-white/[0.04] focus:border-purple-neon/60 focus:bg-white/[0.06]'
    } border`;

  return (
    <section id="contact" className="relative py-24">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1A0633',
            color: '#DDD6FE',
            border: '1px solid rgba(196,181,253,0.2)',
          },
        }}
      />

      <div
        className="blob"
        style={{ width: 400, height: 400, background: '#7C3AED', top: '10%', left: '-5%', opacity: 0.15 }}
        aria-hidden="true"
      />

      <div className="section-container">
        <SectionTitle>
          {'📬 Contact'}
          {'Have a Project in Mind?'}
          {"Let's Connect."}
        </SectionTitle>

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto"
        >
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            <p className="text-purple-lavender/70 leading-relaxed text-sm mb-6">
              Whether you have a job opportunity, freelance project, or just want to say hello — my inbox is always open. I'll get back to you within 24 hours.
            </p>

            <ContactLink
              icon={<FaEnvelope />}
              label="Email"
              href={`mailto:${personalInfo.email}`}
              value={personalInfo.email}
            />
            <ContactLink
              icon={<FaLinkedin />}
              label="LinkedIn"
              href={personalInfo.linkedin}
              value="linkedin.com/in/rohan-cherkar"
            />
            <ContactLink
              icon={<FaGithub />}
              label="GitHub"
              href={personalInfo.github}
              value="github.com/Rohan-cherkar"
            />

            <a
              href={personalInfo.resumeUrl}
              download
              className="btn-primary w-full justify-center mt-4"
              aria-label="Download Rohan's Resume"
            >
              <FaDownload aria-hidden="true" /> Download Resume
            </a>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 glass-card p-8 space-y-5"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
          >
            <div>
              <label htmlFor="name" className="text-purple-lavender/70 text-sm font-medium mb-1.5 block">
                Your Name <span aria-hidden="true" className="text-red-400">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Rohan Cherkar"
                value={form.name}
                onChange={handleChange}
                className={inputClass('name')}
                autoComplete="name"
                aria-required="true"
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-red-400 text-xs mt-1" role="alert">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="text-purple-lavender/70 text-sm font-medium mb-1.5 block">
                Email Address <span aria-hidden="true" className="text-red-400">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={inputClass('email')}
                autoComplete="email"
                aria-required="true"
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-400 text-xs mt-1" role="alert">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="text-purple-lavender/70 text-sm font-medium mb-1.5 block">
                Message <span aria-hidden="true" className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Hi Rohan, I'd love to discuss..."
                value={form.message}
                onChange={handleChange}
                className={`${inputClass('message')} resize-none`}
                aria-required="true"
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-red-400 text-xs mt-1" role="alert">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label={loading ? 'Sending message…' : 'Send message'}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Sending…
                </span>
              ) : (
                <><FaPaperPlane aria-hidden="true" /> Send Message</>
              )}
            </button>

            <p className="text-purple-lavender/40 text-xs text-center">
              Or email directly:{' '}
              <a href={`mailto:${personalInfo.email}`} className="text-purple-neon hover:underline">
                {personalInfo.email}
              </a>
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
