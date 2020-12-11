import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { DefaultFilter } from '../components/Filters';
import { PostCard } from '../components/PostsList';
import { ProductCard } from '../components/ProductsList';
import {
  SearchPostsQuery,
  SearchProductsQuery,
  useSearchPostsQuery,
  useSearchProductsQuery,
} from '../graphql/__generated__';
import { useFilterReducer } from '../reducers/filters-reducer';
import { StyledAllList } from '../styles/StyledAllList';
import { DefaultWrapper } from '../styles/Wrapper';
import { getCategoriesArray } from '../util/getCategoriesArray';

interface SearchScreenProps extends RouteComponentProps {}

export const SearchScreen: React.FC<SearchScreenProps> = ({ location }) => {
  const searchTerm = (queryString.parse(location.search).q as string) || '';
  const [filtersState, dispatch] = useFilterReducer();
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
          <DefaultFilter
            filters={filtersState}
            dispatch={dispatch}
            categoryFilter
          />
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
