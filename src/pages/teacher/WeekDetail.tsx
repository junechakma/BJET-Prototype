import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  Circle,
} from "lucide-react";

// All 15 weeks with real dates and page ranges from the BB15 Advanced Study Plan CSV.
// Each week = 1 Friday class day + Mon–Thu self-study days (Sat/Sun are holidays).
// Day 1 = Friday class; Days 2–5 = Mon–Thu self-study.
const DAYS_BY_WEEK: Record<number, {
  id: number; name: string; date: string; dow: string;
  targetPages: string; topic: string; status: string; questions: number;
}[]> = {
  1: [
    { id: 1, name: "Day 1", date: "3/27", dow: "Fri", targetPages: "18-23", topic: "ぶんぽう", status: "active",  questions: 0 },
    { id: 2, name: "Day 2", date: "3/30", dow: "Mon", targetPages: "14-15", topic: "かんじ",  status: "pending", questions: 0 },
    { id: 3, name: "Day 3", date: "3/31", dow: "Tue", targetPages: "16-17", topic: "かんじ",  status: "pending", questions: 0 },
    { id: 4, name: "Day 4", date: "4/1",  dow: "Wed", targetPages: "18-19", topic: "かんじ",  status: "pending", questions: 0 },
    { id: 5, name: "Day 5", date: "4/2",  dow: "Thu", targetPages: "20-21", topic: "かんじ",  status: "pending", questions: 0 },
  ],
  2: [
    { id: 1, name: "Day 1", date: "4/3",  dow: "Fri", targetPages: "24-29", topic: "ぶんぽう", status: "active",  questions: 0 },
    { id: 2, name: "Day 2", date: "4/6",  dow: "Mon", targetPages: "30-31", topic: "ぶんぽう", status: "pending", questions: 0 },
    { id: 3, name: "Day 3", date: "4/7",  dow: "Tue", targetPages: "22-23", topic: "かんじ",  status: "pending", questions: 0 },
    { id: 4, name: "Day 4", date: "4/8",  dow: "Wed", targetPages: "24-25", topic: "かんじ",  status: "pending", questions: 0 },
    { id: 5, name: "Day 5", date: "4/9",  dow: "Thu", targetPages: "26-28", topic: "かんじ",  status: "pending", questions: 0 },
  ],
  3: [
    { id: 1, name: "Day 1", date: "4/10", dow: "Fri", targetPages: "34-39", topic: "ぶんぽう", status: "active",  questions: 0 },
    { id: 2, name: "Day 2", date: "4/13", dow: "Mon", targetPages: "62-63", topic: "ことば",  status: "pending", questions: 0 },
    { id: 3, name: "Day 3", date: "4/14", dow: "Tue", targetPages: "64-65", topic: "ことば",  status: "pending", questions: 0 },
    { id: 4, name: "Day 4", date: "4/15", dow: "Wed", targetPages: "66-67", topic: "ことば",  status: "pending", questions: 0 },
    { id: 5, name: "Day 5", date: "4/16", dow: "Thu", targetPages: "68-69", topic: "ことば",  status: "pending", questions: 0 },
  ],
  4: [
    { id: 1, name: "Day 1", date: "4/17", dow: "Fri", targetPages: "40-45", topic: "ぶんぽう", status: "active",  questions: 0 },
    { id: 2, name: "Day 2", date: "4/20", dow: "Mon", targetPages: "46-47", topic: "ぶんぽう", status: "pending", questions: 0 },
    { id: 3, name: "Day 3", date: "4/21", dow: "Tue", targetPages: "70-71", topic: "ことば",  status: "pending", questions: 0 },
    { id: 4, name: "Day 4", date: "4/22", dow: "Wed", targetPages: "72-73", topic: "ことば",  status: "pending", questions: 0 },
    { id: 5, name: "Day 5", date: "4/23", dow: "Thu", targetPages: "74-76", topic: "ことば",  status: "pending", questions: 0 },
  ],
  5: [
    { id: 1, name: "Day 1", date: "4/24", dow: "Fri", targetPages: "50-55", topic: "ぶんぽう", status: "active",  questions: 0 },
    { id: 2, name: "Day 2", date: "4/27", dow: "Mon", targetPages: "30-31", topic: "かんじ",  status: "pending", questions: 0 },
    { id: 3, name: "Day 3", date: "4/28", dow: "Tue", targetPages: "32-33", topic: "かんじ",  status: "pending", questions: 0 },
    { id: 4, name: "Day 4", date: "4/29", dow: "Wed", targetPages: "34-35", topic: "かんじ",  status: "pending", questions: 0 },
    { id: 5, name: "Day 5", date: "4/30", dow: "Thu", targetPages: "36-37", topic: "かんじ",  status: "pending", questions: 0 },
  ],
  6: [
    { id: 1, name: "Day 1", date: "5/1",  dow: "Fri", targetPages: "56-61", topic: "ぶんぽう", status: "active",  questions: 0 },
    { id: 2, name: "Day 2", date: "5/4",  dow: "Mon", targetPages: "62-63", topic: "ぶんぽう", status: "pending", questions: 0 },
    { id: 3, name: "Day 3", date: "5/5",  dow: "Tue", targetPages: "38-39", topic: "かんじ",  status: "pending", questions: 0 },
    { id: 4, name: "Day 4", date: "5/6",  dow: "Wed", targetPages: "40-41", topic: "かんじ",  status: "pending", questions: 0 },
    { id: 5, name: "Day 5", date: "5/7",  dow: "Thu", targetPages: "42-44", topic: "かんじ",  status: "pending", questions: 0 },
  ],
  7: [
    { id: 1, name: "Day 1", date: "5/8",  dow: "Fri", targetPages: "66-71", topic: "ぶんぽう", status: "active",  questions: 0 },
    { id: 2, name: "Day 2", date: "5/11", dow: "Mon", targetPages: "78-79", topic: "ことば",  status: "pending", questions: 0 },
    { id: 3, name: "Day 3", date: "5/12", dow: "Tue", targetPages: "80-81", topic: "ことば",  status: "pending", questions: 0 },
    { id: 4, name: "Day 4", date: "5/13", dow: "Wed", targetPages: "82-83", topic: "ことば",  status: "pending", questions: 0 },
    { id: 5, name: "Day 5", date: "5/14", dow: "Thu", targetPages: "84-85", topic: "ことば",  status: "pending", questions: 0 },
  ],
  8: [
    { id: 1, name: "Day 1", date: "5/15", dow: "Fri", targetPages: "72-77", topic: "ぶんぽう", status: "active",  questions: 0 },
    { id: 2, name: "Day 2", date: "5/18", dow: "Mon", targetPages: "78-79", topic: "ぶんぽう", status: "pending", questions: 0 },
    { id: 3, name: "Day 3", date: "5/19", dow: "Tue", targetPages: "86-87", topic: "ことば",  status: "pending", questions: 0 },
    { id: 4, name: "Day 4", date: "5/20", dow: "Wed", targetPages: "88-89", topic: "ことば",  status: "pending", questions: 0 },
    { id: 5, name: "Day 5", date: "5/21", dow: "Thu", targetPages: "90-92", topic: "ことば",  status: "pending", questions: 0 },
  ],
  9: [
    { id: 1, name: "Day 1", date: "5/22", dow: "Fri", targetPages: "82-87", topic: "どっかい", status: "active",  questions: 0 },
    { id: 2, name: "Day 2", date: "5/25", dow: "Mon", targetPages: "46-47", topic: "かんじ",  status: "pending", questions: 0 },
    { id: 3, name: "Day 3", date: "5/26", dow: "Tue", targetPages: "48-49", topic: "かんじ",  status: "pending", questions: 0 },
    { id: 4, name: "Day 4", date: "5/27", dow: "Wed", targetPages: "50-51", topic: "かんじ",  status: "pending", questions: 0 },
    { id: 5, name: "Day 5", date: "5/28", dow: "Thu", targetPages: "52-53", topic: "かんじ",  status: "pending", questions: 0 },
  ],
  10: [
    { id: 1, name: "Day 1", date: "5/29", dow: "Fri", targetPages: "88-93", topic: "どっかい", status: "active",  questions: 0 },
    { id: 2, name: "Day 2", date: "6/1",  dow: "Mon", targetPages: "94-95", topic: "どっかい", status: "pending", questions: 0 },
    { id: 3, name: "Day 3", date: "6/2",  dow: "Tue", targetPages: "54-55", topic: "かんじ",  status: "pending", questions: 0 },
    { id: 4, name: "Day 4", date: "6/3",  dow: "Wed", targetPages: "56-57", topic: "かんじ",  status: "pending", questions: 0 },
    { id: 5, name: "Day 5", date: "6/4",  dow: "Thu", targetPages: "58-60", topic: "かんじ",  status: "pending", questions: 0 },
  ],
  11: [
    { id: 1, name: "Day 1", date: "6/5",  dow: "Fri", targetPages: "98-103", topic: "ちょうかい", status: "active",  questions: 0 },
    { id: 2, name: "Day 2", date: "6/8",  dow: "Mon", targetPages: "94-95",  topic: "ことば",   status: "pending", questions: 0 },
    { id: 3, name: "Day 3", date: "6/9",  dow: "Tue", targetPages: "96-97",  topic: "ことば",   status: "pending", questions: 0 },
    { id: 4, name: "Day 4", date: "6/10", dow: "Wed", targetPages: "98-99",  topic: "ことば",   status: "pending", questions: 0 },
    { id: 5, name: "Day 5", date: "6/11", dow: "Thu", targetPages: "100-101",topic: "ことば",   status: "pending", questions: 0 },
  ],
  12: [
    { id: 1, name: "Day 1", date: "6/12", dow: "Fri", targetPages: "104-109", topic: "ちょうかい", status: "active",  questions: 0 },
    { id: 2, name: "Day 2", date: "6/15", dow: "Mon", targetPages: "110-112", topic: "ちょうかい", status: "pending", questions: 0 },
    { id: 3, name: "Day 3", date: "6/16", dow: "Tue", targetPages: "102-103", topic: "ことば",   status: "pending", questions: 0 },
    { id: 4, name: "Day 4", date: "6/17", dow: "Wed", targetPages: "104-105", topic: "ことば",   status: "pending", questions: 0 },
    { id: 5, name: "Day 5", date: "6/18", dow: "Thu", targetPages: "106-108", topic: "ことば",   status: "pending", questions: 0 },
  ],
  13: [
    { id: 1, name: "Day 1", date: "6/19", dow: "Fri", targetPages: "—",  topic: "ことば",  status: "active",  questions: 0 },
    { id: 2, name: "Day 2", date: "6/22", dow: "Mon", targetPages: "—",  topic: "—",      status: "pending", questions: 0 },
    { id: 3, name: "Day 3", date: "6/23", dow: "Tue", targetPages: "—",  topic: "—",      status: "pending", questions: 0 },
    { id: 4, name: "Day 4", date: "6/24", dow: "Wed", targetPages: "—",  topic: "—",      status: "pending", questions: 0 },
    { id: 5, name: "Day 5", date: "6/25", dow: "Thu", targetPages: "—",  topic: "—",      status: "pending", questions: 0 },
  ],
  14: [
    { id: 1, name: "Day 1", date: "6/26", dow: "Fri", targetPages: "—",  topic: "—",  status: "active",  questions: 0 },
    { id: 2, name: "Day 2", date: "6/29", dow: "Mon", targetPages: "—",  topic: "—",  status: "pending", questions: 0 },
    { id: 3, name: "Day 3", date: "6/30", dow: "Tue", targetPages: "—",  topic: "—",  status: "pending", questions: 0 },
    { id: 4, name: "Day 4", date: "7/1",  dow: "Wed", targetPages: "—",  topic: "—",  status: "pending", questions: 0 },
    { id: 5, name: "Day 5", date: "7/2",  dow: "Thu", targetPages: "—",  topic: "—",  status: "pending", questions: 0 },
  ],
  15: [
    { id: 1, name: "Day 1", date: "7/3",  dow: "Fri", targetPages: "—",  topic: "—",  status: "active",  questions: 0 },
  ],
};

export default function WeekDetail() {
  const { weekId } = useParams();
  const id = Number(weekId);
  const days = DAYS_BY_WEEK[id] ?? [];

  // Derive date range for subtitle
  const firstDate = days[0]?.date ?? "";
  const lastDate  = days[days.length - 1]?.date ?? "";
  const dateRange = firstDate === lastDate ? firstDate : `${firstDate} - ${lastDate}`;

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
            {dateRange} • Manage daily content
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map((day) => (
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
              <div>
                <h3 className="text-xl font-bold text-slate-900">{day.name}</h3>
                <span className="text-xs text-slate-400 font-medium">
                  {day.date} ({day.dow})
                </span>
              </div>
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
                <FileText className="w-4 h-4 shrink-0" />
                <span className="font-medium">
                  {day.targetPages !== "—" ? `Pages ${day.targetPages}` : "Pages TBD"}
                </span>
              </div>
              {day.topic && day.topic !== "—" && (
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                  {day.topic}
                </div>
              )}

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