import { FaUserCircle, FaHeart } from 'react-icons/fa';
import { IoMdPricetag } from 'react-icons/io';
import { MdCardMembership } from 'react-icons/md';
import {
  ROUTE_EDIT_PROFILE,
  ROUTE_FAVORITES,
  ROUTE_MY_ADS,
} from '../util/routes';

export const SIDEBAR_BUTTONS = [
  {
    text: 'Profile',
    Icon: FaUserCircle,
    url: ROUTE_EDIT_PROFILE,
  },
  {
    text: 'My Ads',
    Icon: IoMdPricetag,
    url: ROUTE_MY_ADS,
  },
  {
    text: 'Favorites',
    Icon: FaHeart,
    url: ROUTE_FAVORITES,
  },
  {
    text: 'Subscription',
    Icon: MdCardMembership,
    url: '/#',
  },
];
