import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { FaFacebookSquare, FaPhoneSquare } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { MdEmail } from 'react-icons/md';
import { FiExternalLink } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';

/**
 * Better solution probably found at:
 * https://fettblog.eu/typescript-better-object-keys/
 */

export type AllSocials =
  | 'email'
  | 'facebook'
  | 'phoneNumber'
  | 'instagram'
  | 'linkedin';

export type SocialsObjType = {
  [K in AllSocials]?: string;
} & {
  email: string;
};
export type SocialsType = {
  [K in AllSocials]: {
    color: string;
    Icon: IconType;
  };
};

export const SOCIALS: SocialsType = {
  email: {
    color: '#DC4A38',
    Icon: MdEmail,
  },
  phoneNumber: {
    color: '#25D366',
    Icon: FaPhoneSquare,
  },
  facebook: {
    color: '#3B5998',
    Icon: FaFacebookSquare,
  },
  instagram: {
    color: '#F77737',
    Icon: AiFillInstagram,
  },
  linkedin: {
    color: '#0077b5',
    Icon: AiFillLinkedin,
  },
};

const getLinkIcon = (social: string) => {
  switch (social) {
    case 'email':
      return IoSend;

    case 'phoneNumber':
      return null;

    default:
      return FiExternalLink;
  }
};

const getMailToUrl = (value: string) =>
  `mailto:${value}?subject=I%20have%20interest%20on%20your%20Jewelers%20Networks%20Ad!&body=This%20is%20the%20ad%20I%20am%20interested%20in%3A%20${window.location.href}`;

const getShownValueAndUrl = (social: AllSocials, value: string) => {
  switch (social) {
    case 'email':
      return [value, getMailToUrl(value)];

    case 'phoneNumber':
      return [value, value];

    case 'facebook':
      return [`facebook.com/${value}`, `http://facebook.com/${value}`];

    case 'linkedin':
      return [`linkedin.com/in/${value}`, `http://linkedin.com/in/${value}`];

    case 'instagram':
      return [`instagram.com/${value}`, `http://instagram.com/${value}`];

    default:
      return [value, value];
  }
};

export const helperFunctions = { getShownValueAndUrl, getLinkIcon };
