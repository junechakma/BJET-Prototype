import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TeacherLayout from "./pages/teacher/TeacherLayout";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import WeekDetail from "./pages/teacher/WeekDetail";
import DayDetail from "./pages/teacher/DayDetail";
import StudentMonitoring from "./pages/teacher/StudentMonitoring";
import StudentLayout from "./pages/student/StudentLayout";
import StudentHome from "./pages/student/StudentHome";
import StartTest from "./pages/student/StartTest";
import TestScreen from "./pages/student/TestScreen";
import TestResults from "./pages/student/TestResults";
import Leaderboard from "./pages/student/Leaderboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="week/:weekId" element={<WeekDetail />} />
          <Route path="week/:weekId/day/:dayId" element={<DayDetail />} />
          <Route path="monitoring" element={<StudentMonitoring />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentHome />} />
          <Route path="test/start/:dayId" element={<StartTest />} />
          <Route path="test/active" element={<TestScreen />} />
          <Route path="test/results" element={<TestResults />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
