import React from 'react';
import Moment from 'react-moment';
import { IMAGE_EQUIPMENT } from '../util/images';
import { Image } from './Image';
import { FaComment } from 'react-icons/fa';
import styled from 'styled-components';
import { ListTitle } from '../pages/ListTitle';
import { InlineIcon } from './MyIcon';

interface PostsListProps {}

export const PostsList: React.FC<PostsListProps> = () => {
  return (
    <div className='mx-1 my-2'>
      <ListTitle text='Latest Posts' url='/#' />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};
const StyledPostCard = styled.div`
  &:nth-child(odd) {
    background: #f0eff1;
  }
  &:last-child {
    border-bottom-width: 1px;
  }
`;

const PostCard: React.FC<{}> = () => {
  const imageUrl = IMAGE_EQUIPMENT;

  return (
    <StyledPostCard className='flex pr-2 py-1 border-t border-l border-r'>
      <div className='w-12 h-12 p-2 my-0 mr-3'>
        <Image srcList={imageUrl} alt='post' />
      </div>
      <div>
        <h4 className='font-bold'>Post Title</h4>
        <div className='flex text-sm text-gray-700'>
          <p>Lucas Neuhaus</p>
          <div className='mx-2'>{'·'}</div>
          <Moment date={new Date()} format='ll' />
          <div className='mx-2'>{'·'}</div>
          <InlineIcon Icon={FaComment} className='opacity-60 mr-1' />
          <p>10</p>
        </div>
      </div>
    </StyledPostCard>
  );
};
