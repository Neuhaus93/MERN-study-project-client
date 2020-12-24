import React, { useState } from 'react';
import Moment from 'react-moment';
import Paginate from 'react-paginate';
import { Link } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { UserProductsQuery } from '../graphql/__generated__';
import '../styles/pagination.css';
import { ROUTE_AD } from '../util/routes';
import { MyImage } from './MyImage';

interface ProfileTableProps {
  data: UserProductsQuery['userProducts'];
  title: string;
}

interface TableProduct {
  product: UserProductsQuery['userProducts'][number];
}

const ITEMS_PER_PAGE = 12;

export const ProfileTable: React.FC<ProfileTableProps> = ({ data, title }) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div>
      <h2 className='text-center text-3xl font-bold my-4'>{title}</h2>
      <div className='shadow-md rounded-md overflow-hidden max-w-screen-lg mx-auto'>
        <StyledHeader>
          <p className='col-span-4 pl-4'>Items</p>
          <p className='hidden sm:block text-center'>Post Date</p>
          <p className='hidden sm:block text-center'>Category</p>
        </StyledHeader>

        <div className='bg-white'>
          <div className='sm:hidden'>
            {data
              .slice(
                currentPage * ITEMS_PER_PAGE,
                (currentPage + 1) * ITEMS_PER_PAGE
              )
              .map((p) => (
                <RowMobile key={p._id} product={p} />
              ))}
          </div>
          <div className='hidden sm:block'>
            {data
              .slice(
                currentPage * ITEMS_PER_PAGE,
                (currentPage + 1) * ITEMS_PER_PAGE
              )
              .map((p) => (
                <RowDefault key={p._id} product={p} />
              ))}
          </div>
        </div>

        <div className='flex justify-end py-2 px-4 bg-white'>
          <Paginate
            containerClassName='products-table-paginate'
            pageCount={Math.ceil(data.length / ITEMS_PER_PAGE)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={1}
            onPageChange={(e) => {
              setCurrentPage(e.selected);
            }}
            nextLabel='>'
            previousLabel='<'
          />
        </div>
      </div>
    </div>
  );
};

const RowMobile: React.FC<TableProduct> = (props) => {
  const {
    product: { title, images, category, createdAt },
  } = props;

  return (
    <div className='border-gray-300 border-b'>
      <h6 className='m-2'>{title}</h6>
      <div className='grid grid-cols-5'>
        <div className='h-36 rounded-tr-md overflow-hidden col-span-3'>
          <MyImage alt='product' cover srcList={images[0]} />
        </div>
        <div className='flex flex-col justify-center pl-4 col-span-2'>
          <p className='font-bold'>Post Date:</p>
          <p className='ml-1 uppercase text-sm'>
            <Moment date={new Date(createdAt)} format='ll' />
          </p>
          <p className='font-bold mt-2'>Category:</p>
          <p className='ml-1 uppercase text-sm'>{category}</p>
        </div>
      </div>
    </div>
  );
};

const RowDefault: React.FC<TableProduct> = (props) => {
  const {
    product: { _id, title, images, category, createdAt },
  } = props;

  return (
    <div className='grid grid-cols-6 border-gray-300 border-b'>
      <div className='col-span-1 h-28 xl:h-32'>
        <Link to={`${ROUTE_AD}/${_id}`}>
          <MyImage alt='product' cover srcList={images[0]} />
        </Link>
      </div>
      <div className='col-span-3 text-sm my-auto pl-3 pr-2'>
        <Link
          to={`${ROUTE_AD}/${_id}`}
          className='inline-block hover:text-blue-500'>
          <p>{title}</p>
        </Link>
      </div>
      <p className='col-span-1 text-sm text-center my-auto'>
        <Moment date={new Date(createdAt)} format='ll' />
      </p>
      <p className='col-span-1 uppercase text-sm text-center my-auto'>
        {category}
      </p>
    </div>
  );
};

const StyledHeader = styled.div`
  ${tw`grid grid-cols-6 text-sm py-3 bg-gray-200`}
  ${tw`text-gray-900 font-bold items-center border-gray-300 border-b`}
`;
