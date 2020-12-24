import React, { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { CircularProgress } from '../components/CircularProgress';
import { Divider } from '../components/Divider';
import { ProfileEdit } from '../components/ProfileEdit';
import { ProfilePanel } from '../components/ProfilePanel';
import { ProfileTable } from '../components/ProfileTable';
import { SidebarBtnDefault } from '../components/SidebarButton';
import { UserImage } from '../components/UserImage';
import {
  useAddUserImageMutation,
  useUserFavoritesLazyQuery,
  useUserProductsLazyQuery,
} from '../graphql/__generated__';
import { useAuth } from '../hooks/useAuth';
import { useStorage } from '../hooks/useStorage';
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
      <ProfileTable title='My Favorites' data={data.userFavorites} />
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
      <ProfileTable title='My Ads' data={data.userProducts} />
    </div>
  );
};

const Sidebar: React.FC = () => {
  const history = useHistory();
  const { uploadFile } = useStorage();
  const { mongoUser, logout, currentUser } = useAuth();
  const [updatingImg, setUpdatingImg] = useState(false);
  const [addUserImage, { loading }] = useAddUserImageMutation();

  useEffect(() => {
    loading ? setUpdatingImg(true) : setUpdatingImg(false);
  }, [loading]);

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) return;
    if (!e.target.files || e.target.files.length === 0) return;

    const images = e.target.files;
    setUpdatingImg(true);

    // Upload new image
    uploadFile(`users/${currentUser.uid}`, images[0], true)
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            addUserImage({
              variables: { firebaseId: currentUser.uid, imageSrc: url },
            });
          })
          .catch((err) => console.log('Error getting image url', err));
      })
      .catch((err) => {
        console.log('Error uploading image', err);
      });
  };

  return (
    <SidebarRoot className='sidebar'>
      <div className='mt-8 mx-auto flex flex-col items-center text-center'>
        <Avatar>
          {updatingImg ? (
            <div className='flex justify-center items-center bg-gray-100'>
              <CircularProgress />
            </div>
          ) : (
            <>
              <UserImage isUser />
              <label htmlFor='upload-photo'>
                <input
                  className='hidden'
                  id='upload-photo'
                  name='upload-photo'
                  type='file'
                  accept='image/*'
                  onChange={handleUploadPhoto}
                />
                <FaCamera />
              </label>
            </>
          )}
        </Avatar>

        <h6 className='text-center mt-3'>{mongoUser?.fullName}</h6>
      </div>
      <Divider />
      <div className='flex flex-col w-full'>
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

const Avatar = styled.div`
  ${tw`relative overflow-hidden h-20 w-20 rounded-full`};
  & > div {
    ${tw`w-full h-full`}
  }

  & label {
    ${tw`bg-gray-50 absolute bottom-0 left-0 w-full p-1 opacity-0 cursor-pointer`};
    transition: all 0.25s;
    height: 54%;

    & svg {
      ${tw`w-3/4 h-3/4 inline-flex text-white`}
    }

    &:hover {
      ${tw`opacity-70`};
      background: rgba(0, 0, 0, 0.92);
    }
  }

  & input {
    ${tw`hidden`}
  }
`;
