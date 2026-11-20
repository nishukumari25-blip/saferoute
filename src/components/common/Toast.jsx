import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} color="#10B981" />;
      case 'error':
        return <AlertCircle size={18} color="#EF4444" />;
      case 'warning':
        return <AlertTriangle size={18} color="#F59E0B" />;
      case 'info':
      default:
        return <Info size={18} color="#6C4CE3" />;
    }
  };

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <div style={{ marginTop: '2px', flexShrink: 0 }}>{getIcon(toast.type)}</div>
          <div style={{ flex: 1, fontSize: '0.9rem', lineHeight: '1.4' }}>{toast.message}</div>
          <button
            onClick={() => removeToast(toast.id)}
            style={{ color: '#94A3B8', padding: '2px', cursor: 'pointer' }}
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
