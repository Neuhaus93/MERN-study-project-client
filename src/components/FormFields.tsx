import { Listbox, Transition } from '@headlessui/react';
import { ErrorMessage, Field, FieldAttributes } from 'formik';
import React from 'react';
import { IconType } from 'react-icons/lib';
import tw, { styled } from 'twin.macro';

interface FormFieldProps {
  field: string;
  label: string;
  Icon?: IconType;
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
        className='w-full px-3 py-2 leading-tight text-sm text-gray-700 border rounded shadow appearance-none focus:outline-none focus:ring focus:border-blue-300 hover:border-gray-300'
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

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  handleChange: () => void;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  checked,
  handleChange,
}) => {
  return (
    <label className='flex items-center mt-3'>
      <input
        type='checkbox'
        className='form-checkbox h-5 w-4 text-gray-800'
        onChange={handleChange}
        checked={checked}
      />
      <span className='ml-2 text-gray-900'>{label}</span>
    </label>
  );
};

interface SelectFieldProps {
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
  label?: string;
}

export const SelectField: React.FC<SelectFieldProps> = (props) => {
  const { options, selected, setSelected, label } = props;

  return (
    <Listbox
      as='div'
      className='space-y-1'
      value={selected}
      // @ts-expect-error: Let's ignore a single compiler error like this unreachable code
      onChange={setSelected}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className='block text-sm leading-5 font-medium text-gray-700'>
              Assigned to
            </Listbox.Label>
          )}
          <div className='relative'>
            <span className='inline-block w-full rounded-md shadow-sm'>
              <Listbox.Button className='cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5'>
                <span className='block truncate'>{selected}</span>
                <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                  <svg
                    className='h-5 w-5 text-gray-400'
                    viewBox='0 0 20 20'
                    fill='none'
                    stroke='currentColor'>
                    <path
                      d='M7 7l3-3 3 3m0 6l-3 3-3-3'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </span>
              </Listbox.Button>
            </span>

            <Transition
              show={open}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              className='absolute mt-1 w-full rounded-md bg-white shadow-lg'>
              <Listbox.Options
                static
                className='max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5'>
                {options.map((option) => (
                  <Listbox.Option key={option} value={option}>
                    {({ selected, active }) => (
                      <div
                        className={`${
                          active ? 'text-white bg-blue-600' : 'text-gray-900'
                        } cursor-default select-none relative py-2 pl-8 pr-4`}>
                        <span
                          className={`${
                            selected ? 'font-semibold' : 'font-normal'
                          } block truncate`}>
                          {option}
                        </span>
                        {selected && (
                          <span
                            className={`${
                              active ? 'text-white' : 'text-blue-600'
                            } absolute inset-y-0 left-0 flex items-center pl-1.5`}>
                            <svg
                              className='h-5 w-5'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'>
                              <path
                                fillRule='evenodd'
                                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

interface FormikTextInputProps extends FieldAttributes<any> {
  Icon?: IconType;
  pretext?: string;
  pl?: number;
}

export const FormikTextInput: React.FC<FormikTextInputProps> = (props) => {
  const { Icon, pretext, pl, ...fieldAtts } = props;

  return (
    <div className='flex flex-col mb-4'>
      <label
        htmlFor='name'
        className='mb-2 text-sm tracking-wide font-bold text-gray-700'>
        {fieldAtts.label}
      </label>
      <div className='relative'>
        {Icon && (
          <div className='absolute flex border border-transparent left-0 top-0 h-full w-12'>
            <div className='flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full'>
              <Icon />
            </div>
          </div>
        )}

        {pretext && (
          <PreText icon={!!Icon} pl={pl}>
            {pretext}
          </PreText>
        )}

        <StyledTextField
          {...fieldAtts}
          icon={Icon ? 'true' : ''}
          id={fieldAtts.field}
          name={fieldAtts.field}
          pl={pl}
        />
      </div>{' '}
      <ErrorMessage
        className='text-xs font-semibold text-red-400 pt-1 pl-1'
        name={fieldAtts.field}
        component='div'
      />
    </div>
  );
};

const PreText = styled.p<{ icon?: boolean; pl?: number }>`
  ${({ icon }) => (icon ? tw`pl-14` : tw`pl-3`)}
  ${tw`absolute flex items-center left-0 top-0 h-full text-gray-500 z-10`}
`;

/* ${({ pl }) => (pl && )} */
const StyledTextField = styled(Field)`
  ${({ icon }) => (icon ? tw`pl-14` : tw`pl-3`)}
  padding-left: ${({ pl }) => pl && pl / 4 + 'rem'};
  ${tw`text-sm relative w-full border rounded shadow-sm placeholder-gray-400 py-2 pr-3`}
  ${tw`sm:(text-base)`}
  ${tw`focus:(ring-2 outline-none)`}
  ${tw`hover:(border-gray-300)`}
  ${tw`disabled:text-gray-600`}
`;
