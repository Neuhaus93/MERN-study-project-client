import { Form, Formik } from 'formik';
import React from 'react';
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
  const { login, mongoUser } = useAuth();
  const [{ isLoading, error }, dispatch] = useEditUserReducer();
  const [updateUser] = useUpdateUserMutation();

  const handleEditProfile = async (values: FormValues, actions: any) => {
    console.log(values);
  };

  if (!mongoUser) {
    return <p>Loading...</p>;
  }

  return (
    <Formik
      initialValues={{
        firstName: mongoUser.firstName,
        lastName: mongoUser.lastName,
        email: mongoUser.email,
        phoneNumber: mongoUser.socials.phoneNumber || '',
        facebook: mongoUser.socials.facebook || '',
        linkedin: mongoUser.socials.linkedin || '',
        instagram: mongoUser.socials.instagram || '',
      }}
      validationSchema={editProfileValidation}
      onSubmit={handleEditProfile}>
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
        {error ? (
          <p className='text-red-500 pl-1 text-sm mt-2'>{error}</p>
        ) : null}
        <div className='flex justify-center mt-6'>
          <button
            className='btn w-full my-2 font-bold text-white bg-blue-700 rounded-full hover:bg-blue-800 disabled:bg-blue-700 max-w-sm'
            type='submit'
            disabled={isLoading}>
            Edit Profile
          </button>
        </div>
      </Form>
    </Formik>
  );
};
