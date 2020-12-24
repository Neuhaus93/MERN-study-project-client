import React, { useEffect, useRef, useState } from 'react';
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
  const [open, setOpen] = useState(false);
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  if (!SOCIALS[social]) {
    return null;
  }
  const { Icon, color } = SOCIALS[social];

  const handleClickAway = () => {
    if (componentIsMounted) {
      setOpen(false);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className='inline-block relative'>
        <StyledSocialBadge
          color={color}
          size={size}
          onClick={() => setOpen(!open)}>
          <div className='icon'>
            <Icon />
          </div>
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
  const [shownValue, url] = getShownValueAndUrl(social, value);
  const LinkIcon = getLinkIcon(social);

  return (
    <div
      className='bg-gray-50 absolute flex items-center bottom-9 left-0 z-10 whitespace-nowrap p-2 shadow-md'
      style={{ left: -38 * index }}>
      <SocialIcon className='mr-2' style={{ color, fontSize: '1.1rem' }} />
      <p className='text-sm text-gray-600'>{shownValue}</p>
      {LinkIcon && (
        <button type='button' onClick={() => window.open(url)}>
          <LinkIcon className='cursor-pointer ml-3' style={{ color }} />
        </button>
      )}
    </div>
  );
};
