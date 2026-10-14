import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  BookOpen,
} from 'lucide-react';

const FAQS = [
  {
    q: 'Can I use LabSim calculators offline?',
    a: 'Yes, once loaded, LabSim runs 100% in your browser. All calculations, color decoders, and circuit math execute locally without querying any backend servers.',
  },
  {
    q: 'Are the formulas compliant with IEEE and NEC standards?',
    a: 'Yes. Calculations strictly adhere to ASTM B258 (AWG), IEEE 1459 (power factor/reactive power), and standard EIA marking codes.',
  },
  {
    q: 'Can educators use LabSim for lab practical examinations?',
    a: 'Absolutely! Our Lab Manual contains objectives, procedures, formulas, and viva questions specifically designed to support undergraduate and diploma electrical courses.',
  },
  {
    q: 'How do I request a new simulation or feature?',
    a: 'Use the contact form on this page or submit an issue on our GitHub repository. Our team regularly reviews suggestions.',
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Student',
    topic: 'General Feedback',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-linear-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-6 sm:p-12 dark:border-slate-800 dark:from-emerald-950/40">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect & Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Contact & Laboratory Inquiry
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Have questions about calculation models, need academic integration support, or spotted a bug? Reach out to the LabSim engineering team.
          </p>
        </div>
      </div>

      {/* Main Grid: Form & Info */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left: Contact Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Send us a Message
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Fill out the form below and our team will get back to you promptly.
            </p>

            {submitted ? (
              <div className="rounded-2xl border border-emerald-300 bg-emerald-50/60 p-8 text-center dark:border-emerald-900/60 dark:bg-emerald-950/20 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Message Transmitted Successfully!
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, {formData.name}. We have received your inquiry regarding &ldquo;{formData.topic}&rdquo; and will review it shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', role: 'Student', topic: 'General Feedback', message: '' });
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Rivera"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@university.edu"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                      Your Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    >
                      <option value="Student">Engineering Student</option>
                      <option value="Educator">Faculty / Educator</option>
                      <option value="Engineer">Practicing Engineer</option>
                      <option value="Hobbyist">Maker / Hobbyist</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    >
                      <option value="General Feedback">General Feedback</option>
                      <option value="Calculation Formula Query">Calculation Formula Query</option>
                      <option value="Lab Manual Content">Lab Manual Content</option>
                      <option value="New Simulation Request">New Simulation Request</option>
                      <option value="Bug Report">Bug Report</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, suggestion, or calculation question in detail..."
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-500 transition-colors w-full sm:w-auto"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Quick Contacts & Meta (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Laboratory Information
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Email Dispatch</span>
                  <span className="text-slate-500 dark:text-slate-400">support@labsim.engineering</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Virtual Lab Headquarters</span>
                  <span className="text-slate-500 dark:text-slate-400">Open source engineering toolkit worldwide</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-900 dark:text-white block mb-2">
                Need Fast Help?
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Explore the complete lab manual for detailed mathematical background and formulas.
              </p>
              <Link
                to="/manual"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read Official Lab Manual &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-500" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2"
            >
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {faq.q}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
