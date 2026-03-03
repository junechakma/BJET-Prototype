import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  Circle,
  Settings,
} from "lucide-react";

const DAYS = [
  {
    id: 1,
    name: "Day 1",
    targetPages: "1-3",
    status: "completed",
    questions: 45,
  },
  {
    id: 2,
    name: "Day 2",
    targetPages: "4-5",
    status: "completed",
    questions: 30,
  },
  { id: 3, name: "Day 3", targetPages: "6-8", status: "active", questions: 0 },
  {
    id: 4,
    name: "Day 4",
    targetPages: "9-11",
    status: "pending",
    questions: 0,
  },
  {
    id: 5,
    name: "Day 5",
    targetPages: "12-14",
    status: "pending",
    questions: 0,
  },
  {
    id: 6,
    name: "Day 6",
    targetPages: "15-18",
    status: "pending",
    questions: 0,
  },
];

export default function WeekDetail() {
  const { weekId } = useParams();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          to="/teacher"
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Week {weekId}
          </h1>
          <p className="text-slate-500 mt-1">
            Oct 14 - Oct 20 • Manage daily content
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DAYS.map((day) => (
          <Link
            key={day.id}
            to={`/teacher/week/${weekId}/day/${day.id}`}
            className={`relative p-6 rounded-2xl border transition-all group ${
              day.status === "completed"
                ? "bg-white border-slate-200 hover:border-emerald-400 hover:shadow-md"
                : day.status === "active"
                  ? "bg-indigo-50/50 border-indigo-200 hover:border-indigo-400 hover:shadow-md"
                  : "bg-slate-50 border-slate-200 opacity-70 hover:opacity-100 hover:shadow-sm"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-slate-900">{day.name}</h3>
              {day.status === "completed" ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              ) : day.status === "active" ? (
                <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse mt-1.5" />
              ) : (
                <Circle className="w-6 h-6 text-slate-300" />
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-600">
                <FileText className="w-4 h-4" />
                <span className="font-medium">Pages {day.targetPages}</span>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-200/60">
                <span className="text-sm text-slate-500 font-medium">
                  Questions Bank
                </span>
                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    day.questions > 0
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {day.questions} Qs
                </span>
              </div>
            </div>

            {day.status === "active" && (
              <div className="mt-4 w-full py-2 bg-indigo-600 text-white text-center rounded-lg font-medium text-sm shadow-sm group-hover:bg-indigo-700 transition-colors">
                Upload & Generate
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
