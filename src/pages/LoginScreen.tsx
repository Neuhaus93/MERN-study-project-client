import { Form, Formik } from 'formik';
import React from 'react';
import { FormTextField } from '../components/FormFields';
import { DefaultWrapper } from '../styles/Wrapper';

interface LoginScreenProps {}

const imageUrl = 'https://i.ibb.co/mX1TjVb/3.jpg';

// const imageUrl =
//   'https://i.ibb.co/Ytq1LPD/doz-gabrial-D0fxuv-St-GD0-unsplash.jpg';

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  return (
    <DefaultWrapper className='bg-blue-50 flex items-center justify-center'>
      <div className='w-full sm:max-w-screen-sm lg:max-w-screen-lg mx-4 sm:mx-auto'>
        <div className='w-full flex rounded-3xl overflow-hidden shadow-sm'>
          {/* Col */}
          <div
            className='bg-gray-400 h-auto hidden lg:block lg:w-1/2 bg-cover'
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}></div>

          {/* Col */}
          <div className='bg-white w-full lg:w-1/2 py-8 sm:py-10 lg:py-12 px-10 sm:px-28 lg:px-16'>
            <h3 className='text-2xl text-center mb-6'>Welcome Back!</h3>
            <LoginForm />
            <hr className='my-6 border-t mx-auto w-3/4' />
            <div className='text-center'>
              <a
                className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
                href='./register.html'>
                Create an Account!
              </a>
            </div>
            <div className='text-center'>
              <a
                className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
                href='./forgot-password.html'>
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </DefaultWrapper>
  );
};

// interface LoginValues {
//   email: string;
//   password: string;
// }

const LoginForm: React.FC = () => {
  const handleLogin = () => {
    console.log('login submited');
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={handleLogin}>
      {({ isSubmitting }) => (
        <Form>
          <FormTextField
            field='email'
            label='Email'
            placeholder='Enter Email...'
            type='email'
          />
          <FormTextField
            field='password'
            label='Password'
            placeholder='************'
            type='password'
          />
          <button
            className='w-full my-2 py-3 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline'
            type='submit'
            disabled={isSubmitting}>
            Log in
          </button>
        </Form>
      )}
    </Formik>
  );
};
