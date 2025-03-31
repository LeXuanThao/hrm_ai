import React from 'react';

interface AlertModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="alert-modal">
      <div className="alert-modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="alert-modal-actions">
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
