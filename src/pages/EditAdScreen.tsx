import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect } from 'react';
import ContentLoader from 'react-content-loader';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { FormContainer } from '../components/FormContainer';
import {
  FormikCostField,
  FormikTextInput,
  SelectField,
} from '../components/FormFields';
import { ImageUploadContaienr } from '../components/ImageUploadContaienr';
import {
  UpdateProductMutationVariables,
  useProductQuery,
  User,
  useUpdateProductMutation,
} from '../graphql/__generated__';
import { useAuth } from '../hooks/useAuth';
import { useStorage } from '../hooks/useStorage';
import {
  EditAdDispatch,
  EditAdState,
  useEditAdReducer,
} from '../reducers/edit-ad-reducer';
import { DefaultWrapper } from '../styles/Wrapper';
import { CATEGORIES } from '../util/constants';
import { createAdValidation } from '../util/forms-validation';
import { ROUTE_AD, ROUTE_LANDING } from '../util/routes';
import { STATES_US } from '../util/states-us';

export const EditAdScreen: React.FC<
  RouteComponentProps<{ productId: string }>
> = ({ match }) => {
  const {
    params: { productId },
  } = match;
  const { mongoUser } = useAuth();
  const history = useHistory();
  const [screenState, dispatch] = useEditAdReducer();
  const { settingUp } = screenState;
  const { data, error } = useProductQuery({
    variables: { productId },
  });

  if (error) history.push(ROUTE_LANDING);

  /** Checks to see if the current user is the creator, sends him to Homepage if not */
  useEffect(() => {
    if (mongoUser && data) {
      if (mongoUser._id !== data.product.creator._id) {
        history.push(ROUTE_LANDING);
      } else {
        dispatch({ type: 'initialSetup', payload: data.product });
      }
    }
  }, [mongoUser, data, dispatch, history]);

  return (
    <DefaultWrapper className='flex justify-center items-center my-8 h-full max-w-screen-md mx-auto'>
      {settingUp ? (
        <Loading />
      ) : (
        <FormContainer title='Edit your Ad'>
          <EditAdForm
            screenState={screenState}
            dispatch={dispatch}
            mongoUser={mongoUser}
            productId={productId}
          />
        </FormContainer>
      )}
    </DefaultWrapper>
  );
};

interface EditAdFormProp {
  screenState: EditAdState;
  dispatch: EditAdDispatch;
  productId: string;
  mongoUser?: User | null;
}

const EditAdForm: React.FC<EditAdFormProp> = ({
  screenState,
  dispatch,
  mongoUser,
  productId,
}) => {
  const {
    initialValues,
    error,
    existingImages,
    newImages,
    deletedImages,
    loading,
  } = screenState;
  const [updateProduct] = useUpdateProductMutation();
  const { deleteMultipleFiles, uploadMultipleFiles } = useStorage();
  const history = useHistory();

  const handleSubmit = async (formValues: typeof initialValues) => {
    if (!mongoUser) return;
    dispatch({ type: 'startLoading' });

    if (deletedImages.length > 0) {
      await deleteMultipleFiles(deletedImages, productId);
    }

    try {
      const filteredExistingImages = existingImages.filter(
        (e) => !deletedImages.includes(e)
      );
      const newImagesUrl = await uploadMultipleFiles(newImages, productId);
      const updateProductInput: UpdateProductMutationVariables['updateProductInput'] = {
        ...formValues,
        productId,
        images: [...filteredExistingImages, ...newImagesUrl],
        price: formValues.price.toString(),
      };

      await updateProduct({
        variables: { updateProductInput },
      });
    } catch (err) {
      console.error({ from: 'handleUpdate last try catch', err });
    } finally {
      dispatch({ type: 'finishLoading' });
      history.push(`${ROUTE_AD}/${productId}`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createAdValidation}
      onSubmit={handleSubmit}
      enableReinitialize>
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
              placeholder={'$ 1,000'}
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
              newImages={newImages}
              setNewImages={(payload) =>
                dispatch({ type: 'setNewImages', payload })
              }
              existingImages={existingImages}
              setExistingImages={(payload) =>
                dispatch({ type: 'setExistingImages', payload })
              }
              deletedImages={deletedImages}
              setDeletedImages={(payload) =>
                dispatch({ type: 'setDeletedImages', payload })
              }
              subscription='paid'
            />
          </div>
          {error ? (
            <p className='col-span-2 text-input-error'>{error}</p>
          ) : null}
          <div className='col-span-2'>
            <SubmitButton className='btn' type='submit' disabled={loading}>
              EDIT
            </SubmitButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const Loading: React.FC = () => (
  <ContentLoader
    preserveAspectRatio='xMinYMin'
    speed={2}
    height={600}
    className='overflow-hidden w-full px-1'>
    <rect x='25%' y='0' rx='8' ry='8' width='50%' height='50' />
    <rect x='0' y='70' rx='8' ry='8' width='100%' height='540' />
  </ContentLoader>
);

const SubmitButton = styled.button`
  ${tw`float-right my-2 mr-4 font-bold text-white bg-blue-700 rounded px-8`}
  ${tw`hover:bg-blue-800 disabled:bg-blue-700`}
`;
