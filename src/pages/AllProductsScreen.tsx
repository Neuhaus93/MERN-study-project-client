import React, { useEffect, useState } from 'react';
import { DefaultFilter } from '../components/Filters';
import { ProductCard } from '../components/ProductsList';
import { ProductsQuery, useProductsQuery } from '../graphql/__generated__';
import { useFilterReducer } from '../reducers/filters-reducer';
import { StyledAllList } from '../styles/StyledAllList';
import { DefaultWrapper } from '../styles/Wrapper';
import { getCategoriesArray } from '../util/getCategoriesArray';

interface AllProductsScreenProps {}

export const AllProductsScreen: React.FC<AllProductsScreenProps> = () => {
  const [filtersState, dispatch] = useFilterReducer();
  const [filteredProducts, setFilteredProducts] = useState<
    ProductsQuery['products']
  >([]);
  const { data } = useProductsQuery();

  // Filter of products and posts
  useEffect(() => {
    const categories = getCategoriesArray(filtersState.category);
    if (data && data.products.length > 0) {
      let filteredProducts = data.products.filter((product) =>
        categories.includes(product.category)
      );
      if (filtersState.location !== 'Everywhere') {
        filteredProducts = filteredProducts.filter(
          (product) => product.location === filtersState.location
        );
      }

      setFilteredProducts(filteredProducts);
    }
  }, [data, filtersState]);

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
          <h5 className='text-xl mb-4'>All Ads</h5>

          {filteredProducts.length > 0 ? (
            <div className='products'>
              {filteredProducts.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          ) : (
            <h6>No ads were found</h6>
          )}
        </div>
      </StyledAllList>
    </DefaultWrapper>
  );
};
