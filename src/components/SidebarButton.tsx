import React from 'react';
import { IconType } from 'react-icons';
import { InlineIcon } from './MyIcon';

interface SidebarButtonProps {
  Icon: IconType;
  text: string;
  cb?: () => void;
}

export const SidebarBtnMobile: React.FC<SidebarButtonProps> = (props) => {
  const { Icon, text, cb } = props;

  return (
    <div className='w-full pr-16 pl-10 flex items-center text-xl text-gray-800'>
      <button className='btn w-full h-full flex' onClick={cb}>
        <InlineIcon Icon={Icon} />
        <p className='pl-4 text-lg'>{text}</p>
      </button>
    </div>
  );
};

export const SidebarBtnDefault: React.FC<SidebarButtonProps> = (props) => {
  const { Icon, text, cb } = props;

  return (
    <button
      className='btn rounded-none w-full py-4 pl-4 2xl:pl-8 flex items-center text-xl text-gray-800 hover:bg-gray-800 hover:text-white hover:cursor-pointer'
      onClick={cb}>
      <InlineIcon Icon={Icon} />
      <p className='pl-4 text-base'>{text}</p>
    </button>
  );
};
