import styled from 'styled-components';

interface SocialBadgeProps {
  color: string;
  size?: string;
  isActive?: boolean;
}

export const StyledSocialBadge = styled.div<SocialBadgeProps>`
  /** ANIMATE */
  transition: all 0.35s;
  transition-timing-function: cubic-bezier(0.31, -0.105, 0.43, 1.59);

  background-color: ${({ color }) => `${color}20`};
  width: ${({ size }) => size || '30px'};
  height: ${({ size }) => size || '30px'};
  line-height: ${({ size }) => size || '30px'};
  text-align: center;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 28%;
  box-shadow: 0 1px 10px -5px rgba(0, 0, 0, 0.4);
  opacity: 0.99;

  &::before {
    transition: all 0.35s;
    transition-timing-function: cubic-bezier(0.31, -0.105, 0.43, 1.59);
    content: '';
    width: 120%;
    height: 120%;
    position: absolute;
    transform: rotate(45deg);

    /** INACTIVE */
    top: 90%;
    left: -110%;
    background-color: ${({ color }) => color};
  }

  & .icon {
    transform: scale(0.9);
    color: ${({ color }) => color};
    transition: all 0.35s;
    transition-timing-function: cubic-bezier(0.31, -0.105, 0.43, 1.59);
    font-size: calc(${({ size }) => size || '30px'} * 0.62);
    vertical-align: middle;
  }

  &:focus,
  &:hover {
    &::before {
      top: -10%;
      left: -10%;
    }

    & .icon {
      color: #fff;
      transform: scale(1);
    }
  }
`;
