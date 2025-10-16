import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card = ({
  children,
  className = '',
  padding = 'md',
  hover = false
}: CardProps) => {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  };

  const hoverStyles = hover
    ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
    : '';

  return (
    <div
      className={`
        bg-white dark:bg-gray-800
        rounded-2xl shadow-lg
        border border-gray-100 dark:border-gray-700
        transition-all duration-300
        ${paddingStyles[padding]}
        ${hoverStyles}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
