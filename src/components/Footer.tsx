import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <div
      className='text-xs min-w-full h-12 flex justify-evenly items-center border-t'
      style={{ boxShadow: '0 -2px 3px rgba(0, 0, 0, 0.1)' }}>
      <Link to='/'>First item</Link>
      <Link to='/'>Second item</Link>
      <Link to='/'>Third item</Link>
    </div>
  );
};
