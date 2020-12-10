import { ErrorMessage, Field } from 'formik';
import React from 'react';

interface FormFieldProps {
  field: string;
  label: string;
  placeholder?: string;
  type?: string;
}

export const FormTextField: React.FC<FormFieldProps> = (props) => {
  const { field, label, placeholder, type } = props;

  return (
    <div className='mb-4'>
      <label
        className='block mb-2 text-sm font-bold text-gray-700'
        htmlFor={field}>
        {label}
      </label>
      <Field
        className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:ring focus:border-blue-300'
        id={field}
        type={type}
        name={field}
        placeholder={placeholder}
      />
      <ErrorMessage
        className='text-xs text-red-600 pt-1 pl-1'
        name={field}
        component='div'
      />
    </div>
  );
};
