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
  modalIsOpen: boolean;
  socialsArr: SocialsArrType;
}
type Actions =
  | {
      type: 'setSocials';
      payload: ProductQuery['product']['creator'];
    }
  | { type: 'toggleLike' }
  | { type: 'setLikeProduct'; payload: boolean }
  | { type: 'setIsModalOpen'; payload: boolean }
  | { type: 'isCreator' };

const initialValues: State = {
  isLiked: false,
  modalIsOpen: false,
  socialsArr: [],
  isCreator: false,
};

const reducer = (state: State, action: Actions) => {
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

    case 'setIsModalOpen':
      return { ...state, modalIsOpen: action.payload };

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
