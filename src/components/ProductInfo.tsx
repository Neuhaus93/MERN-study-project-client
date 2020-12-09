import React from 'react';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import Moment from 'react-moment';
import { InlineIcon } from './MyIcon';

interface ProductInfoProps {}

const fakeItemInfo = {
  title: 'New title for the ad',
  location: 'Alabama',
  price: '30',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dolore nulla vitae enim delectus sunt adipisci quia possimus alias ipsa libero veniam illo sit inventore perferendis ratione praesentium, officiis sed obcaecati eos exercitationem pariatur at aliquid accusantium. Quibusdam, odio nam?',
  date: new Date(),
};

export const ProductInfo: React.FC<ProductInfoProps> = () => {
  const { title, location, price, description, date } = fakeItemInfo;

  return (
    <div className='pt-3'>
      <h3 className='text-2xl mb-2'>{title}</h3>
      <dl className='text-gray-700 text-md flex items-center'>
        <div>
          <dt className='sr-only'>Location</dt>
          <dd className='flex'>
            <InlineIcon Icon={IoLocationSharp} />
            <p>{location}</p>
          </dd>
        </div>
        <div className='bg-red-100 text-red-900 px-2 py-0.5 rounded-md ml-4'>
          <dt className='sr-only'>Price</dt>
          <dd>
            <p className=''>{`$ ${price}`}</p>
          </dd>
        </div>
      </dl>

      <Buttons />

      <div className='mt-8'>
        <div>
          <h4 className='text-lg mb-1 font-bold'>Description</h4>
          <p className='text-gray-800 text-sm whitespace-pre-line'>
            {description}
          </p>
        </div>
        <div className='mt-4'>
          <h5 className='font-bold mb-1'>Date Posted:</h5>
          <p className='text-gray-800 text-sm'>
            <Moment date={date} format='LL' />
          </p>
        </div>
      </div>
    </div>
  );
};

const Buttons: React.FC = () => {
  return (
    <div className='flex space-x-2 h-10 mt-5'>
      <button className='px-5 border rounded-md'>
        <FaHeart className='opacity-50' />
      </button>
      <button className='px-5 border rounded-md'>
        <FaShareAlt className='opacity-90 text-blue-700' />
      </button>
      <button className='text-blue-50 bg-blue-900 border border-blue-200 rounded-md flex-1 font-bold'>
        Reply
      </button>
    </div>
  );
};
