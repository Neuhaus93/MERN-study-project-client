import { Transition } from '@headlessui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SIDEBAR_BUTTONS } from '../util/profile-buttons';
import { InlineIcon } from './MyIcon';
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
  const { mongoUser } = useAuth();

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
            <div className='relative w-screen max-w-md h-full pr-2'>
              <div className='absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4'>
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
              <div className='h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll'>
                <div className='px-4 sm:px-6 mx-auto'>
                  <UserImage size={20} isUser />
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
                          <div className='w-full pr-16 pl-10 flex items-center text-xl text-gray-800'>
                            <button
                              className='btn w-full h-full flex'
                              onClick={() => {
                                setIsOpen(false);
                                history.push(button.url);
                              }}>
                              <InlineIcon Icon={button.Icon} />
                              <p className='pl-4 text-lg'>{button.text}</p>
                            </button>
                          </div>
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
