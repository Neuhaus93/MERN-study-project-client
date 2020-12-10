import { Form, Formik } from 'formik';
import React from 'react';
import { FormTextField } from '../components/FormFields';
import { DefaultWrapper } from '../styles/Wrapper';
import { registerValidation } from '../util/forms-validation';
import { IMAGE_LOGIN } from '../util/images';
import { Link } from 'react-router-dom';
import { ROUTE_LOGIN } from '../util/routes';
import tw, { styled } from 'twin.macro';

interface RegisterScreenProps {}

export const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  return (
    <DefaultWrapper className='bg-blue-50 flex items-center justify-center'>
      <StyledRegisterCard>
        <div className='w-full flex rounded-3xl overflow-hidden shadow-sm'>
          {/* Col */}
          <div className='left-col' />

          {/* Col */}
          <div className='right-col'>
            <h3 className='right-col__title'>Register</h3>
            <RegisterForm />
            <hr className='my-6 border-t mx-auto w-3/4' />
            <div className='text-center'>
              <Link
                to={ROUTE_LOGIN}
                className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'>
                Already have an account? Login
              </Link>
            </div>
          </div>
        </div>
      </StyledRegisterCard>
    </DefaultWrapper>
  );
};

const StyledRegisterCard = styled.div`
  ${tw`w-full sm:max-w-screen-sm lg:max-w-screen-lg mx-4 sm:mx-auto`}

  & .left-col {
    background-image: url(${IMAGE_LOGIN});
    ${tw`bg-gray-400 h-auto hidden lg:block lg:w-1/2 bg-cover bg-center`}
  }

  & .right-col {
    height: 752px;
    ${tw`flex flex-col justify-center bg-white w-full py-8 px-10`}
    ${tw`sm:(px-28 py-10)`}
    ${tw`lg:(w-1/2 py-12 px-16)`}

    &__title {
      ${tw`text-2xl text-center mb-6`}
    }
  }
`;

const RegisterForm: React.FC = () => {
  const handleRegister = () => {
    console.log('register submited');
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={registerValidation}
      onSubmit={handleRegister}>
      {({ isSubmitting }) => (
        <Form>
          <FormTextField
            field='firstName'
            label='First Name'
            placeholder='First Name'
            type='text'
          />
          <FormTextField
            field='lastName'
            label='Last Name'
            placeholder='Last Name'
            type='text'
          />
          <FormTextField
            field='email'
            label='Email'
            placeholder='Email'
            type='email'
          />
          <FormTextField
            field='password'
            label='Password'
            placeholder='************'
            type='password'
          />
          <FormTextField
            field='confirmPassword'
            label='Confirm Password'
            placeholder='************'
            type='password'
          />
          <button
            className='w-full my-2 py-3 font-bold text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:outline-none focus:shadow-outline'
            type='submit'
            disabled={isSubmitting}>
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};
