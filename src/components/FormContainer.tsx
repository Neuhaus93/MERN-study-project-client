import React from 'react';

export const FormContainer: React.FC<{ title: string }> = ({
  title,
  children,
}) => (
  <div className='border bg-white w-full mx-2 py-8 rounded-md sm:py-10 lg:py-8 px-2 sm:px-4 md:px-8 lg:px-16 sm:rounded-3xl shadow-sm'>
    <h2 className='text-center text-2xl mb-6 font-semibold'>{title}</h2>
    {children}
  </div>
);
