import React from 'react';
import { SocialsObjType } from '../util/socials';
import { SocialBadges } from './SocialBadges';

interface SellerInfoProps {}

const socialsObj: SocialsObjType = {
  email: 'lucas.neuhaus@gmail.com',
  phoneNumber: '56 485-579',
  facebook: '/lucas-neuhaus',
  instagram: '/lucas',
  linkedin: '/lucas',
};

export const SellerInfo: React.FC<SellerInfoProps> = () => {
  return (
    <div className='flex'>
      <div className='rounded-full bg-black h-16 w-16'></div>
      <div className='flex flex-col justify-around ml-6'>
        <h6 className='text-sm font-semibold'>Lucas Neuhaus</h6>
        <div className='flex space-x-2'>
          <SocialBadges socialsObj={socialsObj} />
        </div>
      </div>
    </div>
  );
};
