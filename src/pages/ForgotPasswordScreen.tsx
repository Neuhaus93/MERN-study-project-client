import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormikTextInput } from '../components/FormFields';
import { useAuth } from '../hooks/useAuth';
import { DefaultWrapper } from '../styles/Wrapper';
import { forgotPasswordValidation } from '../util/forms-validation';
import { ROUTE_LOGIN } from '../util/routes';

export const ForgotPasswordScreen: React.FC = () => {
  return (
    <DefaultWrapper className='relative bg-blue-50 flex items-center justify-center'>
      <div className='w-full max-w-screen-sm mx-4 sm:mx-auto z-10'>
        <div className='w-full flex rounded-3xl overflow-hidden shadow-sm'>
          {/* Col */}
          <div className='bg-white w-full py-8 sm:py-10 lg:py-12 px-10 sm:px-28'>
            <h3 className='text-2xl text-center mb-6'>Reset your password</h3>
            <ResetPasswordForm />
            <hr className='my-6 border-t mx-auto w-3/4' />
            <div className='text-center'>
              <Link
                to={ROUTE_LOGIN}
                className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'>
                Go Back to Log in!
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute left-0 top-0 right-0 h-1/2 bg-blue-100 z-0' />
    </DefaultWrapper>
  );
};

const initialValues = {
  email: '',
};

const ResetPasswordForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { resetPassword } = useAuth();

  async function handleChangePassword({ email }: typeof initialValues) {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await resetPassword(email);
      setSuccess('Reset Email Sent');
    } catch {
      setError('Email not found');
    }
    setLoading(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={forgotPasswordValidation}
      onSubmit={handleChangePassword}>
      <Form>
        <FormikTextInput
          className='mt-4'
          field='email'
          label='Email'
          placeholder='Enter Email...'
          type='email'
        />
        {error && (
          <p className='text-red-500 pl-1 text-sm font-semibold mt-3 -mb-3'>
            {error}
          </p>
        )}
        {success && (
          <p className='text-blue-500 pl-1 text-sm font-semibold mt-3 -mb-3'>
            {success}
          </p>
        )}
        <button
          className='btn w-full mt-6 mb-1 font-bold text-white bg-blue-700 rounded-full hover:bg-blue-800 disabled:bg-blue-700'
          type='submit'
          disabled={loading}>
          Retrieve Password
        </button>
      </Form>
    </Formik>
  );
};
