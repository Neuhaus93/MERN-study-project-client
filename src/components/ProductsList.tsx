import React from 'react';
import { Link } from 'react-router-dom';
import { ProductsQuery, useProductsQuery } from '../graphql/__generated__';
import { ListTitle } from '../pages/ListTitle';
import { IMAGE_FAKE_ARRAY } from '../util/images';
import ContentLoader from 'react-content-loader';

export const ProductsList: React.FC<{}> = () => {
  const { data } = useProductsQuery();

  return (
    <div className='mx-1 my-2'>
      <ListTitle text='Latest Products' url='/#' />
      <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:gap-3 lg:grid-cols-5'>
        {/* {[...Array(12)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))} */}
        {data
          ? data.products.map((p) => {
              return <ProductCard key={p._id} product={p} />;
            })
          : [...Array(12)].map((_, idx) => <ProductCardSkeleton key={idx} />)}
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: ProductsQuery['products'][number];
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { product } = props;
  const randomIdx = Math.floor(Math.random() * IMAGE_FAKE_ARRAY.length);

  return (
    <div className='w-full max-w-sm overflow-hidden rounded border bg-white shadow'>
      <div className='relative'>
        <Link to={`ad/${product._id}`}>
          <div
            className='h-44 bg-cover bg-no-repeat bg-center overflow-hidden'
            style={{
              backgroundImage: `url(${IMAGE_FAKE_ARRAY[randomIdx]})`,
            }}></div>
        </Link>
        <div
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          className='absolute bottom-0 mb-2 ml-3 px-2 py-1 rounded text-sm text-white'>
          $ <span>{product.price}</span>
        </div>
      </div>
      <div className='p-3'>
        <h3 className='mr-10 text-sm truncate'>
          <Link to={`ad/${product._id}`} className='hover:text-blue-500'>
            {product.title}
          </Link>
        </h3>
        <div className='flex items-start justify-between'>
          <dl>
            <dt className='sr-only'>Location</dt>
            <dd>
              <p className='text-xs text-gray-500'>{product.location}</p>
            </dd>
          </dl>
          <button
            className='outline text-xs text-gray-500 hover:text-blue-500'
            title='Bookmark this ad'>
            <i className='far fa-bookmark'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductCardSkeleton: React.FC = () => (
  <ContentLoader
    preserveAspectRatio='xMinYMin'
    height={238}
    // viewBox='0 0 100% 238'
    className='overflow-hidden w-full px-1'>
    <rect x='0' y='0' rx='10' ry='10' width='100%' height='176' />
    <rect x='10' y='188' rx='5' ry='5' width='80%' height='18' />
    <rect x='10' y='212' rx='5' ry='5' width='100' height='15' />
  </ContentLoader>
);
