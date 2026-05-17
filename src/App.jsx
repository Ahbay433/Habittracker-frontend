import { Routes, Route, Navigate } from 'react-router-dom';
import { HabitProvider } from './contexts/HabitContext';
import HeroSection from './components/HeroSection';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

const Private = ({ children }) => {
  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <Private>
            <HabitProvider>
              <Layout />
            </HabitProvider>
          </Private>
        }
      >
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}