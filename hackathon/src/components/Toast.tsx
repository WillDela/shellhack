import { type FC, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  show: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: FC<ToastProps> = ({
  message,
  type,
  show,
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const variant = type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info';
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        maxWidth: '400px',
        animation: 'slideInRight 0.3s ease'
      }}
    >
      <Alert variant={variant} className="d-flex align-items-center shadow" style={{borderRadius: '12px'}}>
        <span className="me-2" style={{fontSize: '1.2rem'}}>{icon}</span>
        <div>{message}</div>
      </Alert>
    </div>
  );
};

export default Toast;