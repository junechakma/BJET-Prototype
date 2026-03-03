import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  HelpCircle,
  Rocket,
  CheckSquare,
  Square,
} from "lucide-react";

export default function StartTest() {
  const { dayId } = useParams();
  const navigate = useNavigate();
  const [pages, setPages] = useState(2);
  const [questions, setQuestions] = useState(30);
  const [types, setTypes] = useState({
    mixed: true,
    jlpt: false,
    vocab: false,
  });

  const toggleType = (type: keyof typeof types) => {
    setTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="p-4 space-y-6 bg-slate-50 min-h-full flex flex-col">
      <div className="flex items-center gap-4">
        <Link
          to="/student"
          className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-500"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Day {dayId} Test
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Pages 5, 6, 7 assigned
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        {/* Pages Slider */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Pages Read Today</h3>
              <p className="text-sm text-slate-500 font-medium">
                How much did you cover?
              </p>
            </div>
          </div>

          <div className="px-2">
            <input
              type="range"
              min="1"
              max="3"
              value={pages}
              onChange={(e) => setPages(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs font-bold text-slate-400 mt-2">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
            <div className="text-center mt-4">
              <span className="text-3xl font-black text-indigo-600">
                {pages}
              </span>
              <span className="text-slate-500 font-medium ml-1">pages</span>
            </div>
          </div>
        </div>

        {/* Questions Slider */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Number of Questions</h3>
              <p className="text-sm text-slate-500 font-medium">
                Set your challenge
              </p>
            </div>
          </div>

          <div className="px-2">
            <input
              type="range"
              min="10"
              max="45"
              step="5"
              value={questions}
              onChange={(e) => setQuestions(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-xs font-bold text-slate-400 mt-2">
              <span>10</span>
              <span>45</span>
            </div>
            <div className="text-center mt-4">
              <span className="text-3xl font-black text-emerald-600">
                {questions}
              </span>
              <span className="text-slate-500 font-medium ml-1">questions</span>
            </div>
          </div>
        </div>

        {/* Question Types */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4">Question Types</h3>
          <div className="space-y-3">
            {[
              { id: "mixed", label: "Mixed (Recommended)" },
              { id: "jlpt", label: "JLPT N4 Focus" },
              { id: "vocab", label: "Vocabulary Only" },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => toggleType(type.id as keyof typeof types)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                  types[type.id as keyof typeof types]
                    ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                    : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-300"
                }`}
              >
                {types[type.id as keyof typeof types] ? (
                  <CheckSquare className="w-5 h-5 text-indigo-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
                <span className="font-bold">{type.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/student/test/active")}
        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 mt-auto"
      >
        <Rocket className="w-6 h-6" />
        START TEST
      </button>
    </div>
  );
}
