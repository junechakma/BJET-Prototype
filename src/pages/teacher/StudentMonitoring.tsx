import { useState } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const STUDENTS = [
  {
    id: 1,
    name: "Rafi Ahmed",
    status: "completed",
    pages: "1-3",
    mcqs: 45,
    correct: 38,
    time: "12m",
    score: 84,
    streak: 5,
  },
  {
    id: 2,
    name: "Mim Akter",
    status: "completed",
    pages: "1-2",
    mcqs: 30,
    correct: 22,
    time: "18m",
    score: 73,
    streak: 2,
  },
  {
    id: 3,
    name: "Sakib Hasan",
    status: "in_progress",
    pages: "-",
    mcqs: 0,
    correct: 0,
    time: "-",
    score: 0,
    streak: 3,
  },
  {
    id: 4,
    name: "Tanvir Rahman",
    status: "not_started",
    pages: "-",
    mcqs: 0,
    correct: 0,
    time: "-",
    score: 0,
    streak: 0,
  },
  {
    id: 5,
    name: "Nadia Islam",
    status: "not_started",
    pages: "-",
    mcqs: 0,
    correct: 0,
    time: "-",
    score: 0,
    streak: 0,
  },
];

export default function StudentMonitoring() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Student Monitoring
        </h1>
        <p className="text-slate-500 mt-1">
          Track daily progress and identify weak areas.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-slate-600">
              Completed Today
            </h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            11<span className="text-lg text-slate-400 font-normal">/15</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-slate-600">Avg. Score</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">78%</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm md:col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-slate-600">
              Needs Attention
            </h3>
          </div>
          <p className="text-sm text-slate-700 mt-2">
            <span className="font-bold">Tanvir</span> and{" "}
            <span className="font-bold">Nadia</span> have missed 2 days in a
            row. Most students are struggling with{" "}
            <span className="font-bold text-red-600">て-form grammar</span>{" "}
            (Page 4).
          </p>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-900">
            Today's Activity (Day 3)
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="px-6 py-4 font-semibold">Student</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Pages</th>
                <th className="px-6 py-4 font-semibold">Score</th>
                <th className="px-6 py-4 font-semibold">Time</th>
                <th className="px-6 py-4 font-semibold">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {STUDENTS.filter((s) =>
                s.name.toLowerCase().includes(searchTerm.toLowerCase()),
              ).map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">
                      {student.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {student.status === "completed" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : student.status === "in_progress" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-700">
                        <Clock className="w-3.5 h-3.5" /> In Progress
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-red-100 text-red-700">
                        <XCircle className="w-3.5 h-3.5" /> Not Started
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {student.pages}
                  </td>
                  <td className="px-6 py-4">
                    {student.status === "completed" ? (
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-bold ${student.score >= 80 ? "text-emerald-600" : student.score >= 60 ? "text-amber-600" : "text-red-600"}`}
                        >
                          {student.score}%
                        </span>
                        <span className="text-xs text-slate-400">
                          ({student.correct}/{student.mcqs})
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {student.time}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-orange-500 font-bold">
                      🔥 {student.streak}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
