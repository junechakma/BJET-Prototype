import { useLocation, Link } from "react-router-dom";
import { Trophy, Clock, Target, Star, ChevronRight, Flame } from "lucide-react";

export default function TestResults() {
  const location = useLocation();
  const { score = 24, total = 30, time = 872 } = location.state || {}; // Default mock values
  const percentage = Math.round((score / total) * 100);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="p-4 bg-slate-50 min-h-full flex flex-col items-center">
      {/* Celebration Header */}
      <div className="text-center mt-8 mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-300 to-orange-500 rounded-full shadow-xl shadow-orange-200 mb-6 relative">
          <Trophy className="w-12 h-12 text-white" />
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
            <span className="text-lg">🎉</span>
          </div>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
          Day 3 Complete!
        </h1>
        <p className="text-slate-500 font-medium">
          You're making great progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="w-full grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <Target className="w-8 h-8 text-indigo-500 mb-3" />
          <span className="text-3xl font-black text-slate-900">
            {percentage}%
          </span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
            Score
          </span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <Clock className="w-8 h-8 text-emerald-500 mb-3" />
          <span className="text-xl font-black text-slate-900">
            {formatTime(time)}
          </span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
            Time
          </span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <Star className="w-8 h-8 text-amber-500 mb-3" />
          <span className="text-2xl font-black text-slate-900">+120</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
            XP Earned
          </span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <Flame className="w-8 h-8 text-orange-500 mb-3" />
          <span className="text-2xl font-black text-slate-900">3 Days</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
            Streak
          </span>
        </div>
      </div>

      {/* Insights */}
      <div className="w-full bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-8">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="text-xl">🧠</span> AI Insights
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-emerald-600 font-bold">💪</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Strong Areas</h4>
              <p className="text-sm text-slate-500">
                Vocabulary, Reading Comprehension
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-amber-600 font-bold">⚠️</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Needs Review</h4>
              <p className="text-sm text-slate-500">
                Grammar patterns (て-form)
              </p>
            </div>
          </div>
        </div>
      </div>

      <Link
        to="/student"
        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 mt-auto"
      >
        Continue
        <ChevronRight className="w-6 h-6" />
      </Link>
    </div>
  );
}
