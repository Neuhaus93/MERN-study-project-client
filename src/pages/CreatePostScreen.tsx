import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonBlueFilled } from '../components/Buttons';
import { FormContainer } from '../components/FormContainer';
import { FormikTextInput, SelectField } from '../components/FormFields';
import { PostsDocument, useCreatePostMutation } from '../graphql/__generated__';
import { useAuth } from '../hooks/useAuth';
import { DefaultWrapper } from '../styles/Wrapper';
import { CATEGORIES } from '../util/constants';
import { createPostValidation } from '../util/forms-validation';
import { ROUTE_POST } from '../util/routes';

export const CreatePostScreen: React.FC = () => {
  return (
    <DefaultWrapper className='relative bg-blue-50 flex items-center justify-center'>
      <div className='w-full sm:max-w-screen-sm mx-4 sm:mx-auto z-10'>
        <FormContainer title='Create a new post'>
          <CreatePostForm />
        </FormContainer>
      </div>
      <div className='absolute left-0 top-0 right-0 h-1/2 bg-blue-100 z-0' />
    </DefaultWrapper>
  );
};

const initialValues = {
  title: '',
  body: '',
  category: 'Equipment',
};

const CreatePostForm: React.FC = () => {
  const { mongoUser } = useAuth();
  const [isPosting, setIsPosting] = useState(false);
  const [createPost] = useCreatePostMutation();
  const history = useHistory();

  const handleSubmit = async (values: typeof initialValues) => {
    if (isPosting || !mongoUser) return;
    setIsPosting(true);

    const { data } = await createPost({
      variables: { postInput: values },
      refetchQueries: [{ query: PostsDocument }],
    });

    if (data) {
      setIsPosting(false);
      history.push(`${ROUTE_POST}/${data.createPost._id}`);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createPostValidation}
      onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form className='grid gap-y-4'>
          <div>
            <FormikTextInput field='title' label='Title' />
          </div>
          <div className='w-1/2'>
            <SelectField
              label='Category'
              options={CATEGORIES.map((e) => _.capitalize(e))}
              value={values.category}
              onChange={(value) => setFieldValue('category', value)}
            />
          </div>
          <div>
            <FormikTextInput field='body' label='Body' multiline rows={10} />
          </div>
          <div className='ml-auto'>
            <ButtonBlueFilled type='submit' disabled={isPosting}>
              {isPosting ? 'Posting...' : 'Post'}
            </ButtonBlueFilled>
          </div>
        </Form>
      )}
    </Formik>
  );
};
