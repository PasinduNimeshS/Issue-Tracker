import React from 'react';
import { 
  FaCircle, 
  FaExclamationCircle, 
  FaSpinner, 
  FaCheckCircle, 
  FaTimesCircle 
} from 'react-icons/fa';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';           // optional size control
  className?: string;                  // allow custom classes
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  // Status → config mapping (easy to extend later)
  const statusConfig = {
    Open: {
      bg: 'bg-red-500/90',
      text: 'text-white',
      icon: <FaExclamationCircle className="animate-pulse" />,
      border: 'border-red-400/50',
      hover: 'hover:bg-red-600 hover:scale-105 hover:shadow-red-500/30',
      tooltip: 'Open – requires attention',
    },
    'In Progress': {
      bg: 'bg-amber-500/90',
      text: 'text-white',
      icon: <FaSpinner className="animate-spin" />,
      border: 'border-amber-400/50',
      hover: 'hover:bg-amber-600 hover:scale-105 hover:shadow-amber-500/30',
      tooltip: 'In Progress – being worked on',
    },
    Resolved: {
      bg: 'bg-emerald-500/90',
      text: 'text-white',
      icon: <FaCheckCircle />,
      border: 'border-emerald-400/50',
      hover: 'hover:bg-emerald-600 hover:scale-105 hover:shadow-emerald-500/30',
      tooltip: 'Resolved – issue fixed',
    },
    Closed: {
      bg: 'bg-gray-600/90',
      text: 'text-white',
      icon: <FaTimesCircle />,
      border: 'border-gray-500/50',
      hover: 'hover:bg-gray-700 hover:scale-105 hover:shadow-gray-500/30',
      tooltip: 'Closed – completed and archived',
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || {
    bg: 'bg-blue-500/90',
    text: 'text-white',
    icon: <FaCircle />,
    border: 'border-blue-400/50',
    hover: 'hover:bg-blue-600 hover:scale-105 hover:shadow-blue-500/30',
    tooltip: status || 'Unknown status',
  };

  // Size variants
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        font-medium tracking-tight
        rounded-full border backdrop-blur-sm
        transition-all duration-300 ease-in-out
        shadow-sm hover:shadow-lg
        ${sizeStyles[size]}
        ${config.bg}
        ${config.text}
        ${config.border}
        ${config.hover}
        ${className}
      `}
      title={config.tooltip} // native tooltip
      role="status"
    >
      <span className="text-base opacity-90">{config.icon}</span>
      <span className="capitalize">{status}</span>
    </span>
  );
};

export default StatusBadge;