import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Search,
  Check,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  AlertOctagon,
  PhoneCall,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { safetyData } from '../../data/safetyData';

const CATEGORIES = ['All', 'General', 'Household wiring', 'Battery safety', 'Lab circuits', 'Emergency response', 'Wet environments'];

export default function SafetyLab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [acknowledged, setAcknowledged] = useState(false);
  const [acknowledgedItems, setAcknowledgedItems] = useState({});

  const toggleItemAck = (index) => {
    setAcknowledgedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const filteredCards = useMemo(() => {
    return safetyData.filter((item) => {
      const matchesSearch = `${item.title} ${item.category} ${item.description}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesType =
        selectedType === 'All' || item.type.toLowerCase().startsWith(selectedType.toLowerCase());
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchTerm, selectedCategory, selectedType]);

  const totalItems = safetyData.length;
  const ackCount = Object.values(acknowledgedItems).filter(Boolean).length;
  const ackPercentage = Math.round((ackCount / totalItems) * 100);

  return (
    <div className="space-y-10">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">Home</Link>
          <span>/</span>
          <Link to="/labs" className="hover:text-emerald-600 dark:hover:text-emerald-400">Labs</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 dark:text-white">Lab 08: Electrical Safety</span>
        </nav>
        <Link
          to="/manual"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>View in Lab Manual</span>
        </Link>
      </div>

      {/* Lab Header */}
      <div className="rounded-3xl border border-slate-200 bg-linear-to-r from-rose-500/10 via-red-500/5 to-transparent p-6 sm:p-8 dark:border-slate-800 dark:from-rose-950/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-700 dark:border-rose-800 dark:bg-rose-950/80 dark:text-rose-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Lab 08 &bull; Risk Mitigation & Standards</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Electrical Safety Guide & Protocols
            </h1>
            <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Mandatory safety practices, equipment inspection checklists, hazardous condition warnings, and rapid emergency electrical shock response procedures.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setAcknowledged((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shadow-xs ${
                acknowledged
                  ? 'bg-emerald-600 text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{acknowledged ? 'Briefing Acknowledged' : 'Acknowledge Briefing'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Immediate Action Banner */}
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-950 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-red-600 p-2.5 text-white shrink-0 mt-0.5">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-red-900 dark:text-red-300">
                Emergency Shock Response Protocol
              </h4>
              <p className="text-xs text-red-800 dark:text-red-300/90 mt-1 leading-relaxed max-w-2xl">
                1. <strong>Do NOT touch the victim</strong> directly if they may still be in electrical contact.
                2. <strong>De-energize the circuit immediately</strong> via main breaker or emergency stop switch.
                3. If impossible to isolate, use a dry non-conductive object (dry wood/plastic rod) to separate victim from source.
                4. Call local emergency services immediately (911 / 112).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="rounded-xl border border-red-300 bg-white/80 px-3 py-2 text-xs font-mono font-bold text-red-900 dark:bg-red-900/40 dark:text-white flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>Call Emergency: 911 / 112</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search, Filter & Progress Bar */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search topics: insulation, isolation, battery short, wet hands..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-4 py-2.5 text-xs text-slate-900 outline-none focus:border-rose-500 focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-950 text-xs">
              {['All', 'Do', 'Don’t'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedType(t)}
                  className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
                    selectedType === t
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter by:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Progress Tracker */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Safety Checklist Progress</span>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <div className="flex-1 sm:w-40 md:w-48 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${ackPercentage}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 shrink-0">
              {ackCount}/{totalItems} ({ackPercentage}%)
            </span>
          </div>
        </div>
      </div>

      {/* Safety Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredCards.length ? (
          filteredCards.map((item, idx) => {
            const isAck = acknowledgedItems[idx];
            return (
              <article
                key={`${item.type}-${item.title}`}
                className={`rounded-2xl border p-5 transition-all shadow-xs flex flex-col justify-between ${
                  isAck
                    ? 'border-emerald-300 bg-emerald-50/20 dark:border-emerald-900/60 dark:bg-emerald-950/10'
                    : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        item.type === 'Do'
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                          : 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Rule #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => toggleItemAck(idx)}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-md transition-colors ${
                      isAck
                        ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${isAck ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{isAck ? 'Acknowledged' : 'Mark Reviewed'}</span>
                  </button>
                </div>
              </article>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 md:col-span-2 xl:col-span-3">
            No safety protocols matched your criteria &ldquo;{searchTerm}&rdquo;.
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
        <Link
          to="/labs/solar-battery"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: Lab 07 &bull; Solar & Battery</span>
        </Link>
        <Link
          to="/manual"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
        >
          <span>Read Full Lab Manual</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
