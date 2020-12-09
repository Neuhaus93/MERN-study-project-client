import React, { useRef, useState } from 'react';
import { StyledSocialBadge } from '../styles/StyledSocialBadge';
import { SOCIALS, SocialsObjType } from '../util/socials';
import { RiSendPlaneFill, RiExternalLinkLine } from 'react-icons/ri';
import { IoSend } from 'react-icons/io5';
import { FiExternalLink } from 'react-icons/fi';
import ClickAwayListener from 'react-click-away-listener';

interface SocialBadgesProps {
  size?: string;
  socialsObj: SocialsObjType;
}

export const SocialBadges: React.FC<SocialBadgesProps> = (props) => {
  const { size, socialsObj } = props;
  const index = useRef(-1);

  return (
    <>
      {Object.keys(socialsObj).map((key) => {
        if (socialsObj[key]) {
          index.current = index.current + 1;
          return (
            <Badge
              size={size}
              social={key as keyof SocialsObjType}
              index={index.current}
              value={socialsObj[key]}
              key={index.current}
            />
          );
        } else return null;
      })}
    </>
  );
};

interface BadgeProps {
  social: keyof SocialsObjType;
  value: string;
  index: number;
  size?: string;
}

const Badge: React.FC<BadgeProps> = (props) => {
  const { size, social, value, index } = props;
  const { Icon, color } = SOCIALS[social];
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className='inline-block relative'>
        <StyledSocialBadge color={color} size={size}>
          <button
            onClick={() => setOpen(!open)}
            className='w-full h-full flex justify-center items-center outline-none'>
            <Icon className='icon' />
          </button>
        </StyledSocialBadge>
        {open && (
          <BadgeDropdown
            social={social}
            value={value}
            color={color}
            Icon={Icon}
            index={index}
          />
        )}
      </div>
    </ClickAwayListener>
  );
};

interface DropdownProps {
  social: string;
  value: string;
  color: string;
  Icon: any;
  index: number;
}

const BadgeDropdown: React.FC<DropdownProps> = (props) => {
  const { social, value, color, Icon, index } = props;
  const getUrl = (social: string, value: string) => {
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

  const getMailToUrl = (value: string) => {
    return `mailto:${value}?subject=I%20have%20interest%20on%20your%20Jewelers%20Networks%20Ad!&body=This%20is%20the%20ad%20I%20am%20interested%20in%3A%20${window.location.href}`;
  };

  return (
    <div
      className='bg-gray-50 absolute flex items-center bottom-10 left-0 z-10 whitespace-nowrap p-2 shadow-md'
      style={{ left: -38 * index }}>
      <Icon className='mr-2' style={{ color, fontSize: '1.1rem' }} />
      <p className='text-sm text-gray-600'>{getUrl(social, value)[0]}</p>
      {social === 'email' ? (
        <IoSend
          className='cursor-pointer ml-3'
          style={{ color }}
          onClick={() => window.open(getUrl(social, value)[1])}
        />
      ) : (
        social !== 'phoneNumber' && (
          <FiExternalLink
            className='cursor-pointer ml-3'
            style={{ color }}
            onClick={() => window.open(getUrl(social, value)[1])}
          />
        )
      )}
    </div>
  );
};
