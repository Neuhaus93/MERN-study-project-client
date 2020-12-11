import { useReducer, Dispatch } from 'react';

interface State {
  category: {
    tools: boolean;
    equipment: boolean;
    software: boolean;
  };
  location: string;
}
type Actions =
  | { type: 'tools' }
  | { type: 'equipment' }
  | { type: 'software' }
  | { type: 'location'; payload: string };

const initialValues: State = {
  category: {
    tools: true,
    equipment: true,
    software: true,
  },
  location: 'Everywhere',
};

const filtersReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'tools':
      return {
        ...state,
        category: { ...state.category, tools: !state.category.tools },
      };

    case 'equipment':
      return {
        ...state,
        category: { ...state.category, equipment: !state.category.equipment },
      };

    case 'software':
      return {
        ...state,
        category: { ...state.category, software: !state.category.software },
      };

    case 'location':
      return { ...state, location: action.payload };

    default:
      return state;
  }
};

export type FilterUserState = State;
export type FilterUserDispatch = Dispatch<Actions>;
export const useFilterReducer = () => {
  return useReducer(filtersReducer, initialValues);
};
