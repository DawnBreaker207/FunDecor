import { Category_Action, StateCategory } from '../interfaces/Category';

const categoryReducer = (
  state: StateCategory,
  action: Category_Action
): StateCategory => {
  const { categories } = state;
  const { type, payload } = action;

  switch (type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: payload };
    case 'ADD_CATEGORIES':
      return { ...state, categories: [...categories, payload] };
    case 'UPDATE_CATEGORIES':
      return {
        ...state,
        categories: categories.map((category) =>
          category.id === payload.id ? payload : category
        ),
      };
    case 'DELETE_CATEGORIES':
      return {
        ...state,
        categories: categories.filter((category) => category.id !== payload),
      };

    default:
      return state;
  }
};
export default categoryReducer;
