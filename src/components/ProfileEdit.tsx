import { Form, Formik } from 'formik';
import React from 'react';
import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { FaFacebookSquare, FaPhoneSquare } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useUpdateUserMutation } from '../graphql/__generated__';
import { useAuth } from '../hooks/useAuth';
import { useEditUserReducer } from '../reducers/edit-profile-reducer';
import { editProfileValidation } from '../util/forms-validation';
import { FormikTextInput } from './FormFields';

interface ProfileEditProps {}

export const ProfileEdit: React.FC<ProfileEditProps> = () => {
  return (
    <div className='flex justify-center items-center h-full max-w-screen-sm mx-auto'>
      <div className='border bg-white w-full py-8 sm:py-10 lg:py-8 px-2 sm:px-4 md:px-8 lg:px-16 rounded-3xl shadow-sm'>
        <h2 className='text-center text-2xl mb-6 font-semibold'>Profile</h2>
        <EditProfileForm />
      </div>
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
    // setError('');
    // setLoading(true);
    // try {
    //   await login(values.email, values.password);
    //   if (lastPath) {
    //     history.push('/' + lastPath.substring(1).replace(/-/g, '/'));
    //   } else {
    //     history.push('/');
    //   }
    // } catch (err) {
    //   console.log(err);
    //   setLoading(false);
    //   setError('Invalid email or password');
    // }
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
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-2 sm:gap-x-5'>
          <FormikTextInput field='firstName' label='First Name' />
          <FormikTextInput field='lastName' label='Last Name' />
        </div>
        <FormikTextInput field='email' label='Email' Icon={MdEmail} disabled />
        <FormikTextInput
          field='phoneNumber'
          label='Phone Number'
          placeholder='(555) 555-1234'
          Icon={FaPhoneSquare}
        />
        <FormikTextInput
          field='linkedin'
          label='Linkedin'
          pretext='linkedin.com/in/'
          pl={44}
          Icon={AiFillLinkedin}
        />
        <FormikTextInput
          field='instagram'
          label='Instagram'
          pretext='instagram.com/'
          pl={43}
          Icon={AiFillInstagram}
        />
        <FormikTextInput
          field='facebook'
          label='Facebook'
          pretext='facebook.com/'
          pl={42}
          Icon={FaFacebookSquare}
        />
        {error ? <p className='text-red-500 pl-1 text-sm'>{error}</p> : null}
        <div className='flex justify-center'>
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
