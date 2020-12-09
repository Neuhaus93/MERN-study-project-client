import React, { useState } from 'react';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import Moment from 'react-moment';
import { InlineIcon } from './MyIcon';
import styled from 'styled-components';
import { SOCIALS, helperFunctions, AllSocials } from '../util/socials';
import ClickAwayListener from 'react-click-away-listener';

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
      <ReplyButton socials={[{ name: 'facebook', url: 'lucas-neuhaus/' }]} />
    </div>
  );
};

type SocialArrType = Array<{
  name: AllSocials;
  url: string;
}>;

const ReplyButton: React.FC<{ socials: SocialArrType }> = ({ socials }) => {
  const [open, setOpen] = useState(false);
  const { getLinkIcon, getShownValueAndUrl } = helperFunctions;

  const getStyle = (color: string, isLeft?: boolean) => {
    const left: React.CSSProperties = {
      color: color,
      marginRight: '0.5rem',
    };
    const right: React.CSSProperties = {
      color: color,
      marginLeft: 'auto',
      cursor: 'pointer',
    };
    return isLeft ? left : right;
  };

  return (
    <ClickAwayListener
      onClickAway={() => setOpen(false)}
      className='relative flex-1'>
      <button
        onClick={() => setOpen(!open)}
        className='text-blue-50 bg-blue-800 border border-blue-200 w-full h-full rounded-md font-bold'>
        Reply
      </button>
      {open && (
        <StyledDropdown className='bg-blue-50 shadow-md rounded-md'>
          {socials.map((social, index) => {
            const LinkIcon = getLinkIcon(social.name);
            const { color, Icon: SocialIcon } = SOCIALS[social.name];
            const [shownValue, url] = getShownValueAndUrl(
              social.name,
              social.url
            );
            return (
              <div key={index} className='flex items-center'>
                <SocialIcon className='text-lg' style={getStyle(color, true)} />
                <p className='text-gray-900 mr-2 text-sm'>{shownValue}</p>
                {LinkIcon && (
                  <LinkIcon
                    className='text-lg'
                    style={getStyle(color)}
                    onClick={() => window.open(url)}
                  />
                )}
              </div>
            );
          })}
        </StyledDropdown>
      )}
    </ClickAwayListener>
  );
};

const StyledDropdown = styled.div`
  position: absolute;
  bottom: 48px;
  right: 0px;
  z-index: 1;
  white-space: nowrap;
  padding: 1rem;

  @media (min-width: 768px) {
    bottom: auto;
    top: 40px;
  }
`;
