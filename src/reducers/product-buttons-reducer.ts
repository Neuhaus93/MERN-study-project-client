import { useReducer, Dispatch } from 'react';
import { ProductQuery } from '../graphql/__generated__';
import { AllSocials } from '../util/socials';

type SocialsArrType = Array<{
  name: AllSocials;
  url: string;
}>;

interface State {
  isCreator: boolean;
  isLiked: boolean;
  socialsArr: SocialsArrType;
  modalState: {
    isOpen: boolean;
    text: string;
    actionText: string;
    handleAction: () => void;
  };
}
type Actions =
  | {
      type: 'setSocials';
      payload: ProductQuery['product']['creator'];
    }
  | { type: 'toggleLike' }
  | { type: 'setLikeProduct'; payload: boolean }
  | { type: 'setIsModalOpen'; payload: boolean }
  | { type: 'isCreator' }
  | { type: 'openNotLoggedInModal'; payload: () => void }
  | { type: 'openDeleteProductModel'; payload: () => void };

const initialValues: State = {
  isLiked: false,
  socialsArr: [],
  isCreator: false,
  modalState: {
    isOpen: false,
    text: '',
    actionText: '',
    handleAction: () => ({}),
  },
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'setSocials':
      return {
        ...state,
        socialsArr: [
          { name: 'email', url: action.payload.email },
          {
            name: 'phoneNumber',
            url: action.payload.socials.phoneNumber || '',
          },
          {
            name: 'linkedin',
            url: action.payload.socials.linkedin || '',
          },
          {
            name: 'instagram',
            url: action.payload.socials.instagram || '',
          },
          {
            name: 'facebook',
            url: action.payload.socials.facebook || '',
          },
        ] as SocialsArrType,
      };

    case 'toggleLike':
      return { ...state, isLiked: !state.isLiked };

    case 'setLikeProduct':
      return { ...state, isLiked: action.payload };

    case 'openNotLoggedInModal': {
      return {
        ...state,
        modalState: {
          isOpen: true,
          text: 'You must be logged in to perform this action',
          actionText: 'Log In',
          handleAction: action.payload,
        },
      };
    }

    case 'openDeleteProductModel':
      return {
        ...state,
        modalState: {
          isOpen: true,
          text: 'Are you sure you want to delete this ad?',
          actionText: 'Delete',
          handleAction: action.payload,
        },
      };

    case 'setIsModalOpen':
      return {
        ...state,
        modalState: { ...state.modalState, isOpen: action.payload },
      };

    case 'isCreator':
      return { ...state, isCreator: true };

    default:
      return state;
  }
};

export type ProductButtonsState = State;
export type ProductButtonsDispatch = Dispatch<Actions>;
export const useProductButtonsReducer = () => {
  return useReducer(reducer, initialValues);
};
