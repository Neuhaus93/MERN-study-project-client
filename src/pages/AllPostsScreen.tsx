import React, { useEffect, useReducer, useState } from 'react';
import { DefaultFilter } from '../components/Filters';
import { PostCard } from '../components/PostsList';
import { PostsQuery, usePostsQuery } from '../graphql/__generated__';
import { filtersReducer, initialFilters } from '../reducers/filters-reducer';
import { StyledAllList } from '../styles/StyledAllList';
import { DefaultWrapper } from '../styles/Wrapper';
import { getCategoriesArray } from '../util/getCategoriesArray';

interface AllProductsScreenProps {}

export const AllPostsScreen: React.FC<AllProductsScreenProps> = () => {
  const [filtersState, dispatch] = useReducer(filtersReducer, initialFilters);
  const [filteredPosts, setFilteredPosts] = useState<PostsQuery['posts']>([]);
  const { data } = usePostsQuery();

  useEffect(() => {
    const categories = getCategoriesArray(filtersState.category);
    if (data && data.posts.length > 0) {
      const filteredPosts = data.posts.filter((post) =>
        categories.includes(post.category)
      );
      setFilteredPosts(filteredPosts);
    }
  }, [data, filtersState]);

  return (
    <DefaultWrapper>
      <StyledAllList>
        <div className='filter'>
          <DefaultFilter filters={filtersState} dispatch={dispatch} />
        </div>
        <div className='content'>
          <h5 className='text-xl mb-4'>All Posts</h5>
          {filteredPosts.length > 0 ? (
            <div>
              {filteredPosts.map((post) => (
                <PostCard post={post} key={post._id} />
              ))}
            </div>
          ) : (
            <h6>No posts were found</h6>
          )}
        </div>
      </StyledAllList>
    </DefaultWrapper>
  );
};
