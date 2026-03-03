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
  X
} from "lucide-react";

const INITIAL_QUESTIONS = [
  {
    id: 1,
    text: '「食べる」の丁寧語は何ですか？',
    type: 'grammar',
    difficulty: 'easy',
    page: 6,
    options: ['食べます', '食べて', '食べた', '食べない'],
    answer: 'A',
    tags: ['grammar', 'verbs'],
    explanation: 'The polite form (-masu form) of "taberu" is "tabemasu".'
  },
  {
    id: 2,
    text: 'Choose the correct kanji for "water":',
    type: 'vocab',
    difficulty: 'easy',
    page: 6,
    options: ['火', '水', '木', '金'],
    answer: 'B',
    tags: ['vocab', 'kanji'],
    explanation: '水 is the kanji for water (mizu).'
  },
  {
    id: 3,
    text: 'JLPT N4: 私は毎日日本語を＿＿＿。',
    type: 'jlpt_n4',
    difficulty: 'medium',
    page: 7,
    options: ['勉強します', '勉強して', '勉強した', '勉強しない'],
    answer: 'A',
    tags: ['jlpt', 'grammar', 'particles'],
    explanation: 'The sentence means "I study Japanese every day". "Mainichi" implies a habitual action, so present polite form is appropriate.'
  },
  {
    id: 4,
    text: 'この文章のメインテーマは何ですか？',
    type: 'comprehension',
    difficulty: 'hard',
    page: 8,
    options: ['日本の文化', '東京の天気', '新しい技術', '古い歴史'],
    answer: 'C',
    tags: ['reading', 'comprehension'],
    explanation: 'The passage discusses recent technological advancements in Tokyo.'
  }
];

export default function DayDetail() {
  const { weekId, dayId } = useParams();
  const [files, setFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<any[]>(INITIAL_QUESTIONS);
  const [editingQuestion, setEditingQuestion] = useState<any | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // In a real app, this would append new generated questions
      setIsGenerating(false);
    }, 2500);
  };

  const handleDelete = (id: number) => {
    setQuestions(q => q.filter(x => x.id !== id));
  };

  const handleEdit = (q: any) => {
    setEditingQuestion({ ...q, tagsString: q.tags.join(', ') });
  };

  const handleSaveEdit = () => {
    if (!editingQuestion) return;
    
    const updatedTags = editingQuestion.tagsString.split(',').map((t: string) => t.trim()).filter(Boolean);
    const updatedQuestion = { ...editingQuestion, tags: updatedTags };
    delete updatedQuestion.tagsString;

    if (editingQuestion.isNew) {
      delete updatedQuestion.isNew;
      setQuestions([...questions, { ...updatedQuestion, id: Date.now() }]);
    } else {
      setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
    }
    setEditingQuestion(null);
  };

  const handleAddManual = () => {
    setEditingQuestion({
      isNew: true,
      text: '',
      type: 'grammar',
      difficulty: 'medium',
      page: 6,
      options: ['', '', '', ''],
      answer: 'A',
      tagsString: '',
      explanation: ''
    });
  };

  return (
    <div className="space-y-8 pb-12">
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
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[600px]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  3. Review & Edit
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {questions.length} questions ready for review
                </p>
              </div>
              <button 
                onClick={handleAddManual}
                className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Manual
              </button>
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
                      <th className="px-6 py-4 font-semibold">Question Details</th>
                      <th className="px-6 py-4 font-semibold w-28">Type</th>
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
                          <div className="font-bold text-slate-900 mb-2">
                            {q.text}
                          </div>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {q.tags.map((tag: string) => (
                              <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-600 rounded-md">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-3">
                            <span className="bg-slate-100 px-2 py-1 rounded font-medium">
                              Page {q.page}
                            </span>
                            <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">
                              Answer: {q.answer}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <span
                            className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide ${
                              q.type === "grammar"
                                ? "bg-blue-100 text-blue-700"
                                : q.type === "vocab"
                                  ? "bg-amber-100 text-amber-700"
                                  : q.type === "jlpt_n4"
                                    ? "bg-indigo-100 text-indigo-700"
                                    : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {q.type.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <span
                            className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide ${
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
                        <td className="px-6 py-4 text-right align-top">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleEdit(q)}
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(q.id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
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

      {/* Edit Modal */}
      {editingQuestion && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-900">
                {editingQuestion.isNew ? 'Add Manual Question' : 'Edit Question'}
              </h2>
              <button onClick={() => setEditingQuestion(null)} className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-200 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              <div className="grid grid-cols-1 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Question</label>
                  <input 
                    type="text" 
                    value={editingQuestion.text}
                    onChange={e => setEditingQuestion({...editingQuestion, text: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" 
                  />
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Options</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['A', 'B', 'C', 'D'].map((letter, idx) => (
                    <div key={letter} className="flex items-center gap-2">
                      <span className="font-bold text-slate-400 w-4">{letter}</span>
                      <input 
                        type="text" 
                        value={editingQuestion.options[idx]}
                        onChange={e => {
                          const newOptions = [...editingQuestion.options];
                          newOptions[idx] = e.target.value;
                          setEditingQuestion({...editingQuestion, options: newOptions});
                        }}
                        className="flex-1 border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Correct Answer</label>
                  <select 
                    value={editingQuestion.answer}
                    onChange={e => setEditingQuestion({...editingQuestion, answer: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Type</label>
                  <select 
                    value={editingQuestion.type}
                    onChange={e => setEditingQuestion({...editingQuestion, type: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  >
                    <option value="grammar">Grammar</option>
                    <option value="vocab">Vocabulary</option>
                    <option value="jlpt_n4">JLPT N4</option>
                    <option value="comprehension">Comprehension</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Difficulty</label>
                  <select 
                    value={editingQuestion.difficulty}
                    onChange={e => setEditingQuestion({...editingQuestion, difficulty: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Tags (comma separated)</label>
                  <input 
                    type="text" 
                    value={editingQuestion.tagsString}
                    onChange={e => setEditingQuestion({...editingQuestion, tagsString: e.target.value})}
                    placeholder="grammar, verbs, jlpt"
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Source Page</label>
                  <input 
                    type="number" 
                    value={editingQuestion.page}
                    onChange={e => setEditingQuestion({...editingQuestion, page: parseInt(e.target.value) || 1})}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Explanation</label>
                <textarea 
                  value={editingQuestion.explanation}
                  onChange={e => setEditingQuestion({...editingQuestion, explanation: e.target.value})}
                  placeholder="Why is this answer correct?"
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none" 
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setEditingQuestion(null)}
                className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveEdit}
                className="px-6 py-2.5 bg-indigo-600 text-white font-bold hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
              >
                Save Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
