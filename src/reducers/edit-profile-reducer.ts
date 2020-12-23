import { useReducer, Dispatch } from 'react';

interface InitialValuesType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  facebook: string;
  linkedin: string;
  instagram: string;
}

interface State {
  isLoading: boolean;
  error: string;
  success: string;
  initialValues: InitialValuesType;
}
type Actions =
  | { type: 'setLoading' }
  | { type: 'finishLoading' }
  | { type: 'startEdit' }
  | { type: 'setError'; payload: string }
  | { type: 'setSuccess'; payload: string }
  | { type: 'setInitialValues'; payload: InitialValuesType };

const initialValues: State = {
  isLoading: false,
  error: '',
  success: '',
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    facebook: '',
    linkedin: '',
    instagram: '',
  },
};

const filtersReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'setLoading':
      return { ...state, isLoading: true };

    case 'finishLoading':
      return { ...state, isLoading: false };

    case 'startEdit':
      return { ...state, isLoading: true, error: '', success: '' };

    case 'setError':
      return { ...state, error: action.payload };

    case 'setSuccess':
      return { ...state, success: action.payload };

    case 'setInitialValues':
      return { ...state, initialValues: action.payload };

    default:
      return state;
  }
};

export type EditUserState = State;
export type EditUserDispatch = Dispatch<Actions>;
export const useEditUserReducer = () => {
  return useReducer(filtersReducer, initialValues);
};
