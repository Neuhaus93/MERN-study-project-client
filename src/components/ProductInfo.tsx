import React, { useCallback, useEffect, useRef, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { FaHeart, FaShareAlt, FaTrash } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import Moment from 'react-moment';
import { Link, useHistory } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import {
  ProductQuery,
  ProductsDocument,
  useDeleteProductMutation,
  useLikeProductMutation,
  UserProductsDocument,
  UserProductsQuery,
} from '../graphql/__generated__';
import { useAuth } from '../hooks/useAuth';
import { useProductButtonsReducer } from '../reducers/product-buttons-reducer';
import { ROUTE_EDIT_AD, ROUTE_LOGIN } from '../util/routes';
import { AllSocials, helperFunctions, SOCIALS } from '../util/socials';
import {
  ButtonBlueFilled,
  ButtonBlueOutline,
  ButtonRedOutline,
} from './Buttons';
import { Modal } from './Modal';
import { InlineIcon } from './MyIcon';

interface ProductInfoProps {
  product: ProductQuery['product'];
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { title, location, price, description, createdAt, creator } = product;

  return (
    <div className='pt-3'>
      <h3 className='text-2xl mb-2'>{title}</h3>
      <dl className='text-gray-700 text-md flex items-center'>
        <div>
          <dt className='sr-only'>Location</dt>
          <dd className='flex'>
            <InlineIcon Icon={IoLocationSharp} />
            <p className='ml-1'>{location}</p>
          </dd>
        </div>
        <div className='bg-red-100 text-red-900 px-2 py-0.5 rounded-md ml-4'>
          <dt className='sr-only'>Price</dt>
          <dd>
            <p className=''>{`$ ${price}`}</p>
          </dd>
        </div>
      </dl>

      <Buttons creator={creator} productId={product._id} />

      <div className='mt-8'>
        <div>
          <h4 className='text-lg mb-1 font-bold'>Description</h4>
          <p className='text-gray-800 text-sm whitespace-pre-line'>
            {description}
          </p>
        </div>
        <div className='mt-4'>
          <h5 className='font-bold mb-1'>Date Posted:</h5>
          <p className='text-gray-800 text-sm'>
            <Moment date={new Date(createdAt)} format='LL' />
          </p>
        </div>
      </div>
    </div>
  );
};

interface ButtonsProps {
  creator: ProductQuery['product']['creator'];
  productId: string;
}

const Buttons: React.FC<ButtonsProps> = (props) => {
  const { creator, productId } = props;
  const { mongoUser } = useAuth();
  const history = useHistory();
  const [
    deleteProduct,
    { loading: loadingDelete },
  ] = useDeleteProductMutation();
  const [buttonState, dispatch] = useProductButtonsReducer();
  const [likeProduct, { loading: loadingLike }] = useLikeProductMutation();
  const { isLiked, socialsArr, isCreator, modalState } = buttonState;

  /**
   * Start socialsArray and isCreator
   */
  useEffect(() => {
    dispatch({ type: 'setSocials', payload: creator });
    if (mongoUser && creator._id === mongoUser._id) {
      dispatch({ type: 'isCreator' });
    }
  }, [dispatch, mongoUser, creator]);

  /**
   *  Set like status
   */
  useEffect(() => {
    if (mongoUser) {
      dispatch({
        type: 'setLikeProduct',
        payload: !!mongoUser.likes?.includes(productId),
      });
    }
  }, [mongoUser, productId, dispatch]);

  /**
   * Handle like button click
   */
  const handleLike = () => {
    if (!mongoUser) {
      dispatch({
        type: 'openNotLoggedInModal',
        payload: () => history.push(ROUTE_LOGIN),
      });
      return;
    }

    likeProduct({
      variables: { userId: mongoUser._id, productId },
    });
  };

  /** Handle product delete */
  const handleDelete = useCallback(() => {
    if (!mongoUser) return;
    dispatch({
      type: 'openDeleteProductModel',
      payload: deleteTheProduct,
    });

    function deleteTheProduct() {
      if (!mongoUser) return;

      deleteProduct({
        variables: { userId: mongoUser._id, productId },
        refetchQueries: [
          { query: ProductsDocument, variables: { category: '' } },
        ],
        update: (cache) => {
          let userProducts = null;
          try {
            userProducts = cache.readQuery<UserProductsQuery | null>({
              query: UserProductsDocument,
              variables: { userId: mongoUser._id },
            });
          } catch {
            return;
          }

          if (!userProducts) {
            return;
          }
          cache.writeQuery<UserProductsQuery>({
            query: UserProductsDocument,
            variables: { userId: mongoUser._id },
            data: {
              userProducts: userProducts.userProducts.filter(
                (product) => product._id !== productId
              ),
            },
          });
        },
      }).then(() => history.push('/'));
    }
  }, [deleteProduct, dispatch, history, mongoUser, productId]);

  return (
    <div className='flex space-x-2 h-10 mt-5'>
      <ButtonRedOutline
        className={`px-5 ${isLiked && `bg-red-400 hover:bg-red-500`}`}
        onClick={handleLike}
        disabled={loadingLike}>
        <FaHeart className={isLiked ? 'opacity-40' : 'opacity-50'} />
      </ButtonRedOutline>
      <ButtonBlueOutline className='px-5'>
        <FaShareAlt className='opacity-90 text-blue-700' />
      </ButtonBlueOutline>
      {isCreator ? (
        <>
          <ButtonBlueOutline className='px-5' onClick={handleDelete}>
            <FaTrash className='opacity-90 text-blue-700' />
          </ButtonBlueOutline>
          <Link to={`${ROUTE_EDIT_AD}/${productId}`} className='w-full h-full'>
            <ButtonBlueFilled className='w-full h-full font-bold'>
              Edit
            </ButtonBlueFilled>
          </Link>
        </>
      ) : (
        <ReplyButton socials={socialsArr} />
      )}
      <Modal
        isOpen={modalState.isOpen}
        setIsOpen={(isOpen: boolean) =>
          dispatch({ type: 'setIsModalOpen', payload: isOpen })
        }
        text={modalState.text}
        actionText={modalState.actionText}
        handleAction={modalState.handleAction}
        loading={loadingDelete}
      />
    </div>
  );
};

type SocialArrType = Array<{
  name: AllSocials;
  url: string;
}>;

const ReplyButton: React.FC<{ socials: SocialArrType }> = ({ socials }) => {
  const [open, setOpen] = useState(false);
  const { getLinkIcon, getShownValueAndUrl } = helperFunctions;
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  const getStyle = (color: string, isLeft?: boolean) => {
    const left: React.CSSProperties = {
      color: color,
      marginRight: '0.5rem',
    };
    const right: React.CSSProperties = {
      color: color,
      marginLeft: 'auto',
      cursor: 'pointer',
    };
    return isLeft ? left : right;
  };

  const handleClickAway = () => {
    if (componentIsMounted) {
      setOpen(false);
    }
  };

  return (
    <ClickAwayListener className='flex-1' onClickAway={handleClickAway}>
      <div className='relative h-full'>
        <ButtonBlueFilled
          onClick={() => setOpen(!open)}
          className='w-full h-full font-bold'>
          Reply
        </ButtonBlueFilled>
        {open && (
          <StyledDropdown className='bg-blue-50 shadow-md rounded-md'>
            {socials.map((social, index) => {
              if (!social.url) {
                return null;
              }
              const LinkIcon = getLinkIcon(social.name);
              const { color, Icon: SocialIcon } = SOCIALS[social.name];
              const [shownValue, url] = getShownValueAndUrl(
                social.name,
                social.url
              );
              return (
                <div key={index} className='flex items-center'>
                  <SocialIcon
                    className='text-lg'
                    style={getStyle(color, true)}
                  />
                  <p className='text-gray-900 text-sm'>{shownValue}</p>
                  {LinkIcon && (
                    <button
                      type='button'
                      onClick={() => window.open(url)}
                      className='ml-4 flex-1'>
                      <LinkIcon className='text-lg' style={getStyle(color)} />
                    </button>
                  )}
                </div>
              );
            })}
          </StyledDropdown>
        )}
      </div>
    </ClickAwayListener>
  );
};

const StyledDropdown = styled.div`
  position: absolute;
  bottom: 48px;
  right: 0px;
  z-index: 1;
  white-space: nowrap;
  ${tw`flex flex-col space-y-3 p-5`}

  @media (min-width: 768px) {
    bottom: auto;
    top: 48px;
  }
`;
