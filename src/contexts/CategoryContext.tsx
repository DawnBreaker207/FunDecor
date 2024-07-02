import { createContext, useEffect, useReducer } from "react";

import { CategoryAction, CategoryContextType, StateCategory } from "../interfaces/Category";
import { ProductProviderProps } from "../interfaces/Product";
import categoryReducer from "../reducers/categoryReducer";
import { GetCategoryAll } from "../services/category.config";




export const CategoryContext = createContext<CategoryContextType | undefined>(undefined)
const initialState: StateCategory = {
  categories: [],
  error: null,
};
const CategoryContextProvider = ({ children }: ProductProviderProps) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState)
  useEffect(() => {
    (async () => {
      try {
        const data = await GetCategoryAll()
        dispatch({ type: CategoryAction.SET_CATEGORIES, payload: data })
      } catch (err) {
        console.error(err);
      }
    })()
  }, [])

  return <CategoryContext.Provider value={{ state, dispatch }}>
    {children}
  </CategoryContext.Provider>
}
export default CategoryContextProvider
