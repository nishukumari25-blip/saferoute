import React from 'react';
import Button from './Button';

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionIcon,
}) => {
  return (
    <div className="empty-state">
      {Icon && (
        <div className="empty-icon-box">
          <Icon size={32} />
        </div>
      )}
      <h4 className="empty-title">{title}</h4>
      {description && <p className="empty-description">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" icon={actionIcon} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
