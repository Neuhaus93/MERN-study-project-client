import React from 'react';
import { DefaultWrapper } from '../styles/Wrapper';
import { ImSad } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { ROUTE_LANDING } from '../util/routes';

export const FourOhFourScreen = () => {
  return (
    <DefaultWrapper className=' flex justify-center items-center'>
      <div className='w-full flex justify-center items-center text-center'>
        <div>
          <div className='w-24 h-24 mx-auto mb-6'>
            <ImSad className='w-full h-full' />
          </div>
          <div className='mb-3'>
            <h2 className='text-4xl font-bold'>404</h2>
          </div>
          <div className='mb-2'>
            <h6 className='text-2xl'>Page Not Found</h6>
          </div>
          <p className='texxt-lg'>
            You should go back to the{' '}
            <Link
              className='text-blue-400 hover:text-blue-500 hover:underline '
              to={ROUTE_LANDING}>
              Homepage
            </Link>
          </p>
        </div>
      </div>
    </DefaultWrapper>
  );
};
