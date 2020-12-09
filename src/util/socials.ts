import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { FaFacebookSquare, FaPhoneSquare } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { MdEmail } from 'react-icons/md';

/**
 * Better solution probably found at:
 * https://fettblog.eu/typescript-better-object-keys/
 */

type AllSocials =
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
