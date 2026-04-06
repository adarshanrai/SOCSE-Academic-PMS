import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#fff',
          color: '#1e293b',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
          fontSize: '14px',
          fontWeight: '500',
          padding: '12px 16px',
          maxWidth: '380px',
        },
        success: {
          iconTheme: { primary: '#059669', secondary: '#fff' },
          style: { borderLeft: '4px solid #059669' },
        },
        error: {
          iconTheme: { primary: '#dc2626', secondary: '#fff' },
          style: { borderLeft: '4px solid #dc2626' },
        },
      }}
    />
  );
}
