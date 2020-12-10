import React from 'react';
import ImageGallery from 'react-image-gallery';
import { RouteComponentProps } from 'react-router-dom';
import { Divider } from '../components/Divider';
import { ProductInfo } from '../components/ProductInfo';
import { SellerInfo } from '../components/SellerInfo';
import { useProductQuery } from '../graphql/__generated__';
import '../styles/galleryCss.css';
import { DefaultWrapper } from '../styles/Wrapper';

interface AdScreenProps extends RouteComponentProps<{ id: string }> {}

// const images: ReactImageGalleryItem[] = IMAGE_FAKE_ARRAY.map((image) => ({
//   original: image,
//   thumbnail: image,
// }));

export const AdScreen: React.FC<AdScreenProps> = ({ match }) => {
  const productId = match.params.id;
  const { data, error } = useProductQuery({ variables: { productId } });

  if (!data) {
    return (
      <DefaultWrapper className='md:max-w-screen-md lg:max-w-screen-lg px-4 sm:px-8 pt-2 pb-4 mx-auto'>
        Loading...
        {error && <p>{error.message}</p>}
      </DefaultWrapper>
    );
  }

  return (
    <DefaultWrapper className='md:max-w-screen-md lg:max-w-screen-lg px-4 sm:px-8 pt-2 pb-4 mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-12'>
        <ImageGallery
          items={data.product.images.map((e) => ({
            original: e,
            thumbnail: e,
          }))}
          showPlayButton={false}
          slideDuration={410}
          showFullscreenButton={false}
        />
        <div className='mt-2'>
          <ProductInfo product={data.product} />
          <Divider width={65} />
          <SellerInfo seller={data.product.creator} />
        </div>
      </div>
    </DefaultWrapper>
  );
};
