import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { Divider } from '../components/Divider';
import { ProfileEdit } from '../components/ProfileEdit';
import { ProfilePanel } from '../components/ProfilePanel';
import { ProfileTable } from '../components/ProfileTable';
import { SidebarBtnDefault } from '../components/SidebarButton';
import { UserImage } from '../components/UserImage';
import {
  useUserFavoritesLazyQuery,
  useUserProductsLazyQuery,
} from '../graphql/__generated__';
import { useAuth } from '../hooks/useAuth';
import { StledProfileContainer } from '../styles/StyledAllList';
import { DefaultWrapper } from '../styles/Wrapper';
import {
  ROUTE_EDIT_PROFILE,
  ROUTE_FAVORITES,
  ROUTE_LANDING,
  ROUTE_MY_ADS,
} from '../util/routes';
import { SIDEBAR_BUTTONS } from '../util/sidebar-buttons';

export const ProfileScreen: React.FC = () => {
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
        <div className='content'>
          <Switch>
            <Route component={MyFavorites} path={ROUTE_FAVORITES} />
            <Route component={MyAds} path={ROUTE_MY_ADS} />
            <Route component={ProfileEdit} path={ROUTE_EDIT_PROFILE} />
            <Redirect to={ROUTE_FAVORITES} />
          </Switch>
        </div>
      </StledProfileContainer>
    </DefaultWrapper>
  );
};

const MyFavorites: React.FC = () => {
  const [getUserFavorites, { data }] = useUserFavoritesLazyQuery();
  const { mongoUser } = useAuth();

  useEffect(() => {
    if (mongoUser) {
      getUserFavorites({
        variables: {
          favoritesList: mongoUser.likes || [],
        },
      });
    }
  }, [mongoUser, getUserFavorites]);

  if (!data) {
    return null;
  }

  return (
    <div>
      <ProfileTable data={data.userFavorites} />
    </div>
  );
};

const MyAds: React.FC = () => {
  const [getUserProducts, { data }] = useUserProductsLazyQuery();
  const { mongoUser } = useAuth();

  useEffect(() => {
    if (mongoUser) {
      getUserProducts({
        variables: {
          userId: mongoUser._id,
        },
      });
    }
  }, [mongoUser, getUserProducts]);

  if (!data) {
    return null;
  }

  return (
    <div>
      <ProfileTable data={data.userProducts} />
    </div>
  );
};

const Sidebar: React.FC = () => {
  const { mongoUser, logout } = useAuth();
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
              if (button.url === ROUTE_LANDING) {
                logout();
              }
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
