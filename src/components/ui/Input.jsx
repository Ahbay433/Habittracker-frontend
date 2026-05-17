import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  icon,
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full rounded-lg border bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 ${
            icon ? 'pl-10' : ''
          } ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-600'}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;