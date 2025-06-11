import React from 'react';
import Image from 'next/image';
import outOfStock from '../../assets/out-of-stock.webp';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionButton,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      {/* Icon or Image */}
      <Image src='/out-of-stock.webp' alt='Empty state illustration' width={100} height={100} />

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-gray-500 max-w-sm mb-6">
          {description}
        </p>
      )}

      {/* Action Button */}
      {actionButton && (
        <button
          onClick={actionButton.onClick}
          className="inline-flex items-center px-4 py-2 border border-transparent 
                   text-sm font-medium rounded-md shadow-sm text-white 
                   bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                   focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                   transition-colors duration-200"
        >
          {actionButton.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
