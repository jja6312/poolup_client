import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Page404 from '../pages/404';
import DashBoardPage from '../pages/dashboard';
import GamePage from '../pages/game';
import ExamPage from '../pages/exam';
import RedirectPage from '../pages/redirect';
import SignInPage from '../pages/signIn';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/redirect" element={<RedirectPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
