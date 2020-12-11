import React, { useState } from 'react';
import { DefaultWrapper } from '../styles/Wrapper';
import tw, { styled } from 'twin.macro';
import { ProfilePanel } from '../components/ProfilePanel';
import { StledProfileContainer } from '../styles/StyledAllList';
import { UserImage } from '../components/UserImage';
import { useAuth } from '../hooks/useAuth';
import { SIDEBAR_BUTTONS } from '../util/profile-buttons';
import { SidebarBtnDefault } from '../components/SidebarButton';
import { useHistory } from 'react-router-dom';
import { Divider } from '../components/Divider';

export const ProfileContainer: React.FC = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <DefaultWrapper>
      <StledProfileContainer>
        <div className='block sm:hidden'>
          <ProfilePanel isOpen={menuIsOpen} setIsOpen={setMenuIsOpen} />
        </div>
        {!menuIsOpen && (
          <button
            className='btn open-button sm:hidden'
            onClick={() => {
              setMenuIsOpen((prev) => !prev);
            }}>
            Open Menu
          </button>
        )}
        <Sidebar />
        <div className='content'></div>
      </StledProfileContainer>
    </DefaultWrapper>
  );
};

const Sidebar: React.FC = () => {
  const { mongoUser } = useAuth();
  const history = useHistory();

  return (
    <SidebarRoot className='sidebar'>
      <div className='mt-8 mx-auto flex flex-col items-center text-center'>
        <UserImage size={18} isUser />
        <h6 className='text-center mt-3'>{mongoUser?.fullName}</h6>
      </div>
      <Divider />
      <div className='flex flex-col space-y-3 w-full'>
        {SIDEBAR_BUTTONS.map((button) => (
          <SidebarBtnDefault
            key={button.text}
            Icon={button.Icon}
            text={button.text}
            cb={() => {
              history.push(button.url);
            }}
          />
        ))}
      </div>
    </SidebarRoot>
  );
};

const SidebarRoot = styled.div`
  min-height: calc(100vh - 64px - 48px);
  border-right: 1px solid #f5f5f5;
  ${tw`flex flex-col items-center justify-start w-full h-full bg-white`}
`;
