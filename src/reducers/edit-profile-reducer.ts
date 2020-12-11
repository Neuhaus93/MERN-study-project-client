import { useReducer, Dispatch } from 'react';

interface State {
  isLoading: boolean;
  error: string;
}
type Actions =
  | { type: 'setLoading' }
  | { type: 'finishLoading' }
  | { type: 'setError'; payload: string };

const initialValues: State = {
  isLoading: false,
  error: '',
};

const filtersReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'setLoading':
      return { ...state, isLoading: true };

    case 'finishLoading':
      return { ...state, isLoading: false };

    case 'setError':
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export type EditUserState = State;
export type EditUserDispatch = Dispatch<Actions>;
export const useEditUserReducer = () => {
  return useReducer(filtersReducer, initialValues);
};
