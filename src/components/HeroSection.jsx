import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Flame, TrendingUp, Zap, CheckCircle2, Calendar, Trophy } from 'lucide-react';

export default function HeroSection() {
  const [count, setCount] = useState(0);
  
  // Animated counter effect
  useEffect(() => {
    const target = 10000;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: Target, title: 'Set Goals', desc: 'Define habits that matter to you' },
    { icon: Flame, title: 'Build Streaks', desc: 'Track consecutive days of success' },
    { icon: TrendingUp, title: 'Visualize Progress', desc: 'Beautiful charts and heatmaps' },
    { icon: Zap, title: 'Stay Motivated', desc: 'Earn streaks and see your growth' },
  ];

  const demoHabits = [
    { name: 'Morning Run', streak: 12, completed: true },
    { name: 'Read 30 mins', streak: 8, completed: true },
    { name: 'Meditate', streak: 5, completed: false },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center gap-2">
          <Trophy className="h-8 w-8 text-emerald-400" />
          <span className="text-xl font-bold text-white">Habit Tracker</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
              <Zap size={16} />
              <span>Free forever. No credit card required.</span>
            </div>
            
            <h1 className="text-4xl font-bold leading-tight text-white lg:text-6xl">
              Build Better Habits,{' '}
              <span className="text-emerald-400">One Day at a Time</span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-lg">
              Track your daily habits, visualize your progress with beautiful heatmaps, 
              and build unstoppable streaks. Join {count.toLocaleString()}+ users transforming their lives.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="group flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-base font-semibold text-white hover:bg-emerald-600 transition-all hover:gap-3"
              >
                Start Your Journey
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-700 transition-colors"
              >
                I Already Have an Account
              </Link>
            </div>
            
            {/* Trust badges */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-xs font-medium text-white"
                  >
                    {['JD', 'AS', 'MK', 'RL'][i - 1]}
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-400">
                <span className="font-semibold text-white">4.9/5</span> from 2,000+ reviews
              </div>
            </div>
          </div>

          {/* Right: Demo Card */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 rounded-3xl bg-emerald-500/20 blur-3xl" />
            
            <div className="relative rounded-2xl bg-slate-800 p-6 shadow-2xl border border-slate-700">
              {/* Mock header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Today's Habits</h3>
                  <p className="text-sm text-slate-400">Sunday, May 17</p>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-lg bg-slate-700" />
                  <div className="h-8 w-20 rounded-lg bg-emerald-500" />
                </div>
              </div>
              
              {/* Mock habits */}
              <div className="space-y-3">
                {demoHabits.map((habit, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-xl p-3 ${
                      habit.completed ? 'bg-emerald-500/10' : 'bg-slate-700/50'
                    }`}
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${
                        habit.completed
                          ? 'border-emerald-500 bg-emerald-500'
                          : 'border-slate-500'
                      }`}
                    >
                      {habit.completed && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${habit.completed ? 'text-slate-400 line-through' : 'text-white'}`}>
                        {habit.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-500">
                      <Flame size={12} />
                      {habit.streak}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mock stats */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-slate-700/50 p-3 text-center">
                  <div className="text-xl font-bold text-emerald-400">67%</div>
                  <div className="text-xs text-slate-400">Done</div>
                </div>
                <div className="rounded-xl bg-slate-700/50 p-3 text-center">
                  <div className="text-xl font-bold text-emerald-400">12</div>
                  <div className="text-xs text-slate-400">Best</div>
                </div>
                <div className="rounded-xl bg-slate-700/50 p-3 text-center">
                  <div className="text-xl font-bold text-emerald-400">24</div>
                  <div className="text-xs text-slate-400">Total</div>
                </div>
              </div>
              
              {/* Mock heatmap */}
              <div className="mt-4 rounded-xl bg-slate-700/30 p-3">
                <div className="mb-2 text-xs text-slate-400">Last 12 weeks</div>
                <div className="grid grid-cols-12 gap-1">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-sm ${
                        Math.random() > 0.6
                          ? 'bg-emerald-500'
                          : Math.random() > 0.3
                          ? 'bg-emerald-500/50'
                          : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Everything You Need to Succeed</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Powerful features designed to help you build lasting habits and achieve your goals.
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group rounded-2xl bg-slate-800 p-6 border border-slate-700 hover:border-emerald-500/50 transition-all hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                <feature.icon size={24} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="rounded-3xl bg-emerald-500/10 border border-emerald-500/20 p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Join thousands of people who use Habit Tracker to build better habits, 
            achieve their goals, and become the best version of themselves.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 text-lg font-semibold text-white hover:bg-emerald-600 transition-colors"
          >
            Get Started Free
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center">
        <p className="text-sm text-slate-500">
          © 2026 Habit Tracker. Built with ❤️ for better habits.
        </p>
      </footer>
    </div>
  );
}