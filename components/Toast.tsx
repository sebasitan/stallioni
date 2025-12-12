
import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const SuccessIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
);

const ErrorIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
);

const CloseIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
    </svg>
);


const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in
    const inTimer = setTimeout(() => setIsVisible(true), 10);

    // Start countdown to animate out
    const outTimer = setTimeout(() => {
      setIsVisible(false);
      // Allow time for fade-out before calling onClose to unmount
      setTimeout(onClose, 400); 
    }, 4600); // Total visible time is ~4.5 seconds

    return () => {
      clearTimeout(inTimer);
      clearTimeout(outTimer);
    };
  }, [onClose]);

  const baseClasses = "fixed bottom-8 right-8 z-[100] transition-all duration-300 ease-out";
  const visibilityClasses = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5';
  
  const typeConfig = {
    success: {
      bg: 'bg-green-500',
      icon: <SuccessIcon />,
    },
    error: {
      bg: 'bg-red-500',
      icon: <ErrorIcon />,
    },
  };
  
  const config = typeConfig[type];

  return (
    <div className={`${baseClasses} ${visibilityClasses}`} role="alert" aria-live="assertive">
      <div className={`flex items-center text-white p-4 rounded-lg shadow-2xl ${config.bg}`}>
        <div className="flex-shrink-0">{config.icon}</div>
        <div className="mx-3 text-sm font-medium">{message}</div>
        <button 
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 400);
          }} 
          className="ml-auto -mx-1.5 -my-1.5 bg-white/20 hover:bg-white/30 rounded-lg p-1.5 inline-flex h-8 w-8"
          aria-label="Close"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default Toast;

