import { Listbox, Transition } from '@headlessui/react';
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

// export const SelectField: React.FC<SelectFieldProps> = ({ options }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [highlightedIdx, setHighlightedIdx] = useState(0);
//   const [selected, setSelected] = useState(options[0]);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
//     if (e.key === 'ArrowUp' && highlightedIdx > 0) {
//       setHighlightedIdx((prev) => prev - 1);
//     } else if (e.key === 'ArrowDown' && highlightedIdx < options.length - 1) {
//       setHighlightedIdx((prev) => prev + 1);
//     }
//   };

//   return (
//     <div className='mt-1 relative'>
//       <button
//         onKeyDown={handleKeyDown}
//         onClick={() => setIsOpen(!isOpen)}
//         type='button'
//         aria-haspopup='listbox'
//         aria-expanded='true'
//         aria-labelledby='listbox-label'
//         className='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
//         <span className='flex items-center'>
//           <span className='ml-3 block truncate'>{selected}</span>
//         </span>
//         <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
//           {/* <!-- Heroicon name: selector --> */}
//           <svg
//             className='h-5 w-5 text-gray-400'
//             xmlns='http://www.w3.org/2000/svg'
//             viewBox='0 0 20 20'
//             fill='currentColor'
//             aria-hidden='true'>
//             <path
//               fillRule='evenodd'
//               d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
//               clipRule='evenodd'
//             />
//           </svg>
//         </span>
//       </button>

//       <Transition
//         show={isOpen}
//         leave='transition ease-in duration-100'
//         leaveFrom='opacity-100'
//         leaveTo='opacity-0'>
//         {(ref) => (
//           <div
//             ref={ref}
//             className='absolute mt-1 w-full rounded-md bg-white shadow-lg'>
//             <ul
//               tabIndex={-1}
//               role='listbox'
//               aria-labelledby='listbox-label'
//               aria-activedescendant='listbox-item-3'
//               className='max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
//               {/* <!--
//                   Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

//                   Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
//                 --> */}
//               {options.map((name, index) => {
//                 const isSelected = selected === name;
//                 const isHighlighted = highlightedIdx === index;

//                 return (
//                   <li
//                     onMouseEnter={() => setHighlightedIdx(index)}
//                     onClick={() => {
//                       setSelected(options[index]);
//                       setIsOpen(false);
//                     }}
//                     key={name + index}
//                     id='listbox-item-0'
//                     className={`cursor-default select-none relative py-2 pl-3 pr-9 ${
//                       isHighlighted
//                         ? 'text-white bg-indigo-600'
//                         : 'text-gray-900 bg-white'
//                     }`}>
//                     <div className='flex items-center'>
//                       {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
//                       <span
//                         className={`${
//                           isSelected && 'font-semibold'
//                         }  ml-3 block font-normal truncate`}>
//                         {name}
//                       </span>
//                     </div>

//                     {/* <!--
//                       Checkmark, only display for selected option.

//                       Highlighted: "text-white", Not Highlighted: "text-indigo-600"
//                     --> */}
//                     {isSelected && (
//                       <span
//                         className={`absolute inset-y-0 right-0 flex items-center pr-4
//                           ${isHighlighted ? 'text-white' : 'text-indigo-600'}
//                         `}>
//                         {/* <!-- Heroicon name: check --> */}
//                         <svg
//                           className='h-5 w-5'
//                           xmlns='http://www.w3.org/2000/svg'
//                           viewBox='0 0 20 20'
//                           fill='currentColor'
//                           aria-hidden='true'>
//                           <path
//                             fillRule='evenodd'
//                             d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
//                             clipRule='evenodd'
//                           />
//                         </svg>
//                       </span>
//                     )}
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}
//       </Transition>
//     </div>
//   );
// };
