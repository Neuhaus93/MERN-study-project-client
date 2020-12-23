import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import _ from 'lodash';
import {
  FormikCostField,
  FormikTextInput,
  SelectField,
} from '../components/FormFields';
import { DefaultWrapper } from '../styles/Wrapper';
import { CATEGORIES } from '../util/constants';
import { createAdValidation } from '../util/forms-validation';
import { STATES_US } from '../util/states-us';
import { FormContainer } from '../components/FormContainer';
import { ImageUploadContaienr } from '../components/ImageUploadContaienr';

export const CreateAdScreen: React.FC = () => {
  return (
    <DefaultWrapper className='flex justify-center items-center my-8 h-full max-w-screen-md mx-auto'>
      <FormContainer title='Post an Ad'>
        <CreateAdForm />
      </FormContainer>
    </DefaultWrapper>
  );
};

const CreateAdForm: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createAdValidation}
      onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form className='grid grid-cols-2 gap-y-5 gap-x-4'>
          <div className='col-span-2'>
            <FormikTextInput field='title' label='Post Title' />
          </div>
          <div className='col-span-1'>
            <FormikCostField label='Cost' name='price' maxLength={10} />
          </div>
          <div className='col-span-1'>
            <SelectField
              label='Location'
              options={STATES_US}
              value={values.location}
              onChange={(value) => setFieldValue('location', value)}
            />
          </div>
          <div className='col-span-1'>
            <SelectField
              label='Category'
              options={CATEGORIES.map((e) => _.capitalize(e))}
              value={values.category}
              onChange={(value) => setFieldValue('category', value)}
            />
          </div>
          <div className='col-start-1 col-span-2'>
            <FormikTextInput
              field='description'
              label='Description'
              multiline
              rows={10}
            />
          </div>
          <div className='col-span-2'>
            <ImageUploadContaienr
              images={images}
              setImages={setImages}
              subscription='paid'
            />
          </div>
          {error ? (
            <p className='col-span-2 text-input-error'>{error}</p>
          ) : null}
          <div className='col-span-2'>
            <SubmitButton className='btn' type='submit' disabled={loading}>
              POST
            </SubmitButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const SubmitButton = styled.button`
  ${tw`float-right my-2 mr-4 font-bold text-white bg-blue-700 rounded px-8`}
  ${tw`hover:bg-blue-800 disabled:bg-blue-700`}
`;

const initialValues = {
  title: '',
  description: '',
  price: '',
  location: 'Alabama',
  category: 'Equipment',
};
