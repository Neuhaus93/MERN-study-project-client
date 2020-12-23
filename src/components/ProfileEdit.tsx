import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { FaFacebookSquare, FaPhoneSquare } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useUpdateUserMutation } from '../graphql/__generated__';
import { useAuth } from '../hooks/useAuth';
import { useEditUserReducer } from '../reducers/edit-profile-reducer';
import { editProfileValidation } from '../util/forms-validation';
import { FormContainer } from './FormContainer';
import { FormikTextInput } from './FormFields';

interface ProfileEditProps {}

export const ProfileEdit: React.FC<ProfileEditProps> = () => {
  return (
    <div className='flex justify-center items-center h-full max-w-screen-sm mx-auto'>
      <FormContainer title='Profile'>
        <EditProfileForm />
      </FormContainer>
    </div>
  );
};

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  facebook: string;
  linkedin: string;
  instagram: string;
}

const EditProfileForm: React.FC = () => {
  const { mongoUser } = useAuth();
  const [
    { isLoading, error, success, initialValues },
    dispatch,
  ] = useEditUserReducer();
  const [updateUser] = useUpdateUserMutation();

  console.log({ error, success, isLoading });

  useEffect(() => {
    if (!mongoUser) return;
    dispatch({
      type: 'setInitialValues',
      payload: {
        firstName: mongoUser.firstName,
        lastName: mongoUser.lastName,
        email: mongoUser.email,
        phoneNumber: mongoUser.socials.phoneNumber || '',
        facebook: mongoUser.socials.facebook || '',
        linkedin: mongoUser.socials.linkedin || '',
        instagram: mongoUser.socials.instagram || '',
      },
    });
  }, [mongoUser, dispatch]);

  const handleEditProfile = async (values: FormValues, actions: any) => {
    const { email, ...updateUserInput } = values;
    dispatch({ type: 'startEdit' });
    if (mongoUser) {
      try {
        await updateUser({
          variables: { userId: mongoUser._id, updateUserInput },
        });
        dispatch({ type: 'setSuccess', payload: 'Profile Updated' });
      } catch {
        dispatch({
          type: 'setError',
          payload: 'Something went wrong, try again later',
        });
      }
    }
    dispatch({ type: 'finishLoading' });
  };

  if (!mongoUser) {
    return <p>Loading...</p>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editProfileValidation}
      enableReinitialize
      onSubmit={handleEditProfile}>
      {(props) => (
        <Form className='max-w-screen-sm mx-auto'>
          <div className='grid grid-cols-2 gap-x-2 gap-y-5 sm:gap-x-5'>
            <div className='col-span-1'>
              <FormikTextInput field='firstName' label='First Name' />
            </div>
            <div className='col-span-1'>
              <FormikTextInput field='lastName' label='Last Name' />
            </div>
            <div className='col-span-2'>
              <FormikTextInput
                field='email'
                label='Email'
                Icon={MdEmail}
                disabled
              />
            </div>
            <div className='col-span-2'>
              <FormikTextInput
                field='phoneNumber'
                label='Phone Number'
                placeholder='(555) 555-1234'
                Icon={FaPhoneSquare}
              />
            </div>
            <div className='col-span-2'>
              <FormikTextInput
                field='linkedin'
                label='Linkedin'
                pretext='linkedin.com/in/'
                pl={44}
                Icon={AiFillLinkedin}
              />
            </div>
            <div className='col-span-2'>
              <FormikTextInput
                field='instagram'
                label='Instagram'
                pretext='instagram.com/'
                pl={43}
                Icon={AiFillInstagram}
              />
            </div>
            <div className='col-span-2'>
              <FormikTextInput
                field='facebook'
                label='Facebook'
                pretext='facebook.com/'
                pl={42}
                Icon={FaFacebookSquare}
              />
            </div>
          </div>
          {error && (
            <p className='text-red-500 pl-1 text-sm mt-3 -mb-3'>{error}</p>
          )}
          {success && (
            <p className='text-blue-500 pl-1 text-sm mt-3 -mb-3'>{success}</p>
          )}
          <div className='flex justify-center mt-6'>
            <button
              className='btn w-full my-2 font-bold text-white bg-blue-700 rounded-full hover:bg-blue-800 disabled:bg-blue-700 max-w-sm'
              type='submit'
              disabled={isLoading || !props.dirty}>
              Edit Profile
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
