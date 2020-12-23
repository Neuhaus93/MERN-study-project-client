import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormikTextInput } from '../components/FormFields';
import { useAuth } from '../hooks/useAuth';
import { DefaultWrapper } from '../styles/Wrapper';
import { loginValidation } from '../util/forms-validation';
import { IMAGE_LOGIN } from '../util/images';
import { ROUTE_REGISTER } from '../util/routes';

interface LoginScreenProps {}

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  return (
    <DefaultWrapper className='bg-blue-50 flex items-center justify-center'>
      <div className='w-full sm:max-w-screen-sm lg:max-w-screen-lg mx-4 sm:mx-auto'>
        <div className='w-full flex rounded-3xl overflow-hidden shadow-sm'>
          {/* Col */}
          <div
            className='bg-gray-400 h-auto hidden lg:block lg:w-1/2 bg-cover bg-center'
            style={{
              backgroundImage: `url(${IMAGE_LOGIN})`,
            }}></div>

          {/* Col */}
          <div className='bg-white w-full lg:w-1/2 py-8 sm:py-10 lg:py-12 px-10 sm:px-28 lg:px-16'>
            <h3 className='text-2xl text-center mb-6'>Welcome Back!</h3>
            <LoginForm />
            <hr className='my-6 border-t mx-auto w-3/4' />
            <div className='text-center'>
              <Link
                to={ROUTE_REGISTER}
                className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'>
                Create an Account!
              </Link>
            </div>
            <div className='text-center'>
              <Link
                to={'/#'}
                className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'>
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DefaultWrapper>
  );
};

const LoginForm: React.FC<{ lastPath?: string }> = ({ lastPath }) => {
  const history = useHistory();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (values: { email: string; password: string }) => {
    console.log('running');
    setError('');
    setLoading(true);

    try {
      await login(values.email, values.password);
      if (lastPath) {
        history.push('/' + lastPath.substring(1).replace(/-/g, '/'));
      } else {
        history.push('/');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError('Invalid email or password');
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginValidation}
      onSubmit={handleLogin}>
      <Form>
        <FormikTextInput
          className='mt-4'
          field='email'
          label='Email'
          placeholder='Enter Email...'
          type='email'
        />
        <FormikTextInput
          className='mt-4 mb-6'
          field='password'
          label='Password'
          placeholder='************'
          type='password'
        />
        {error ? <p className='text-red-500 pl-1 text-sm'>{error}</p> : null}
        <button
          className='btn w-full my-2 font-bold text-white bg-blue-700 rounded-full hover:bg-blue-800 disabled:bg-blue-700'
          type='submit'
          disabled={loading}>
          Log in
        </button>
      </Form>
    </Formik>
  );
};
