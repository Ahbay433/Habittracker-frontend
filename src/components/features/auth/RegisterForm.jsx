import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

export default function RegisterForm() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      nav('/login');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Create account</h2>
      
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="John Doe"
        required
        className="mb-4"
      />

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        className="mb-4"
      />

      <div className="mb-6">
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating account...' : 'Get Started'}
      </Button>

      <p className="mt-4 text-center text-sm text-slate-600">
        Have an account?{' '}
        <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500 hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
}