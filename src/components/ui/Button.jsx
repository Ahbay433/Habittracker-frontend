import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}, ref) => {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';
  
  const variants = {
    primary: 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-[0.98]',
    secondary: 'bg-slate-700 text-slate-200 hover:bg-slate-600 active:scale-[0.98]',
    ghost: 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-800',
    danger: 'bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300',
    outline: 'border-2 border-slate-600 text-slate-300 hover:border-emerald-500 hover:text-emerald-400',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };

  return (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;