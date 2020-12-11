import React from 'react';
import { ProductQuery } from '../graphql/__generated__';
import { SocialsObjType } from '../util/socials';
import { SocialBadges } from './SocialBadges';
import { MyImage } from '../components/MyImage';

interface SellerInfoProps {
  seller: ProductQuery['product']['creator'];
}

export const SellerInfo: React.FC<SellerInfoProps> = ({ seller }) => {
  const { email, fullName, socials, photo } = seller;
  const socialsObj: SocialsObjType = {
    email,
    phoneNumber: socials.phoneNumber,
    linkedin: socials.linkedin,
    instagram: socials.instagram,
    facebook: socials.facebook,
  };

  return (
    <div className='flex'>
      <div className='rounded-full bg-gray-300 h-16 w-16 overflow-hidden'>
        {photo && <MyImage srcList={photo} alt='user' cover />}
      </div>
      <div className='flex flex-col justify-around ml-6'>
        <h6 className='text-sm font-semibold'>{fullName}</h6>
        <div className='flex space-x-2'>
          <SocialBadges socialsObj={socialsObj} />
        </div>
      </div>
    </div>
  );
};
