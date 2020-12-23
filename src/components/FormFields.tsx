import { Listbox, Transition } from '@headlessui/react';
import { ErrorMessage, Field, FieldAttributes, useField } from 'formik';
import React from 'react';
import { IconType } from 'react-icons/lib';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import tw, { styled } from 'twin.macro';
import { IconCheck, IconTwoArrows } from '../assets/Icons';

type FormikCostFieldProps = NumberFormatProps & {
  name: string;
  label: string;
};

export const FormikCostField: React.FC<FormikCostFieldProps> = (props) => {
  const { name, label, ...inputProps } = props;
  const [field, meta] = useField(name);

  return (
    <>
      <label className='text-input-label'>{label}</label>
      <NumberFormat
        {...field}
        {...inputProps}
        className='text-input'
        onValueChange={(values) => {
          field.onChange({
            target: {
              name: field.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix='$ '
        autoComplete='off'
      />
      {meta.touched && meta.error && <ErrorMsg error={meta.error} />}
    </>
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
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export const SelectField: React.FC<SelectFieldProps> = (props) => {
  const { options, value, onChange, label } = props;

  return (
    <Listbox
      as='div'
      className='space-y-1'
      value={value}
      // @ts-expect-error: Let's ignore a single compiler error like this unreachable code
      onChange={onChange}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className='text-input-label'>{label}</Listbox.Label>
          )}
          <div className='relative'>
            <span className='inline-block w-full rounded-md shadow-sm'>
              <StyListboxButton>
                <span className='block truncate'>{value}</span>
                <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                  <IconTwoArrows />
                </span>
              </StyListboxButton>
            </span>

            <Transition
              show={open}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              className='absolute mt-1 w-full rounded-md bg-white shadow-lg z-50'>
              <Listbox.Options
                static
                className='max-h-60 rounded-md py-1 text-sm leading-6 shadow-xs overflow-auto focus:outline-none sm:text-base sm:leading-5'>
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
                            <IconCheck />
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
  className?: string;
  Icon?: IconType;
  pretext?: string;
  pl?: number;
  multiline?: boolean;
}

export const FormikTextInput: React.FC<FormikTextInputProps> = (props) => {
  const { className, Icon, pretext, pl, multiline, ...fieldAtts } = props;

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor='name' className='text-input-label'>
        {fieldAtts.label}
      </label>
      <div className='relative'>
        {Icon && <PreIcon Icon={Icon} />}

        {pretext && <PreText text={pretext} hasIcon={!!Icon} pl={pl} />}

        <StyTextField
          {...fieldAtts}
          component={multiline ? 'textarea' : 'input'}
          icon={Icon ? 'true' : ''}
          id={fieldAtts.field}
          name={fieldAtts.field}
          pl={pl}
        />
      </div>

      <ErrorMessage
        className='text-input-error'
        name={fieldAtts.field}
        component='div'
      />
    </div>
  );
};

const ErrorMsg: React.FC<{ error: string }> = ({ error }) => (
  <div className='pt-1 pl-1'>
    <p className='text-xs font-semibold text-red-400'>{error}</p>
  </div>
);

const PreIcon: React.FC<{ Icon: IconType }> = ({ Icon }) => (
  <StyIcon>
    <div>
      <Icon />
    </div>
  </StyIcon>
);

const PreText: React.FC<{ text: string; hasIcon: boolean; pl?: number }> = (
  props
) => (
  <StyPreText icon={props.hasIcon} pl={props.pl}>
    {props.text}
  </StyPreText>
);

const StyPreText = styled.p<{ icon?: boolean; pl?: number }>`
  ${({ icon }) => (icon ? tw`pl-14` : tw`pl-3`)}
  ${tw`absolute flex items-center left-0 top-0 h-full text-gray-500 z-10`}
`;

/* ${({ pl }) => (pl && )} */
const StyTextField = styled(Field)`
  ${({ icon }) => (icon ? tw`pl-14` : tw`pl-3`)}
  padding-left: ${({ pl }) => pl && pl / 4 + 'rem'};
  ${tw`text-sm relative w-full border rounded shadow-sm placeholder-gray-400 py-2 pr-3`}
  ${tw`sm:(text-base)`}
  ${tw`focus:(ring-2 outline-none)`}
  ${tw`hover:(border-gray-300)`}
  ${tw`disabled:text-gray-600`}
`;

const StyListboxButton = styled(Listbox.Button)`
  ${tw`relative w-full rounded-md border bg-white pl-3 pr-10 py-2 text-left text-sm transition ease-in-out duration-150`}
  ${tw`sm:(text-base)`}
  ${tw`focus:(border-blue-300 outline-none)`}
  ${tw`hover:(border-gray-300)`}
`;

const StyIcon = styled.div`
  ${tw`absolute flex border border-transparent left-0 top-0 h-full w-12`}
  & > div {
    ${tw`flex items-center justify-center rounded-tl rounded-bl z-10`}
    ${tw`bg-gray-100 text-gray-600 text-lg h-full w-full`}
  }
`;
