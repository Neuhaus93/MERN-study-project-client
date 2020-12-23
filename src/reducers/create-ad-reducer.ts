import { useReducer, Dispatch } from 'react';

interface State {
  images: File[];
  loading: boolean;
  error: string;
}
type Actions =
  | { type: 'setImages'; payload: File[] }
  | { type: 'startLoading' }
  | { type: 'finishLoading' };

const initialValues: State = {
  images: [],
  loading: false,
  error: '',
};

const filtersReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'setImages':
      return { ...state, images: action.payload };

    case 'startLoading':
      return { ...state, loading: true };

    case 'finishLoading':
      return { ...state, loading: false };

    default:
      return state;
  }
};

export type CreateAdState = State;
export type CreateAdDispatch = Dispatch<Actions>;
export const useCreateAdReducer = () => {
  return useReducer(filtersReducer, initialValues);
};
