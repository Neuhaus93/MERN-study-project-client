import React, { useEffect, useReducer, useState } from 'react';
import tw, { styled } from 'twin.macro';
import queryString from 'query-string';
import {
  SearchPostsQuery,
  SearchProductsQuery,
  useSearchPostsQuery,
  useSearchProductsQuery,
} from '../graphql/__generated__';
import { DefaultWrapper } from '../styles/Wrapper';
import { RouteComponentProps } from 'react-router-dom';
import { ProductCard } from '../components/ProductsList';
import { PostCard } from '../components/PostsList';
import { DefaultFilter } from '../components/Filters';
import { StyledAllList } from '../styles/StyledAllList';

interface SearchScreenProps extends RouteComponentProps {}
export interface FiltersState {
  category: {
    tools: boolean;
    equipment: boolean;
    software: boolean;
  };
  location: string;
}
export type FiltersAction =
  | { type: 'tools' }
  | { type: 'equipment' }
  | { type: 'software' }
  | { type: 'location'; payload: string };
const initialFilters: FiltersState = {
  category: {
    tools: true,
    equipment: true,
    software: true,
  },
  location: 'Everywhere',
};

const filtersReducer = (state: FiltersState, action: FiltersAction) => {
  switch (action.type) {
    case 'tools':
      return {
        ...state,
        category: { ...state.category, tools: !state.category.tools },
      };

    case 'equipment':
      return {
        ...state,
        category: { ...state.category, equipment: !state.category.equipment },
      };

    case 'software':
      return {
        ...state,
        category: { ...state.category, software: !state.category.software },
      };

    case 'location':
      return { ...state, location: action.payload };

    default:
      return state;
  }
};

export const SearchScreen: React.FC<SearchScreenProps> = ({ location }) => {
  const searchTerm = (queryString.parse(location.search).q as string) || '';
  const [filtersState, dispatch] = useReducer(filtersReducer, initialFilters);
  const [filteredProducts, setFilteredProducts] = useState<
    SearchProductsQuery['searchProducts']
  >([]);
  const [filteredPosts, setFilteredPosts] = useState<
    SearchPostsQuery['searchPosts']
  >([]);
  const { data: postsData } = useSearchPostsQuery({
    variables: { searchTerm },
  });
  const { data: productsData } = useSearchProductsQuery({
    variables: { searchTerm },
  });

  // Filter of products and posts
  useEffect(() => {
    const categories = getCategoriesArray(filtersState.category);
    if (productsData && productsData.searchProducts.length > 0) {
      let filteredProducts = productsData.searchProducts.filter((product) =>
        categories.includes(product.category)
      );
      if (filtersState.location !== 'Everywhere') {
        filteredProducts = filteredProducts.filter(
          (product) => product.location === filtersState.location
        );
      }

      setFilteredProducts(filteredProducts);
    }

    if (postsData && postsData.searchPosts.length > 0) {
      const filteredPosts = postsData.searchPosts.filter((post) =>
        categories.includes(post.category)
      );
      setFilteredPosts(filteredPosts);
    }
  }, [productsData, postsData, filtersState]);

  return (
    <DefaultWrapper>
      <StyledAllList>
        <div className='filter'>
          <DefaultFilter filters={filtersState} dispatch={dispatch} />
        </div>
        <div className='content'>
          <h5 className='text-xl mb-4'>
            Searching for: <span className='text-lg'>{searchTerm}</span>
          </h5>

          {filteredProducts.length > 0 ? (
            <>
              <h6 className='text-lg mb-2'>Ads found:</h6>
              <div className='products'>
                {filteredProducts.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </div>
            </>
          ) : (
            <h6>No ads were found</h6>
          )}

          <div className='my-8' />

          {filteredPosts.length > 0 ? (
            <>
              <h6 className='text-lg mb-2'>Posts found:</h6>
              <div>
                {filteredPosts.map((post) => (
                  <PostCard post={post} key={post._id} />
                ))}
              </div>
            </>
          ) : (
            <h6>No posts were found</h6>
          )}
        </div>
      </StyledAllList>
    </DefaultWrapper>
  );
};

const getCategoriesArray = (categoryFilter: {
  tools: boolean;
  equipment: boolean;
  software: boolean;
}) => {
  const categories = [] as string[];

  Object.values(categoryFilter).forEach((e, index) => {
    if (e) {
      switch (index) {
        case 0:
          categories.push('tools');
          return;

        case 1:
          categories.push('equipment');
          return;

        case 2:
          categories.push('software');
          return;

        default:
          return;
      }
    }
  });

  return categories;
};
