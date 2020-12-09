import styled from 'styled-components';
import { Transition } from '@headlessui/react';
import { FiSearch } from 'react-icons/fi';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {}

const NAV_PAGES = [
  { title: 'Dashboard', url: '/#' },
  { title: 'Team', url: '/#' },
  // { title: 'Projects', url: '/#' },
  // { title: 'Calendar', url: '/#' },
  // { title: 'Reports', url: '/#' },
];
const NAV_PROFILE = ['Your Profile', 'Sign out'];
const selectedStyle =
  'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium';
const notSelectedStyle =
  'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';

export const Header: React.FC<HeaderProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPage = 'Dashboard';

  return (
    <nav className='bg-gray-800 relative'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link className='flex-shrink-0' to='/'>
              <img
                className='h-8 w-8'
                src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                alt='Workflow'
              />
            </Link>
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                {NAV_PAGES.map((page, index) => {
                  return (
                    <a
                      key={index}
                      href={page.url}
                      className={
                        page.title === currentPage
                          ? selectedStyle
                          : notSelectedStyle
                      }>
                      {page.title}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='hidden md:block'>
            <div className='ml-4 flex items-center md:ml-6'>
              <SearchBar />
              {/* <!-- Profile dropdown --> */}
              <div className='ml-3 relative'>
                <div>
                  <button
                    className='max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                    id='user-menu'
                    onClick={() => setIsOpen(!isOpen)}
                    aria-haspopup='true'>
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='h-8 w-8 rounded-full'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt=''
                    />
                  </button>
                </div>
                <Transition
                  show={isOpen}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'>
                  {(ref) => (
                    <div
                      ref={ref}
                      className='z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5'
                      role='menu'
                      aria-orientation='vertical'
                      aria-labelledby='user-menu'>
                      {NAV_PROFILE.map((e, index) => (
                        <a
                          key={index}
                          href='/#'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                          {e}
                        </a>
                      ))}
                    </div>
                  )}
                </Transition>
              </div>
            </div>
          </div>
          <div className='-mr-2 flex md:hidden'>
            {/* <!-- Mobile menu button --> */}
            <button
              className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
              onClick={() => setIsOpen(!isOpen)}>
              <span className='sr-only'>Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>

              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
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
        </div>
      </div>

      <Transition
        show={isOpen}
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-100'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'>
        {(ref) => (
          <div
            ref={ref}
            className={`bg-gray-800 md:hidden absolute top-full left-0 right-0 z-10`}>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
              {NAV_PAGES.map((page, index) => {
                return (
                  <a
                    key={index}
                    href={page.url}
                    className={
                      page.title === currentPage
                        ? `${selectedStyle} block`
                        : `${notSelectedStyle} block`
                    }>
                    {page.title}
                  </a>
                );
              })}
            </div>
            <div className='pt-4 pb-3 border-t border-gray-700'>
              <div className='flex items-center px-5'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-10 w-10 rounded-full'
                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    alt=''
                  />
                </div>
                <div className='ml-3'>
                  <div className='text-base font-medium leading-none text-white'>
                    Tom Cook
                  </div>
                  <div className='text-sm font-medium leading-none text-gray-400'>
                    tom@example.com
                  </div>
                </div>
              </div>
              <div className='mt-3 px-2 space-y-1'>
                {NAV_PROFILE.map((e, index) => (
                  <a
                    key={index}
                    href='/#'
                    className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'>
                    {e}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
};

const StyledForm = styled.form<{ focus: boolean }>`
  box-shadow: ${(props) =>
    props.focus ? '0 0 6px rgba(255, 255, 255, 0.55)' : undefined};
`;

const SearchBar: React.FC = () => {
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Searched term: ' + value);
  };

  return (
    <StyledForm
      focus={focus}
      onSubmit={handleSubmit}
      className='bg-gray-100 relative w-96 h-8 rounded-3xl flex items-center px-4'>
      <input
        placeholder='Search for anything...'
        alt='search'
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        maxLength={50}
        // style={{ outlineColor: 'transparent' }}
        className='text-sm w-full outline-none bg-transparent'
      />
      <button
        className='absolute text-lg right-5 bottom-1/2 transform translate-y-1/2 opacity-80'
        type='submit'>
        <FiSearch />
      </button>
    </StyledForm>
  );
};
