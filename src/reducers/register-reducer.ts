import { useReducer, Dispatch } from 'react';

type InitialValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface State {
  initialValues: InitialValues;
  loading: boolean;
  error: string;
}
type Actions =
  | { type: 'setError'; payload: string }
  | { type: 'errorOnRegister' }
  | { type: 'startRegister' };

const initialValues: State = {
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  loading: false,
  error: '',
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'startRegister':
      return { ...state, error: '', loading: true };

    case 'errorOnRegister':
      return { ...state, error: 'Email already in use', loading: false };
    case 'setError':
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export type RegisterState = State;
export type RegisterDispatch = Dispatch<Actions>;
export const useRegisterReducer = () => {
  return useReducer(reducer, initialValues);
};
