import React from 'react';
import { IconType } from 'react-icons';

interface MyIconProps {
  Icon: IconType;
  className?: string;
}

export const InlineIcon: React.FC<MyIconProps> = ({ Icon, className }) => {
  return (
    <div className={`inline-block h-full my-auto ${className}`}>
      <Icon />
    </div>
  );
};

// interface ButtonIconProps extends MyIconProps {
//   handleClick?: () => void;
// }

// export const ButtonIcon: React.FC<ButtonIconProps> = (props) => {
//   const {Icon, className, handleClick} = props;

//   return (
//     <button className={`${className}`} onClick={handleClick}>
//       <Icon />
//     </button>
//   )
// }
