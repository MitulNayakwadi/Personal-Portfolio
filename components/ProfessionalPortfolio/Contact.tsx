import { useState } from 'react';
import { CONTACT_DATA } from '../../data/portfolio';
import AnimateOnScroll from '../AnimateOnScroll';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/xjgdozva', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-[900px] mx-auto text-center">
      <AnimateOnScroll direction="up">
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="border-b-2 border-[#2563EB] pb-2 mb-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A2E] tracking-tight">
              Get In Touch
            </h2>
          </div>
          <p className="font-body text-slate-500 text-[14px] sm:text-[15px] max-w-lg leading-relaxed">
            {CONTACT_DATA.tagline}
          </p>
        </div>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-10 items-stretch text-left">
        {/* Contact links */}
        <div className="md:col-span-4 flex flex-col justify-center space-y-5">
          <AnimateOnScroll delay={0.1} direction="left">
            <div className="space-y-4">
              <a
                href={`mailto:${CONTACT_DATA.email}`}
                className="flex items-center gap-4 group p-3.5 border border-slate-200 bg-white hover:border-blue-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all rounded-xl cursor-pointer"
                data-hover="true"
              >
                <div className="p-2 rounded-lg bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                  <Mail size={16} />
                </div>
                <div className="overflow-hidden">
                  <span className="block font-mono text-[9px] text-slate-400 font-bold tracking-widest uppercase">Email</span>
                  <span className="block font-body text-[13px] font-semibold text-slate-700 truncate">{CONTACT_DATA.email}</span>
                </div>
              </a>

              <a
                href={CONTACT_DATA.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group p-3.5 border border-slate-200 bg-white hover:border-blue-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all rounded-xl cursor-pointer"
                data-hover="true"
              >
                <div className="p-2 rounded-lg bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                  <Linkedin size={16} />
                </div>
                <div className="overflow-hidden">
                  <span className="block font-mono text-[9px] text-slate-400 font-bold tracking-widest uppercase">LinkedIn</span>
                  <span className="block font-body text-[13px] font-semibold text-slate-700 truncate">{CONTACT_DATA.linkedin}</span>
                </div>
              </a>

              <a
                href={CONTACT_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group p-3.5 border border-slate-200 bg-white hover:border-blue-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all rounded-xl cursor-pointer"
                data-hover="true"
              >
                <div className="p-2 rounded-lg bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                  <Github size={16} />
                </div>
                <div className="overflow-hidden">
                  <span className="block font-mono text-[9px] text-slate-400 font-bold tracking-widest uppercase">GitHub</span>
                  <span className="block font-body text-[13px] font-semibold text-slate-700 truncate">{CONTACT_DATA.github}</span>
                </div>
              </a>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Contact form */}
        <div className="md:col-span-6 w-full">
          <AnimateOnScroll delay={0.2} direction="right">
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-6 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="form-name" className="block font-mono text-[10px] text-slate-450 font-bold uppercase tracking-widest">
                  Name
                </label>
                <input
                  id="form-name"
                  type="text"
                  required
                  disabled={status === 'submitting'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full font-body text-[13px] sm:text-sm p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2563EB] transition-colors disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="form-email" className="block font-mono text-[10px] text-slate-455 font-bold uppercase tracking-widest">
                  Email
                </label>
                <input
                  id="form-email"
                  type="email"
                  required
                  disabled={status === 'submitting'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full font-body text-[13px] sm:text-sm p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2563EB] transition-colors disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="form-message" className="block font-mono text-[10px] text-slate-455 font-bold uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  id="form-message"
                  required
                  rows={4}
                  disabled={status === 'submitting'}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi Mitul, let's collaborate..."
                  className="w-full font-body text-[13px] sm:text-sm p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2563EB] transition-colors resize-none disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-body font-semibold text-xs uppercase tracking-widest py-3.5 px-6 rounded-lg transition-all shadow-[0_2px_8px_rgba(37,99,235,0.12)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer border-none disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={12} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="text-center font-body text-[12px] text-emerald-600 font-semibold bg-emerald-50 py-2.5 rounded-lg border border-emerald-100 animate-fade-in mt-3">
                  Success! Your message was sent successfully.
                </div>
              )}

              {status === 'error' && (
                <div className="text-center font-body text-[12px] text-rose-600 font-semibold bg-rose-50 py-2.5 rounded-lg border border-rose-100 animate-fade-in mt-3">
                  Oops! Something went wrong. Please try again.
                </div>
              )}
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
