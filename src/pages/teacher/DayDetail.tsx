import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Sparkles,
  FileImage,
  Trash2,
  Edit2,
  Plus,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const MOCK_QUESTIONS = [
  {
    id: 1,
    text: '「食べる」の丁寧語は何ですか？ (What is the polite form of "taberu"?)',
    type: "grammar",
    difficulty: "easy",
    page: 6,
    options: ["食べます", "食べて", "食べた", "食べない"],
    answer: "A",
  },
  {
    id: 2,
    text: 'Choose the correct kanji for "water":',
    type: "vocab",
    difficulty: "easy",
    page: 6,
    options: ["火", "水", "木", "金"],
    answer: "B",
  },
  {
    id: 3,
    text: "JLPT N4: 私は毎日日本語を＿＿＿。",
    type: "jlpt_n4",
    difficulty: "medium",
    page: 7,
    options: ["勉強します", "勉強して", "勉強した", "勉強しない"],
    answer: "A",
  },
];

export default function DayDetail() {
  const { weekId, dayId } = useParams();
  const [files, setFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setQuestions(MOCK_QUESTIONS);
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to={`/teacher/week/${weekId}`}
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Day {dayId}
            </h1>
            <p className="text-slate-500 mt-1">
              Pages 6-8 • Content Generation
            </p>
          </div>
        </div>
        {questions.length > 0 && (
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-sm transition-colors">
            <CheckCircle2 className="w-5 h-5" />
            Save to Bank
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              1. Upload Pages
            </h2>

            <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-indigo-400 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-slate-700">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-slate-500 mt-1">
                JPG, PNG, PDF (max 10MB)
              </span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleUpload}
              />
            </label>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileImage className="w-5 h-5 text-indigo-500 shrink-0" />
                      <span className="text-sm text-slate-700 truncate">
                        {f.name}
                      </span>
                    </div>
                    <button className="text-slate-400 hover:text-red-500 p-1 rounded-md">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              2. Generate AI Questions
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              Gemini will scan the uploaded pages and generate standard MCQs,
              vocabulary questions, and JLPT N4 format questions.
            </p>
            <button
              onClick={handleGenerate}
              disabled={files.length === 0 || isGenerating}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                files.length === 0
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : isGenerating
                    ? "bg-indigo-100 text-indigo-600 cursor-wait"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Pages...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate with Gemini
                </>
              )}
            </button>
          </div>
        </div>

        {/* Review Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  3. Review & Edit
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {questions.length > 0
                    ? `Generated ${questions.length} questions`
                    : "Waiting for generation..."}
                </p>
              </div>
              {questions.length > 0 && (
                <button className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Manual
                </button>
              )}
            </div>

            <div className="flex-1 overflow-auto p-0">
              {questions.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                  <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                  <p>
                    Upload pages and click generate to see AI-created questions
                    here.
                  </p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                      <th className="px-6 py-4 font-semibold">Question</th>
                      <th className="px-6 py-4 font-semibold w-24">Type</th>
                      <th className="px-6 py-4 font-semibold w-24">Diff</th>
                      <th className="px-6 py-4 font-semibold w-24 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {questions.map((q) => (
                      <tr
                        key={q.id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900 mb-1">
                            {q.text}
                          </div>
                          <div className="text-xs text-slate-500 flex gap-2">
                            <span className="bg-slate-100 px-2 py-0.5 rounded">
                              Pg {q.page}
                            </span>
                            <span className="text-emerald-600 font-medium">
                              Ans: {q.answer}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide ${
                              q.type === "grammar"
                                ? "bg-blue-100 text-blue-700"
                                : q.type === "vocab"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {q.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide ${
                              q.difficulty === "easy"
                                ? "bg-emerald-100 text-emerald-700"
                                : q.difficulty === "medium"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {q.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
