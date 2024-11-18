import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div role="status">
      <div aria-hidden="true" className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-slate-600 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
