import React, { useState } from 'react';
import { DefaultWrapper } from '../styles/Wrapper';
import tw, { styled } from 'twin.macro';
import { ProfilePanel } from '../components/ProfilePanel';

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
