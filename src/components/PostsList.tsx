import React, { useMemo } from 'react';
import { FaComment } from 'react-icons/fa';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PostsQuery, usePostsQuery } from '../graphql/__generated__';
import { ListTitle } from '../pages/ListTitle';
import {
  IMAGE_EQUIPMENT,
  IMAGE_NO_AD,
  IMAGE_SOFTWARE,
  IMAGE_TOOLS,
} from '../util/images';
import { ROUTE_POST } from '../util/routes';
import { Image } from './Image';
import { InlineIcon } from './MyIcon';

interface PostsListProps {}

export const PostsList: React.FC<PostsListProps> = () => {
  const { data } = usePostsQuery();

  return (
    <div className='mx-1 my-2'>
      <ListTitle text='Latest Posts' url='/#' />

      {data &&
        data.posts.map((post) => <PostCard key={post._id} post={post} />)}
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

interface PostCardProps {
  post: PostsQuery['posts'][number];
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    _id: postId,
    title,
    category,
    createdAt,
    repliesCount,
    creator,
  } = post;
  const { imgSrc, imgTitle } = useMemo(() => getImg(category), [category]);

  return (
    <StyledPostCard className='flex pr-2 py-1 border-t border-l border-r'>
      <div className='w-12 h-12 p-2 my-0 mr-3'>
        <Image srcList={imgSrc} alt='post' title={imgTitle} />
      </div>
      <div className='flex flex-col justify-around'>
        <h4 className='font-bold'>
          <Link to={`${ROUTE_POST}/${postId}`} className='hover:text-blue-500'>
            {title}
          </Link>
        </h4>
        <div className='text-gray-700 flex text-xs'>
          <p>{creator.fullName}</p>
          <div className='mx-2'>{'·'}</div>
          <Moment date={new Date(createdAt)} format='ll' />
          <div className='mx-2'>{'·'}</div>
          <InlineIcon Icon={FaComment} className='opacity-60 mr-1' />
          <p>{repliesCount}</p>
        </div>
      </div>
    </StyledPostCard>
  );
};

const getImg = (category: string) => {
  switch (category) {
    case 'tools':
      return { imgSrc: IMAGE_TOOLS, imgTitle: 'Tools' };

    case 'equipment':
      return {
        imgSrc: IMAGE_EQUIPMENT,
        imgTitle: 'Equipment',
      };

    case 'software':
      return {
        imgSrc: IMAGE_SOFTWARE,
        imgTitle: 'Software',
      };

    default:
      return {
        imgSrc: IMAGE_NO_AD,
        imgTitle: 'Not Found',
      };
  }
};
