import { Form, Formik } from 'formik';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { ButtonBlueFilled } from '../components/Buttons';
import { FormikTextInput } from '../components/FormFields';
import { useCreateUserMutation } from '../graphql/__generated__';
import { useAuth } from '../hooks/useAuth';
import { useRegisterReducer } from '../reducers/register-reducer';
import { DefaultWrapper } from '../styles/Wrapper';
import { registerValidation } from '../util/forms-validation';
import { IMAGE_REGISTER } from '../util/images';
import { ROUTE_LANDING, ROUTE_LOGIN } from '../util/routes';

interface RegisterScreenProps {}

export const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  return (
    <DefaultWrapper className='relative bg-blue-50 flex items-center justify-center'>
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
      <div className='absolute left-0 top-0 right-0 h-1/2 bg-blue-100 z-0' />
    </DefaultWrapper>
  );
};

const StyledRegisterCard = styled.div`
  ${tw`w-full my-4 sm:max-w-screen-sm lg:max-w-screen-lg mx-4 sm:mx-auto z-10`}

  & .left-col {
    background-image: url(${IMAGE_REGISTER});
    ${tw`bg-gray-400 h-auto hidden lg:block lg:w-1/2 bg-cover bg-center`}
  }

  & .right-col {
    min-height: 688px;
    ${tw`flex flex-col justify-center bg-white w-full py-8 px-10`}
    ${tw`sm:(px-28 py-10)`}
    ${tw`lg:(w-1/2 py-12 px-16)`}

    &__title {
      ${tw`text-2xl text-center mb-6`}
    }
  }
`;

const RegisterForm: React.FC = () => {
  const [screenState, dispatch] = useRegisterReducer();
  const { initialValues, error, loading } = screenState;
  const history = useHistory();
  const { signup } = useAuth();
  const [createUser] = useCreateUserMutation();

  const handleRegister = async (values: typeof initialValues) => {
    const { firstName, lastName, email, password } = values;
    dispatch({ type: 'startRegister' });

    try {
      const newUser = await signup(email, password);
      await createUser({
        variables: {
          createUserInput: {
            firebaseId: newUser.user?.uid || '',
            firstName,
            lastName,
            email,
          },
        },
      });
      history.push(ROUTE_LANDING);
    } catch (err) {
      dispatch({ type: 'errorOnRegister' });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerValidation}
      onSubmit={handleRegister}>
      {({ isSubmitting }) => (
        <Form>
          <FormikTextInput
            field='firstName'
            label='First Name'
            placeholder='First Name'
            type='text'
          />
          <FormikTextInput
            className='mt-4'
            field='lastName'
            label='Last Name'
            placeholder='Last Name'
            type='text'
          />
          <FormikTextInput
            className='mt-4'
            field='email'
            label='Email'
            placeholder='Email'
            type='email'
          />
          <FormikTextInput
            className='mt-4'
            field='password'
            label='Password'
            placeholder='************'
            type='password'
          />
          <FormikTextInput
            className='mt-4 mb-4'
            field='confirmPassword'
            label='Confirm Password'
            placeholder='************'
            type='password'
          />
          {error && (
            <p className='text-sm font-bold text-red-400 pb-0.5 pl-1'>
              {error}
            </p>
          )}
          <ButtonBlueFilled
            className='w-full my-2 py-3 font-bold rounded-full'
            type='submit'
            disabled={loading}>
            Register
          </ButtonBlueFilled>
        </Form>
      )}
    </Formik>
  );
};
