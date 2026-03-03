import { Trophy, Medal, Crown, Star, TrendingUp } from "lucide-react";

const LEADERBOARD = [
  {
    rank: 1,
    name: "Rafi Ahmed",
    score: 91,
    time: "11m",
    pages: 3,
    xp: 1240,
    streak: 5,
  },
  {
    rank: 2,
    name: "Mim Akter",
    score: 88,
    time: "15m",
    pages: 3,
    xp: 1120,
    streak: 2,
  },
  {
    rank: 3,
    name: "Sakib Hasan",
    score: 83,
    time: "13m",
    pages: 2,
    xp: 950,
    streak: 3,
  },
  {
    rank: 4,
    name: "Karim",
    score: 76,
    time: "18m",
    pages: 2,
    xp: 820,
    streak: 1,
  },
  {
    rank: 5,
    name: "Sara",
    score: 80,
    time: "9m",
    pages: 1,
    xp: 600,
    streak: 4,
  },
];

export default function Leaderboard() {
  return (
    <div className="p-4 space-y-6 bg-slate-50 min-h-full pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner backdrop-blur-sm">
            <Trophy className="w-8 h-8 text-amber-300" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">
              Daily Champions
            </h1>
            <p className="text-indigo-200 font-medium mt-1 flex items-center gap-1.5">
              <Star className="w-4 h-4" /> Day 3 Leaderboard
            </p>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end gap-4 h-48 mt-8 mb-12">
        {/* 2nd Place */}
        <div className="flex flex-col items-center w-1/3">
          <div className="w-12 h-12 bg-slate-200 rounded-full border-4 border-white shadow-md flex items-center justify-center font-bold text-slate-600 mb-2 relative">
            M
            <div className="absolute -bottom-2 -right-2 bg-slate-300 text-slate-700 text-xs font-black px-1.5 py-0.5 rounded-md">
              2
            </div>
          </div>
          <div className="text-sm font-bold text-slate-900 truncate w-full text-center">
            Mim
          </div>
          <div className="text-xs font-medium text-slate-500 mb-2">1120 XP</div>
          <div className="w-full h-24 bg-gradient-to-t from-slate-200 to-slate-100 rounded-t-xl border-x border-t border-slate-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] opacity-20" />
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center w-1/3 z-10">
          <Crown className="w-8 h-8 text-amber-400 mb-1 drop-shadow-sm" />
          <div className="w-16 h-16 bg-amber-100 rounded-full border-4 border-white shadow-lg flex items-center justify-center font-bold text-amber-600 text-xl mb-2 relative">
            R
            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-white text-xs font-black px-1.5 py-0.5 rounded-md">
              1
            </div>
          </div>
          <div className="text-sm font-black text-slate-900 truncate w-full text-center">
            Rafi
          </div>
          <div className="text-xs font-bold text-amber-600 mb-2">1240 XP</div>
          <div className="w-full h-32 bg-gradient-to-t from-amber-300 to-amber-200 rounded-t-xl border-x border-t border-amber-400 relative overflow-hidden shadow-[0_-10px_20px_rgba(251,191,36,0.2)]">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] opacity-20" />
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center w-1/3">
          <div className="w-12 h-12 bg-orange-100 rounded-full border-4 border-white shadow-md flex items-center justify-center font-bold text-orange-600 mb-2 relative">
            S
            <div className="absolute -bottom-2 -right-2 bg-orange-300 text-orange-800 text-xs font-black px-1.5 py-0.5 rounded-md">
              3
            </div>
          </div>
          <div className="text-sm font-bold text-slate-900 truncate w-full text-center">
            Sakib
          </div>
          <div className="text-xs font-medium text-slate-500 mb-2">950 XP</div>
          <div className="w-full h-20 bg-gradient-to-t from-orange-200 to-orange-100 rounded-t-xl border-x border-t border-orange-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] opacity-20" />
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            Full Rankings
          </h3>
          <span className="text-xs font-medium text-slate-500">
            Updates at 11 PM
          </span>
        </div>
        <div className="divide-y divide-slate-100">
          {LEADERBOARD.map((user, idx) => (
            <div
              key={idx}
              className={`p-4 flex items-center gap-4 transition-colors ${user.rank === 1 ? "bg-amber-50/30" : "hover:bg-slate-50"}`}
            >
              <div
                className={`w-8 font-black text-center ${
                  user.rank === 1
                    ? "text-amber-500 text-lg"
                    : user.rank === 2
                      ? "text-slate-400 text-lg"
                      : user.rank === 3
                        ? "text-orange-400 text-lg"
                        : "text-slate-300 text-sm"
                }`}
              >
                {user.rank}
              </div>

              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 shrink-0">
                {user.name.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 truncate">
                  {user.name}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> {user.score}%
                  </span>
                  <span>{user.pages} pages</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="font-black text-indigo-600">{user.xp}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  XP
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
