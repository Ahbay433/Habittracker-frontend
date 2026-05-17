import { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md',
  showCloseButton = true,
}) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className={`relative w-full ${sizes[size]} rounded-2xl bg-slate-800 shadow-2xl border border-slate-700 animate-slide-up`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">
            {title && (
              <h3 className="text-lg font-semibold text-white">{title}</h3>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="!p-1"
              >
                <X size={20} />
              </Button>
            )}
          </div>
        )}
        
        {/* Body */}
        <div className="px-6 py-4">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-slate-700 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}