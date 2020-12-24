import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_NO_AD, IMAGE_NO_FAVORITE } from '../util/images';
import { ROUTE_CREATE_AD } from '../util/routes';
import { ButtonBlueOutline } from './Buttons';
import { MyImage } from './MyImage';

export const NoAds = () => (
  <div className='text-center mt-6'>
    <h6 className='text-lg'>You have not posted any ads yet</h6>
    <Link to={ROUTE_CREATE_AD}>
      <ButtonBlueOutline className='mt-3'>Create your first</ButtonBlueOutline>
    </Link>
    <div className='w-14 h-14 my-4 mx-auto'>
      <MyImage srcList={IMAGE_NO_AD} alt='no-ads' />
    </div>
  </div>
);

export const NoFavorites = () => (
  <div className='text-center mt-6'>
    <h6 className='text-lg'>You have not liked any ads yet</h6>
    <div className='w-14 h-14 my-4 mx-auto'>
      <MyImage srcList={IMAGE_NO_FAVORITE} alt='no-favorites' />
    </div>
  </div>
);
