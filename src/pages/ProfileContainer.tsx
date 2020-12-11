import React, { useState } from 'react';
import { DefaultWrapper } from '../styles/Wrapper';
import tw, { styled } from 'twin.macro';
import { ProfilePanel } from '../components/ProfilePanel';
import { FaUserCircle, FaHeart } from 'react-icons/fa';
import { IoMdPricetag } from 'react-icons/io';
import { MdCardMembership } from 'react-icons/md';
import {
  ROUTE_EDIT_PROFILE,
  ROUTE_FAVORITES,
  ROUTE_MY_ADS,
} from '../util/routes';

export const ProfileContainer: React.FC = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(true);

  return (
    <DefaultWrapper>
      <StyledGrid>
        <div className='block sm:hidden'>
          <ProfilePanel isOpen={menuIsOpen} setIsOpen={setMenuIsOpen} />
        </div>
        {!menuIsOpen && (
          <button
            className='btn open'
            onClick={() => {
              console.log('testin');
              setMenuIsOpen((prev) => !prev);
            }}>
            Open Menu
          </button>
        )}
      </StyledGrid>
    </DefaultWrapper>
  );
};

const StyledGrid = styled.div`
  ${tw`flex w-full box-border flex-wrap relative`}

  & .left {
  }

  & .open {
    ${tw`border fixed bottom-16 right-4`}
  }
`;

// const sidebarButtons = [
//   {
//     text: 'Profile',
//     Icon: <FaUserCircle />,
//     callback: () => {
//       history.push(ROUTE_EDIT_PROFILE);
//     },
//   },
//   {
//     text: 'My Ads',
//     Icon: <IoMdPricetag />,
//     callback: () => {
//       history.push(ROUTE_MY_ADS);
//     },
//   },
//   {
//     text: 'Favorites',
//     Icon: <FaHeart />,
//     callback: () => {
//       history.push(ROUTE_FAVORITES);
//     },
//   },
//   {
//     text: 'Subscription',
//     Icon: <MdCardMembership />,
//     callback: () => {
//       console.log('Subscription clicked');
//     },
//   },
// ];
