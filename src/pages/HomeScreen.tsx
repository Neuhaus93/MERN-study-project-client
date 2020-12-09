import React from 'react';
import LandingImg from '../assets/diamond-md.jpg';
import { Image } from '../components/Image';
import { PostsList } from '../components/PostsList';
import { ProductsList } from '../components/ProductsList';
import { DefaultWrapper } from '../styles/Wrapper';

interface HomeScreenProps {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <DefaultWrapper>
      <header className='relative mb-3 mx-auto h-56'>
        <div className='w-full h-full' style={{ filter: 'brightness(0.8)' }}>
          <Image srcList={LandingImg} alt='landing' cover />
        </div>
        <div className='transform absolute bottom-6 left-0 right-0 '>
          <h5 className='text-white text-xl sm:text-2xl text-center'>
            Jewelers Selling to Jewelers
          </h5>
        </div>
      </header>
      <div className='container mx-auto mb-8 mt-6'>
        <ProductsList />
        <div className='my-4'></div>
        <PostsList />
      </div>
    </DefaultWrapper>
  );
};
