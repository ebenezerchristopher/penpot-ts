import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button = ({
  children,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  const baseStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const variantStyle =
    variant === 'primary'
      ? { backgroundColor: '#007bff', color: 'white' }
      : { backgroundColor: '#6c757d', color: 'white' };

  return (
    <button style={{ ...baseStyle, ...variantStyle }} {...props}>
      {children}
    </button>
  );
};
