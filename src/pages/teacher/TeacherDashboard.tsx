import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Calendar,
  Clock,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

const WEEKS = [
  { id: 1,  name: "Week 1",  date: "Mar 27 - Apr 2",   status: "pending", progress: 0 },
  { id: 2,  name: "Week 2",  date: "Apr 3 - Apr 9",    status: "pending", progress: 0 },
  { id: 3,  name: "Week 3",  date: "Apr 10 - Apr 16",  status: "pending", progress: 0 },
  { id: 4,  name: "Week 4",  date: "Apr 17 - Apr 23",  status: "pending", progress: 0 },
  { id: 5,  name: "Week 5",  date: "Apr 24 - Apr 30",  status: "pending", progress: 0 },
  { id: 6,  name: "Week 6",  date: "May 1 - May 7",    status: "pending", progress: 0 },
  { id: 7,  name: "Week 7",  date: "May 8 - May 14",   status: "pending", progress: 0 },
  { id: 8,  name: "Week 8",  date: "May 15 - May 21",  status: "pending", progress: 0 },
  { id: 9,  name: "Week 9",  date: "May 22 - May 28",  status: "pending", progress: 0 },
  { id: 10, name: "Week 10", date: "May 29 - Jun 4",   status: "pending", progress: 0 },
  { id: 11, name: "Week 11", date: "Jun 5 - Jun 11",   status: "pending", progress: 0 },
  { id: 12, name: "Week 12", date: "Jun 12 - Jun 18",  status: "pending", progress: 0 },
  { id: 13, name: "Week 13", date: "Jun 19 - Jun 25",  status: "pending", progress: 0 },
  { id: 14, name: "Week 14", date: "Jun 26 - Jul 2",   status: "pending", progress: 0 },
  { id: 15, name: "Week 15", date: "Jul 3 - Jul 3",    status: "pending", progress: 0 },
];


export default function TeacherDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Curriculum Overview
          </h1>
          <p className="text-slate-500 mt-1">
            Manage weekly lessons and generate AI questions.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Week
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {WEEKS.map((week) => (
          <Link
            key={week.id}
            to={`/teacher/week/${week.id}`}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-indigo-300 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider ${
                  week.status === "active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {week.status}
              </div>
              <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-50">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
              {week.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
              <Calendar className="w-4 h-4" />
              {week.date}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-600">Completion</span>
                <span className="text-slate-900">{week.progress}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${week.status === "active" ? "bg-indigo-500" : "bg-slate-400"}`}
                  style={{ width: `${week.progress}%` }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">
                Create New Week
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Week Name
                </label>
                <input
                  type="text"
                  defaultValue="Week 4"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-indigo-600 text-white font-medium hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Create Week
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
