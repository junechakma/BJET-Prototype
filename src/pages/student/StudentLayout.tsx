import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Trophy, User, LogOut } from "lucide-react";

export default function StudentLayout() {
  const location = useLocation();

  const navItems = [
    { path: "/student", icon: Home, label: "Home" },
    { path: "/student/leaderboard", icon: Trophy, label: "Leaderboard" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      {/* Mobile Container Simulation */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-indigo-600 text-white p-4 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
              R
            </div>
            <div>
              <h1 className="font-bold leading-tight">Rafi Ahmed</h1>
              <p className="text-xs text-indigo-200 flex items-center gap-1">
                <span className="text-orange-300">🔥</span> 5 Day Streak
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-indigo-800/50 px-3 py-1 rounded-full text-sm font-bold border border-indigo-400/30 shadow-inner">
              <span className="text-amber-300">⭐</span> 1240 XP
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 pb-20">
          <Outlet />
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 pb-safe z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-indigo-600 scale-110"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Icon
                  className={`w-6 h-6 mb-1 ${isActive ? "fill-indigo-100" : ""}`}
                />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {item.label}
                </span>
              </Link>
            );
          })}
          <Link
            to="/"
            className="flex flex-col items-center p-2 rounded-xl text-slate-400 hover:text-red-500 transition-all duration-200"
          >
            <LogOut className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Exit
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
