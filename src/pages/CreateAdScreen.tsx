import { Form, Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { FormContainer } from '../components/FormContainer';
import {
  FormikCostField,
  FormikTextInput,
  SelectField,
} from '../components/FormFields';
import { ImageUploadContaienr } from '../components/ImageUploadContaienr';
import {
  CreateProductInput,
  ProductsDocument,
  useAddProductImageMutation,
  useCreateProductMutation,
  UserProductsDocument,
  UserProductsQuery,
  UserProductsQueryVariables,
} from '../graphql/__generated__';
import { useAuth } from '../hooks/useAuth';
import { useStorage } from '../hooks/useStorage';
import { useCreateAdReducer } from '../reducers/create-ad-reducer';
import { DefaultWrapper } from '../styles/Wrapper';
import { CATEGORIES } from '../util/constants';
import { createAdValidation } from '../util/forms-validation';
import { STATES_US } from '../util/states-us';

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
  const { mongoUser } = useAuth();
  const [{ images, error, loading }, dispatch] = useCreateAdReducer();
  const [createProduct] = useCreateProductMutation();
  const [addProductImages] = useAddProductImageMutation();
  const { uploadMultipleFiles } = useStorage();
  const history = useHistory();

  const handleSubmit = async (values: typeof initialValues) => {
    if (!mongoUser) return;

    dispatch({ type: 'startLoading' });
    const createProductInput: CreateProductInput = {
      ...values,
      userId: mongoUser._id,
    };

    const { data, errors: creatingError } = await createProduct({
      variables: { createProductInput },
      refetchQueries: [
        { query: ProductsDocument, variables: { category: '' } },
      ],
      update: (cache, { data }) => {
        if (!data) {
          return;
        }
        const userProductsQuery = cache.readQuery<
          UserProductsQuery,
          UserProductsQueryVariables
        >({
          query: UserProductsDocument,
          variables: {
            userId: mongoUser._id,
          },
        });
        if (!userProductsQuery) {
          return;
        }

        cache.writeQuery<UserProductsQuery, UserProductsQueryVariables>({
          query: UserProductsDocument,
          variables: {
            userId: mongoUser._id,
          },
          data: {
            userProducts: [
              data.createProduct,
              ...userProductsQuery.userProducts,
            ],
          },
        });
      },
    });

    if (creatingError) return;

    if (data) {
      const productId = data.createProduct._id;
      if (images.length === 0) {
        history.push(`ad/${productId}`);
      }

      const newImagesUrl = await uploadMultipleFiles(images, productId);
      try {
        await addProductImages({
          variables: {
            productId,
            imagesSrc: newImagesUrl,
          },
        });
        history.push(`ad/${productId}`);
      } catch (err) {
        console.log(err.code);
      }
    }
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
            <FormikCostField
              label='Cost'
              name='price'
              maxLength={10}
              placeholder='$ 1,000'
            />
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
              newImages={images}
              setNewImages={(payload) =>
                dispatch({ type: 'setImages', payload })
              }
              subscription='paid'
            />
          </div>
          {error ? (
            <p className='col-span-2 text-input-error'>{error}</p>
          ) : null}
          <div className='col-span-2'>
            <SubmitButton className='btn' type='submit' disabled={loading}>
              {loading ? 'POSTING...' : 'POST'}
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
