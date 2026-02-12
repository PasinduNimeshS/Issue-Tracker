import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from './store/index';
import Navbar from './components/Navbar.tsx';
import LandingPage from './pages/LandingPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import IssuesPage from './pages/IssuesPage.tsx';
import CreateIssuePage from './pages/CreateIssuePage.tsx';
import EditIssuePage from './pages/EditIssuePage.tsx';
import IssueDetailPage from './pages/IssueDetailPage.tsx';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <IssuesPage /> : <Navigate to="/login" />} />
        <Route path="/issues/create" element={isAuthenticated ? <CreateIssuePage /> : <Navigate to="/login" />} />
        <Route path="/issues/:id/edit" element={isAuthenticated ? <EditIssuePage /> : <Navigate to="/login" />} />
        <Route path="/issues/:id" element={isAuthenticated ? <IssueDetailPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;