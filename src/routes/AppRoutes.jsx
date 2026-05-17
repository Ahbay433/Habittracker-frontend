import { Routes, Route, Navigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import Layout from '../components/layout/Layout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}