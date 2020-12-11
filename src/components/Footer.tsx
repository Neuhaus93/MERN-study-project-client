import React from 'react';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <div
      className='bg-white text-xs min-w-full h-12 flex justify-evenly items-center border-t'
      style={{ boxShadow: '0 -2px 3px rgba(0, 0, 0, 0.1)' }}>
      <Copyright />
    </div>
  );
};

const Copyright = () => {
  return (
    <p className='text-gray-500'>
      {'© '} Jewelers Networks {new Date().getFullYear()}
    </p>
  );
};
