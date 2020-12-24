import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { MyImage } from './MyImage';
import { FaUser } from 'react-icons/fa';
import tw, { styled } from 'twin.macro';

interface UserImageProps {
  size?: number;
  isUser?: boolean;
  src?: string | null;
  square?: boolean;
}

export const UserImage: React.FC<UserImageProps> = ({
  size,
  square,
  src,
  isUser,
}) => {
  const { mongoUser } = useAuth();
  const photoSrc = isUser ? mongoUser?.photo : src;

  return (
    <StyledAvatar size={size} square={square}>
      {photoSrc ? <MyImage srcList={photoSrc} alt='user' cover /> : <FaUser />}
    </StyledAvatar>
  );
};

const StyledAvatar = styled.div<UserImageProps>`
  height: ${({ size }) => (size ? size / 4 + 'rem' : '100%')};
  width: ${({ size }) => (size ? size / 4 + 'rem' : '100%')};
  ${({ square }) => (square ? tw`rounded` : tw`rounded-full`)}
  ${tw`overflow-hidden bg-gray-100 flex justify-center items-center`}
`;
