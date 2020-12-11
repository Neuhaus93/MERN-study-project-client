export interface FiltersState {
  category: {
    tools: boolean;
    equipment: boolean;
    software: boolean;
  };
  location: string;
}
export type FiltersAction =
  | { type: 'tools' }
  | { type: 'equipment' }
  | { type: 'software' }
  | { type: 'location'; payload: string };

export const initialFilters: FiltersState = {
  category: {
    tools: true,
    equipment: true,
    software: true,
  },
  location: 'Everywhere',
};

export const filtersReducer = (state: FiltersState, action: FiltersAction) => {
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
