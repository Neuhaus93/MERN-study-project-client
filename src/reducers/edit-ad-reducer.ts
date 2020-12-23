import { useReducer, Dispatch } from 'react';
import { ProductQuery } from '../graphql/__generated__';

type FormValues = {
  title: string;
  description: string;
  price: string;
  location: string;
  category: string;
};

interface State {
  settingUp: boolean;
  initialValues: FormValues;
  existingImages: string[];
  newImages: File[];
  deletedImages: string[];
  loading: boolean;
  error: string;
}
type Actions =
  | { type: 'initialSetup'; payload: ProductQuery['product'] }
  | { type: 'setExistingImages'; payload: string[] }
  | { type: 'setNewImages'; payload: File[] }
  | { type: 'setDeletedImages'; payload: string[] }
  | { type: 'startLoading' }
  | { type: 'finishLoading' };

const initialValues: State = {
  settingUp: true,
  initialValues: {
    title: '',
    description: '',
    price: '',
    location: 'Alabama',
    category: 'Equipment',
  },
  existingImages: [],
  newImages: [],
  deletedImages: [],
  loading: false,
  error: '',
};

const filtersReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'initialSetup':
      return {
        ...state,
        settingUp: false,
        initialValues: {
          title: action.payload.title,
          description: action.payload.description,
          price: action.payload.price.toString(),
          location: action.payload.location,
          category: action.payload.category,
        },
        existingImages: action.payload.images,
      };

    case 'setExistingImages':
      return { ...state, existingImages: action.payload };

    case 'setNewImages':
      return { ...state, newImages: action.payload };

    case 'setDeletedImages':
      return { ...state, deletedImages: action.payload };

    case 'startLoading':
      return { ...state, loading: true };

    case 'finishLoading':
      return { ...state, loading: false };

    default:
      return state;
  }
};

export type EditAdState = State;
export type EditAdDispatch = Dispatch<Actions>;
export const useEditAdReducer = () => {
  return useReducer(filtersReducer, initialValues);
};
