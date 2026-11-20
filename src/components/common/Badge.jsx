import React from 'react';

export const Badge = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'neutral'
  icon: Icon,
  className = '',
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
};

export default Badge;
