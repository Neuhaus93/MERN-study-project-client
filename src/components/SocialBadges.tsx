import React, { useRef, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { StyledSocialBadge } from '../styles/StyledSocialBadge';
import {
  AllSocials,
  helperFunctions,
  SOCIALS,
  SocialsObjType,
} from '../util/socials';

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
  social: AllSocials;
  value: string;
  color: string;
  Icon: any;
  index: number;
}

const BadgeDropdown: React.FC<DropdownProps> = (props) => {
  const { social, value, color, Icon: SocialIcon, index } = props;
  const { getShownValueAndUrl, getLinkIcon } = helperFunctions;
  const LinkIcon = getLinkIcon(social);

  return (
    <div
      className='bg-gray-50 absolute flex items-center bottom-10 left-0 z-10 whitespace-nowrap p-2 shadow-md'
      style={{ left: -38 * index }}>
      <SocialIcon className='mr-2' style={{ color, fontSize: '1.1rem' }} />
      <p className='text-sm text-gray-600'>
        {getShownValueAndUrl(social, value)[0]}
      </p>
      {LinkIcon && (
        <LinkIcon className='cursor-pointer ml-3' style={{ color }} />
      )}
    </div>
  );
};
