import { Link } from 'react-router-dom';
import {
  Cpu,
  Shield,
  Zap,
  Award,
  Users,
  Code,
  ArrowRight,
  BookOpen,
  Sparkles,
} from 'lucide-react';

const TEAM = [
  {
    name: 'Vasanth',
    role: 'Lead Architect & Systems Engineer',
    bio: 'Specializing in electrical simulations, circuit mathematics, and interactive web workbench design.',
    initials: 'V',
    color: 'bg-emerald-500',
  },
  {
    name: 'Glenn',
    role: 'Frontend & UI/UX Developer',
    bio: 'Crafting responsive laboratory interfaces, color-coded visual schematics, and accessible controls.',
    initials: 'G',
    color: 'bg-blue-500',
  },
  {
    name: 'Aiden',
    role: 'Calculation & Verification Engineer',
    bio: 'Validating mathematical formulas across Ohm’s law, AWG cable sizing, and AC power systems.',
    initials: 'A',
    color: 'bg-purple-500',
  },
  {
    name: 'Alison Pinto',
    role: 'Safety & Educational Standards Lead',
    bio: 'Curating the comprehensive lab manual, safety protocols, and emergency guidance for engineering learners.',
    initials: 'AP',
    color: 'bg-rose-500',
  },
];

const PRINCIPLES = [
  {
    icon: Zap,
    title: 'Accuracy First',
    description: 'Every formula, derivation, and unit conversion is peer-reviewed against international IEEE, EIA, and ASTM B258 engineering standards.',
  },
  {
    icon: Sparkles,
    title: 'Learn by Experimenting',
    description: 'Adjust voltages, resistance bands, wire lengths, and solar parameters in real time to observe circuit reactions instantaneously.',
  },
  {
    icon: Code,
    title: '100% Client-Side Privacy',
    description: 'Runs completely inside your browser with zero telemetry, zero servers, and no account or API keys required.',
  },
  {
    icon: Shield,
    title: 'Safety Conscious',
    description: 'Clearly distinguishes academic estimates from licensed field installations while teaching vital high-voltage safety practices.',
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="rounded-3xl border border-slate-200 bg-linear-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-6 sm:p-12 dark:border-slate-800 dark:from-emerald-950/40">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
            <Cpu className="w-3.5 h-3.5" />
            <span>Empowering Engineers & Students</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            About LabSim
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            LabSim is an open, accessible, browser-based electrical engineering laboratory toolkit built for universities, technical colleges, makers, and practicing engineers worldwide.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Our Engineering Principles
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Engineered with strict adherence to electrical physics and modern web standards.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Users className="w-3.5 h-3.5" />
              <span>The Team</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Built by Engineers, for Engineers
            </h2>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col items-center text-center space-y-4"
            >
              <div className={`w-16 h-16 rounded-2xl ${member.color} text-white font-black text-xl flex items-center justify-center shadow-lg shadow-emerald-500/10`}>
                {member.initials}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {member.name}
                </h3>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                  {member.role}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology & Compliance Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600">
              <Award className="w-4 h-4" />
              <span>Technology & Standards</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Standards-Compliant Calculation Engine
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              LabSim executes verified mathematical models matching industry criteria:
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
              <li><strong>ASTM B258:</strong> American Wire Gauge logarithmic cross-sectional diameters.</li>
              <li><strong>IEC 60062:</strong> Marking codes for resistors and capacitors.</li>
              <li><strong>IEEE Standard 1459:</strong> Vector definitions for AC power quantities (P, Q, S).</li>
              <li><strong>SI Metric System:</strong> Internal floating-point normalization with unit scaling.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950 space-y-4 text-center">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Ready to Explore the Labs?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Access all 8 interactive experiment workbenches with one click.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link
                to="/labs"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500"
              >
                <span>Browse All Labs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/manual"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Lab Manual</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
