import React from 'react';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import { RouteComponentProps } from 'react-router-dom';
import { Divider } from '../components/Divider';
import { ProductInfo } from '../components/ProductInfo';
import { SellerInfo } from '../components/SellerInfo';
import '../styles/galleryCss.css';
import { DefaultWrapper } from '../styles/Wrapper';
import { IMAGE_FAKE_ARRAY } from '../util/images';

interface AdScreenProps extends RouteComponentProps<{ id: string }> {}

const images: ReactImageGalleryItem[] = IMAGE_FAKE_ARRAY.map((image) => ({
  original: image,
  thumbnail: image,
}));

export const AdScreen: React.FC<AdScreenProps> = ({ match }) => {
  // const productId = match.params.id;

  return (
    <DefaultWrapper className='md:max-w-screen-md lg:max-w-screen-lg px-4 sm:px-8 pt-2 pb-4 mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-12'>
        <ImageGallery
          items={images}
          showPlayButton={false}
          slideDuration={410}
          showFullscreenButton={false}
        />
        <div className='mt-2'>
          <ProductInfo />
          <Divider width={65} />
          <SellerInfo />
        </div>
      </div>
    </DefaultWrapper>
  );
};
