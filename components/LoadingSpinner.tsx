import React from 'react';

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
    </div>
);

export default LoadingSpinner;
