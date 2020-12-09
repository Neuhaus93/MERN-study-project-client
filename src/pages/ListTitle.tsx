import React from 'react';

interface ListTitleProps {
  text: string;
  url: string;
}

export const ListTitle: React.FC<ListTitleProps> = ({ text, url }) => {
  return (
    <h3 className='text-xl mb-1'>
      {text}
      <a href={url} className='text-blue-500 text-sm ml-2 hover:underline'>
        See All
      </a>
    </h3>
  );
};
