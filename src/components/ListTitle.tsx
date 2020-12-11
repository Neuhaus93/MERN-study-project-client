import React from 'react';
import { Link } from 'react-router-dom';

interface ListTitleProps {
  text: string;
  url: string;
}

export const ListTitle: React.FC<ListTitleProps> = ({ text, url }) => {
  return (
    <h3 className='text-xl mb-1'>
      {text}
      <Link to={url} className='text-blue-500 text-sm ml-4 hover:underline'>
        See All
      </Link>
    </h3>
  );
};
