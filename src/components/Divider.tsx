import React from 'react';

interface DividerProps {
  width?: number;
  margin?: string;
}

export const Divider: React.FC<DividerProps> = ({ width, margin }) => {
  return (
    <div
      className='h-px bg-gray-300'
      style={{
        width: width ? `${width}%` : '100%',
        margin: margin || '1.5rem auto',
      }}></div>
  );
};
