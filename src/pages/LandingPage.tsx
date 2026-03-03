import { Link } from "react-router-dom";
import { BookOpen, GraduationCap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          B-JET AI Learning Platform
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          A comprehensive AI-powered learning platform for Japanese language
          students and teachers.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Link
          to="/teacher"
          className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-300 transition-all duration-200 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Teacher Portal
          </h2>
          <p className="text-slate-500">
            Manage weeks, upload pages, generate AI questions, and monitor
            student progress.
          </p>
        </Link>

        <Link
          to="/student"
          className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Student App
          </h2>
          <p className="text-slate-500">
            Take daily tests, track progress, earn XP, and compete on the
            leaderboard.
          </p>
        </Link>
      </div>
    </div>
  );
}
