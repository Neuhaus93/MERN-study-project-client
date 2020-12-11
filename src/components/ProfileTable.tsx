import React, { useState } from 'react';
import { UserProductsQuery } from '../graphql/__generated__';
import Paginate from 'react-paginate';
import '../styles/pagination.css';

interface ProfileTableProps {
  data: UserProductsQuery['userProducts'];
}

export const ProfileTable: React.FC<ProfileTableProps> = ({ data }) => {
  const [page, setPage] = useState(1);

  return (
    <div>
      {data.map((p, idx) => {
        return <p key={idx}>{p.title}</p>;
      })}
      <div className='paginate flex'>
        <Paginate
          forcePage={page}
          pageCount={20}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(e) => {
            console.log(e.selected);
            setPage(e.selected);
          }}
          nextLabel='&rarr;'
          previousLabel='&larr;'
        />
      </div>
    </div>
  );
};

// const prevIcon: React.FC = () => <div className='border p-2'>{'<'}</div>;
// const nextIcon: React.FC = () => <div className='border p-2'>{'>'}</div>;
