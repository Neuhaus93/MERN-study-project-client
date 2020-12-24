import { Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { useAddUserImageMutation } from '../graphql/__generated__';
import { useAuth } from '../hooks/useAuth';
import { useStorage } from '../hooks/useStorage';
import { ROUTE_LANDING } from '../util/routes';
import { SIDEBAR_BUTTONS } from '../util/sidebar-buttons';
import { CircularProgress } from './CircularProgress';
import { SidebarBtnMobile } from './SidebarButton';
import { UserImage } from './UserImage';

interface ProfilePanelProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const history = useHistory();
  const { currentUser, mongoUser } = useAuth();
  const { logout } = useAuth();
  const [updatingImg, setUpdatingImg] = useState(false);
  const { uploadFile } = useStorage();
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
    <div
      style={{ zIndex: isOpen ? 20 : -1 }}
      className='fixed top-16 bottom-0 left-0 right-0 overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden'>
        <Transition
          show={isOpen}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div
            className='absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
            aria-hidden='true'></div>
        </Transition>
        <section
          className='absolute inset-y-0 right-0 pl-10 max-w-full flex'
          aria-labelledby='slide-over-heading'>
          <Transition
            show={isOpen}
            enter='transform transition ease-in-out duration-500 sm:duration-700'
            enterFrom='translate-x-full'
            enterTo='translate-x-0"'
            leave='transform transition ease-in-out duration-500 sm:duration-700'
            leaveFrom='translate-x-0"'
            leaveTo='translate-x-full'>
            <div className='z-50 relative w-screen max-w-md h-full pr-2'>
              <div className='z-50 absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4'>
                <button
                  onClick={() => setIsOpen(false)}
                  className='rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'>
                  <span className='sr-only'>Close panel</span>
                  {/* <!-- Heroicon name: x --> */}
                  <svg
                    className='h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
              <div className='z-50 h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll'>
                <div className='px-4 sm:px-6 mx-auto'>
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

                  <h6 className='text-lg text-gray-900 text-center -ml-4 mt-2 -mb-1'>
                    {mongoUser?.fullName}
                  </h6>
                </div>
                <div className='mt-6 relative border-t flex-1 px-4 sm:px-6'>
                  {/* <!-- Replace with your content --> */}
                  <div className='absolute inset-0 px-4 sm:px-6'>
                    <div className='h-full' aria-hidden='true'>
                      <div className='flex flex-col space-y-4 mt-4 items-center'>
                        {SIDEBAR_BUTTONS.map((button) => (
                          <SidebarBtnMobile
                            key={button.text}
                            Icon={button.Icon}
                            text={button.text}
                            cb={() => {
                              if (button.url === ROUTE_LANDING) {
                                logout();
                              }
                              setIsOpen(false);
                              history.push(button.url);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* <!-- /End replace --> */}
                </div>
              </div>
            </div>
          </Transition>
        </section>
      </div>
    </div>
  );
};

const Avatar = styled.div`
  ${tw`relative overflow-hidden h-16 w-16 rounded-full`};
  & > div {
    ${tw`w-full h-full`}
  }

  & label {
    ${tw`absolute bottom-0 left-0 w-full h-full p-1 opacity-0 cursor-pointer`};
    transition: all 0.25s;

    & svg {
      ${tw`w-full h-full transform scale-50 inline-flex text-white`}
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
