import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Filter,
  Sparkles,
  BookOpen,
  CheckCircle,
} from 'lucide-react';
import { LABS_DATA } from '../data/labsData';

const CATEGORIES = ['All', 'Components', 'Circuits', 'Installation', 'Power & Energy', 'Reference', 'Renewables', 'Safety'];

export default function LabsHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredLabs = useMemo(() => {
    return LABS_DATA.filter((lab) => {
      const matchesSearch = `${lab.title} ${lab.description} ${lab.tags.join(' ')}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'All' || lab.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="rounded-3xl border border-slate-200 bg-linear-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-6 sm:p-10 dark:border-slate-800 dark:from-emerald-950/40">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Virtual Electrical Engineering Laboratory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            All 8 Laboratory Simulations
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Select an experiment to open its dedicated interactive laboratory workbench, complete with formula transparency, parameter sweeps, and live calculations.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search labs by name, formula, or tag (e.g. Resistor, AWG, Solar, Power)..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-emerald-500 focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <Link
            to="/manual"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:text-emerald-400"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read Lab Manual</span>
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Category:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 8 Labs */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {filteredLabs.length ? (
          filteredLabs.map((lab) => {
            const Icon = lab.icon;
            return (
              <div
                key={lab.id}
                className="group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-200 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {lab.badge} &bull; {lab.category}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Ready
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {lab.title}
                      </h2>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {lab.description}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3 mb-6">
                    {lab.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-mono text-slate-600 dark:bg-slate-950 dark:text-slate-400 border border-slate-100 dark:border-slate-800"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Interactive Simulation</span>
                  <Link
                    to={lab.path}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500 transition-colors"
                  >
                    <span>Launch Lab</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
            No simulations found matching &ldquo;{searchTerm}&rdquo;. Try another keyword.
          </div>
        )}
      </div>
    </div>
  );
}
