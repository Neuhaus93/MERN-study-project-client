import React from 'react';
import { CgMenuRightAlt } from 'react-icons/cg';

interface CustomButton
  extends Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'className'
  > {
  className?: string;
}

const buttonDefault =
  'text-base font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50';

const buttonCircular =
  'text-base font-semibold p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50';

export const ButtonMobileOpen: React.FC<CustomButton> = ({
  children,
  ...props
}) => (
  <button
    {...props}
    type='button'
    className={`${buttonCircular} sm:hidden bg-blue-500 opacity-90 border fixed bottom-4 right-4`}>
    <CgMenuRightAlt color='#FAFAFA' size={36} />
  </button>
);

export const ButtonBlueLight: React.FC<CustomButton> = ({
  children,
  className: extraClasses,
  ...props
}) => (
  <button
    type='button'
    className={`${buttonDefault} bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 ${extraClasses}`}
    {...props}>
    {children}
  </button>
);

export const ButtonBlueOutline: React.FC<CustomButton> = ({
  children,
  className: extraClasses,
  ...props
}) => (
  <button
    type='button'
    className={`${buttonDefault} bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 border border-blue-300 ${extraClasses}`}
    {...props}>
    {children}
  </button>
);

export const ButtonBlueFilled: React.FC<CustomButton> = ({
  children,
  className: extraClasses,
  ...props
}) => (
  <button
    type='button'
    className={`${buttonDefault} border border-transparent shadow-sm text-white bg-blue-600 hover:bg-blue-700 ${extraClasses}`}
    {...props}>
    {children}
  </button>
);

export const ButtonBlueGhost: React.FC<CustomButton> = ({
  children,
  className: extraClasses,
  ...props
}) => (
  <button
    type='button'
    className={`${buttonDefault} border border-transparent text-blue-700 bg-white hover:text-blue-800 hover:bg-blue-50 ${extraClasses}`}
    {...props}>
    {children}
  </button>
);

export const ButtonRedOutline: React.FC<CustomButton> = ({
  children,
  className: extraClasses,
  ...props
}) => (
  <button
    type='button'
    className={`${buttonDefault} text-red-700 hover:bg-red-50 hover:text-red-800 border border-red-300 ${extraClasses}`}
    {...props}>
    {children}
  </button>
);
