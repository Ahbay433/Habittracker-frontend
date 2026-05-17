import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import api from '../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password });
      nav('/login');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Create account</h2>
        {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            required
          />
        </div>
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-500 py-2.5 font-semibold text-white transition-colors hover:bg-emerald-600 active:scale-[0.98]"
        >
          Get Started
        </button>
        <p className="mt-4 text-center text-sm text-slate-600">
          Have an account? <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500 hover:underline">Sign In</Link>
        </p>
      </form>
    </div>
  );
}