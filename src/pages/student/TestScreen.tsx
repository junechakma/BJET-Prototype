import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

const MOCK_QUESTIONS = [
  {
    id: 1,
    text: "「食べる」の丁寧語は何ですか？",
    type: "grammar",
    options: ["食べます", "食べて", "食べた", "食べない"],
    answer: "A",
    explanation: 'The polite form (-masu form) of "taberu" is "tabemasu".',
  },
  {
    id: 2,
    text: 'Choose the correct kanji for "water":',
    type: "vocab",
    options: ["火", "水", "木", "金"],
    answer: "B",
    explanation: "水 is the kanji for water (mizu).",
  },
  {
    id: 3,
    text: "JLPT N4: 私は毎日日本語を＿＿＿。",
    type: "jlpt_n4",
    options: ["勉強します", "勉強して", "勉強した", "勉強しない"],
    answer: "A",
    explanation:
      'The sentence means "I study Japanese every day". "Mainichi" implies a habitual action, so present polite form is appropriate.',
  },
];

export default function TestScreen() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsAnswered(true);
    const correct =
      selectedOption ===
      MOCK_QUESTIONS[currentQuestion].options[
        ["A", "B", "C", "D"].indexOf(MOCK_QUESTIONS[currentQuestion].answer)
      ];
    if (correct) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    if (currentQuestion < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      navigate("/student/test/results", {
        state: { score, total: MOCK_QUESTIONS.length, time: 600 - timeLeft },
      });
    }
  };

  const question = MOCK_QUESTIONS[currentQuestion];
  const isCorrect =
    selectedOption ===
    question.options[["A", "B", "C", "D"].indexOf(question.answer)];

  return (
    <div className="p-4 bg-slate-50 min-h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
          <Clock className="w-4 h-4" />
          {formatTime(timeLeft)}
        </div>
        <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase">
          {question.type}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
          <span>
            Question {currentQuestion + 1} of {MOCK_QUESTIONS.length}
          </span>
          <span>
            {Math.round(((currentQuestion + 1) / MOCK_QUESTIONS.length) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((currentQuestion + 1) / MOCK_QUESTIONS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-6 flex-1 flex flex-col">
        <h2 className="text-xl font-bold text-slate-900 mb-8 leading-relaxed">
          {question.text}
        </h2>

        <div className="space-y-3 mt-auto">
          {question.options.map((opt, idx) => {
            const letter = ["A", "B", "C", "D"][idx];
            const isSelected = selectedOption === opt;
            const isCorrectOption = letter === question.answer;

            let buttonClass =
              "w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 font-medium ";

            if (!isAnswered) {
              buttonClass += isSelected
                ? "border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm"
                : "border-slate-100 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100";
            } else {
              if (isCorrectOption) {
                buttonClass +=
                  "border-emerald-500 bg-emerald-50 text-emerald-900";
              } else if (isSelected && !isCorrectOption) {
                buttonClass += "border-red-500 bg-red-50 text-red-900";
              } else {
                buttonClass +=
                  "border-slate-100 bg-slate-50 text-slate-400 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(opt)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                    !isAnswered && isSelected
                      ? "bg-indigo-600 text-white"
                      : isAnswered && isCorrectOption
                        ? "bg-emerald-500 text-white"
                        : isAnswered && isSelected && !isCorrectOption
                          ? "bg-red-500 text-white"
                          : "bg-white border border-slate-200 text-slate-500"
                  }`}
                >
                  {letter}
                </div>
                <span className="flex-1">{opt}</span>
                {isAnswered && isCorrectOption && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                )}
                {isAnswered && isSelected && !isCorrectOption && (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback & Actions */}
      <div className="h-32">
        {isAnswered ? (
          <div
            className={`p-4 rounded-2xl border ${isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
              )}
              <div>
                <h4
                  className={`font-bold ${isCorrect ? "text-emerald-900" : "text-red-900"}`}
                >
                  {isCorrect ? "Correct!" : "Incorrect"}
                </h4>
                <p
                  className={`text-sm mt-1 ${isCorrect ? "text-emerald-700" : "text-red-700"}`}
                >
                  {question.explanation}
                </p>
              </div>
            </div>
            <button
              onClick={handleNext}
              className={`w-full mt-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                isCorrect
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {currentQuestion < MOCK_QUESTIONS.length - 1
                ? "Next Question"
                : "Finish Test"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={`w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-lg transition-all ${
              selectedOption
                ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 shadow-indigo-200"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            Check Answer
          </button>
        )}
      </div>
    </div>
  );
}
