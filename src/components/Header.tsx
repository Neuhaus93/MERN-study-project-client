import { Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import {
  ROUTE_LOGIN,
  ROUTE_PROFILE,
  ROUTE_REGISTER,
  ROUTE_SEARCH,
} from '../util/routes';
import { UserImage } from './UserImage';

interface HeaderProps {}

const NAV_PAGES = [{ title: 'Post an Ad', url: '/#' }];
const selectedStyle =
  'bg-gray-900 hover:text-blue-100 text-white px-3 py-2 rounded-md text-sm font-medium hover:opacity-90';
const notSelectedStyle =
  'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';

export const Header: React.FC<HeaderProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();

  // DEBUG
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const currentPage = 'Post an Ad';

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            {/* TODO: REMOVE THIS TAG */}
            <span className='text-white'>{windowWidth}</span>
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
              {currentUser ? <LoggedInDefault /> : <LoggedOutDefault />}
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

            {/* AUTHENTICATED PART */}
            {currentUser ? (
              <LoggedInMobile close={() => setIsOpen(false)} />
            ) : (
              <LoggedOutMobile close={() => setIsOpen(false)} />
            )}
          </div>
        )}
      </Transition>
    </nav>
  );
};

const LoggedOutMobile: React.FC<{ close: () => void }> = ({ close }) => {
  return (
    <div className='py-3 border-t border-gray-700'>
      <div className='mt-3 px-2 space-y-1'>
        <Link
          to={ROUTE_LOGIN}
          onClick={close}
          className='block px-3 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'>
          Sign In
        </Link>
        <Link
          to={ROUTE_REGISTER}
          onClick={close}
          className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

const LoggedInMobile: React.FC<{ close: () => void }> = ({ close }) => {
  const { logout, mongoUser } = useAuth();

  return (
    <div className='pt-4 pb-3 border-t border-gray-700'>
      <div className='flex items-center px-5'>
        <div className='flex-shrink-0'>
          <UserImage size={8} isUser />
        </div>
        <div className='ml-3'>
          <div className='text-base font-medium leading-none text-white'>
            {mongoUser?.fullName || '...'}
          </div>
          <div className='text-sm font-medium leading-none text-gray-400'>
            {mongoUser?.email || '...'}
          </div>
        </div>
      </div>
      <div className='mt-3 px-2 space-y-1'>
        <Link
          to={ROUTE_PROFILE}
          onClick={close}
          className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'>
          Your Profile
        </Link>
        <button
          className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 w-full text-left'
          onClick={() => {
            logout();
            close();
          }}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

const LoggedInDefault: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div className='ml-3 relative'>
      <div>
        <button
          className='max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
          id='user-menu'
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup='true'>
          <span className='sr-only'>Open user menu</span>
          <UserImage size={8} isUser />
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
            <Link
              to={ROUTE_PROFILE}
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
              Your Profile
            </Link>
            <button
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'
              onClick={logout}>
              Sign Out
            </button>
          </div>
        )}
      </Transition>
    </div>
  );
};

const LoggedOutDefault: React.FC = () => {
  return (
    <div className='flex space-x-2 ml-2'>
      <Link to={ROUTE_LOGIN}>
        <button className='text-white hover:text-blue-100 text-sm font-medium px-3 py-2'>
          Sign In
        </button>
      </Link>
      <Link to={ROUTE_REGISTER}>
        <button className='bg-gray-900 hover:text-blue-100 text-white px-3 py-2 rounded-md text-sm font-medium hover:opacity-90'>
          Sign Up
        </button>
      </Link>
    </div>
  );
};

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [focus, setFocus] = useState(false);
  const history = useHistory();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      let term = searchTerm;
      setSearchTerm('');
      history.push(`${ROUTE_SEARCH}?q=${term}`);
    }
  };

  return (
    <StyledForm
      focus={focus}
      onSubmit={handleSearch}
      className='bg-gray-100 relative w-96 h-8 rounded-3xl flex items-center px-4'>
      <input
        placeholder='Search for anything...'
        alt='search'
        value={searchTerm}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        maxLength={50}
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

const StyledForm = styled.form<{ focus: boolean }>`
  transition: all 0.2s;
  box-shadow: ${(props) =>
    props.focus ? '0 0 6px rgba(255, 255, 255, 0.55)' : undefined};
`;
