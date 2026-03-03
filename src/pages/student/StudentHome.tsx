import { Link } from "react-router-dom";
import {
  Calendar,
  CheckCircle2,
  Lock,
  PlayCircle,
  PackageOpen,
} from "lucide-react";

const WEEK_DAYS = [
  { id: 1, name: "Day 1", status: "completed", score: 85 },
  { id: 2, name: "Day 2", status: "completed", score: 78 },
  { id: 3, name: "Day 3", status: "unlocked", score: null },
  { id: 4, name: "Day 4", status: "locked", score: null },
  { id: 5, name: "Day 5", status: "locked", score: null },
  { id: 6, name: "Day 6", status: "locked", score: null },
];

export default function StudentHome() {
  return (
    <div className="p-4 space-y-6 bg-slate-50 min-h-full">
      {/* Week Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Week 3
          </h2>
          <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5 mt-1">
            <Calendar className="w-4 h-4" /> Oct 14 - Oct 20
          </p>
        </div>
        <div className="w-16 h-16 rounded-full border-4 border-indigo-100 flex items-center justify-center relative">
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 36 36"
          >
            <path
              className="text-indigo-500"
              strokeDasharray="100, 100"
              strokeDashoffset="66" // 33% complete
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="font-bold text-slate-900">33%</span>
        </div>
      </div>

      {/* Days List */}
      <div className="space-y-3">
        {WEEK_DAYS.map((day) => (
          <div
            key={day.id}
            className={`relative overflow-hidden rounded-2xl border transition-all ${
              day.status === "completed"
                ? "bg-white border-emerald-200 shadow-sm"
                : day.status === "unlocked"
                  ? "bg-indigo-600 border-indigo-700 shadow-md transform hover:-translate-y-1"
                  : "bg-slate-100 border-slate-200 opacity-70"
            }`}
          >
            {day.status === "unlocked" && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 animate-pulse" />
            )}

            <div className="p-4 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${
                    day.status === "completed"
                      ? "bg-emerald-100 text-emerald-600"
                      : day.status === "unlocked"
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 text-slate-400"
                  }`}
                >
                  {day.status === "completed" ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : day.status === "unlocked" ? (
                    <PlayCircle className="w-6 h-6 fill-current" />
                  ) : (
                    <Lock className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3
                    className={`font-bold text-lg ${day.status === "unlocked" ? "text-white" : "text-slate-900"}`}
                  >
                    {day.name}
                  </h3>
                  <p
                    className={`text-sm font-medium ${day.status === "unlocked" ? "text-indigo-200" : "text-slate-500"}`}
                  >
                    {day.status === "completed"
                      ? `Score: ${day.score}%`
                      : day.status === "unlocked"
                        ? "Start Today"
                        : "Locked"}
                  </p>
                </div>
              </div>

              {day.status === "unlocked" && (
                <Link
                  to={`/student/test/start/${day.id}`}
                  className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-50 transition-colors"
                >
                  START
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Catch-Up Test */}
      <div className="mt-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden group cursor-pointer">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
            <PackageOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-lg tracking-tight">
              Weekly Catch-Up
            </h3>
            <p className="text-amber-100 text-sm font-medium mt-1 leading-snug">
              Missed a day? Take a combined test to catch up before Friday!
            </p>
            <button className="mt-3 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm transition-colors">
              Start Catch-Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
