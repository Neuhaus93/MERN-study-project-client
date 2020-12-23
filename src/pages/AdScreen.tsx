import React from 'react';
import ContentLoader from 'react-content-loader';
import ImageGallery from 'react-image-gallery';
import { RouteComponentProps } from 'react-router-dom';
import { Divider } from '../components/Divider';
import { ProductInfo } from '../components/ProductInfo';
import { SellerInfo } from '../components/SellerInfo';
import { useProductQuery } from '../graphql/__generated__';
import '../styles/galleryCss.css';
import { DefaultWrapper } from '../styles/Wrapper';
import { IMAGE_NO_IMAGE } from '../util/images';

interface AdScreenProps extends RouteComponentProps<{ id: string }> {}

export const AdScreen: React.FC<AdScreenProps> = ({ match }) => {
  const productId = match.params.id;
  const { data, error } = useProductQuery({ variables: { productId } });

  if (!data) {
    return (
      <DefaultWrapper className='md:max-w-screen-md lg:max-w-screen-lg px-4 sm:px-8 pt-2 pb-4 mx-auto'>
        <Loading />
        {error && <p>{error.message}</p>}
      </DefaultWrapper>
    );
  }

  return (
    <DefaultWrapper className='container lg:max-w-screen-lg px-4 sm:px-8 pt-2 pb-4 mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-12'>
        <div>
          <ImageGallery
            items={
              data.product.images.length > 0
                ? data.product.images.map((e) => ({
                    original: e,
                    thumbnail: e,
                  }))
                : [{ original: IMAGE_NO_IMAGE, thumbnail: IMAGE_NO_IMAGE }]
            }
            showPlayButton={false}
            slideDuration={410}
            showFullscreenButton={false}
          />
          <div className='hidden md:block'>
            <Divider width={65} />
            <SellerInfo seller={data.product.creator} />
          </div>
        </div>
        <div className='mt-2'>
          <ProductInfo product={data.product} />
          <div className='block md:hidden'>
            <Divider width={65} />
            <SellerInfo seller={data.product.creator} />
          </div>
        </div>
      </div>
    </DefaultWrapper>
  );
};

const Loading: React.FC = () => {
  return (
    <div className='container lg:max-w-screen-lg px-4 sm:px-8 pt-2 pb-4 mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-12'>
        <div>
          <ImageGallerySkeleton />
          <SellerInfoSkelleton />
        </div>
        <div>
          <ProductInfoSkeleton />
        </div>
      </div>
    </div>
  );
};

const ImageGallerySkeleton: React.FC = () => (
  <ContentLoader
    preserveAspectRatio='xMinYMin'
    speed={2}
    height={450}
    className='overflow-hidden w-full px-1'>
    <rect x='0' y='0' rx='8' ry='8' width='100%' height='380' />
    <rect x='25' y='395' rx='5' ry='5' width='80' height='64' />
    <rect x='110' y='395' rx='5' ry='5' width='80' height='64' />
    <rect x='195' y='395' rx='5' ry='5' width='80' height='64' />
  </ContentLoader>
);

const SellerInfoSkelleton: React.FC = () => (
  <ContentLoader
    className='mt-10'
    speed={2}
    width={300}
    height={80}
    viewBox='0 0 300 80'>
    <circle cx='30' cy='29' r='29' />
    <circle cx='74' cy='40' r='12' />
    <circle cx='100' cy='40' r='12' />
    <circle cx='126' cy='40' r='12' />
    <rect x='64' y='9' rx='5' ry='5' width='150' height='12' />
  </ContentLoader>
);

const ProductInfoSkeleton: React.FC = () => {
  const lh = 12,
    ds = 100,
    sp = 8;

  return (
    <ContentLoader
      className='mt-10'
      speed={2}
      width={510}
      height={600}
      viewBox='0 0 510 600'>
      <rect x='0' y='0' rx='10' ry='10' width='350' height='35' />
      <rect x='0' y='45' rx='5' ry='8' width='80' height='25' />
      <rect x='100' y='45' rx='5' ry='8' width='80' height='25' />
      {[...Array(18)].map((_, idx) => (
        <rect
          key={idx}
          x='0'
          y={(sp + lh) * idx + ds}
          rx='5'
          ry='5'
          width='400'
          height={lh}
        />
      ))}
    </ContentLoader>
  );
};
