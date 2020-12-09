import React, { Suspense } from 'react';
import { useImage } from 'react-image';
import { IMAGE_BROKEN } from '../util/images';
import { CircularProgress } from './CircularProgress';

interface ImageProps {
  srcList: string[] | string;
  alt: string;
  cover?: boolean;
  title?: string;
  onClick?: () => void;
}

export const Image: React.FC<ImageProps> = (props) => {
  const { srcList, alt, cover, onClick, title } = props;

  const style: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  };

  return (
    <Suspense
      fallback={
        <div style={style}>
          <CircularProgress />
        </div>
      }>
      <ImageComponent
        srcList={srcList}
        alt={alt}
        cover={cover}
        onClick={onClick}
        title={title}
      />
    </Suspense>
  );
};

const ImageComponent: React.FC<ImageProps> = (props) => {
  const { srcList, alt, cover, title, onClick } = props;
  const realSrcList = [IMAGE_BROKEN];
  if (typeof srcList === 'string') {
    realSrcList.unshift(srcList);
  } else {
    realSrcList.unshift(...srcList);
  }

  const { src } = useImage({
    srcList: realSrcList,
  });

  const style: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: cover ? 'cover' : 'contain',
  };

  return (
    <img src={src} alt={alt} style={style} onClick={onClick} title={title} />
  );
};
