import { createContext, useContext, useEffect, useReducer } from "react";


import categoryReducer from "../reducers/categoryReducer";
import { CreateCategory, DeleteCategory, GetCategoryAll, UpdateCategory } from "../services/category.services";
import { ProductProviderProps } from "../common/types/Product";
import { Category, CategoryContextType, StateCategory } from "../common/types/Category";
import { CategoryAction } from "../common/types/Category";
import { useNavigate } from "react-router-dom";




export const CategoryContext = createContext<CategoryContextType>({} as CategoryContextType)
const initialState: StateCategory = {
  categories: [],
  error: null,
};
export const useCategory = () => {
  return useContext(CategoryContext)
}
const CategoryContextProvider = ({ children }: ProductProviderProps) => {
  const navigate = useNavigate()
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

  const Add_Category = async (dataInput: Category) => {
    try {
      const data = await CreateCategory(dataInput)
      dispatch({ type: CategoryAction.ADD_CATEGORIES, payload: data })
      if (data && (confirm('Add success, go to dashboard'))) {
        navigate("/admin")
      }
    } catch (error) {
      console.log(error);
    }
  }
  const Edit_Category = async (_id: string, dataInput: Category) => {
    try {
      await UpdateCategory(_id, dataInput)
      dispatch({ type: CategoryAction.UPDATE_CATEGORIES, payload: { ...dataInput, _id } })
      if (confirm('Edit success, go to dashboard')) {
        navigate("/admin")
      }
    } catch (error) {
      console.log(error);

    }
  }
  const Delete_Category = async (id: string) => {
    try {
      await DeleteCategory(id)
      dispatch({ type: CategoryAction.DELETE_CATEGORIES, payload: id })
    } catch (error) {
      console.log(error);

    }
  }
  return <CategoryContext.Provider value={{ state, dispatch, Delete_Category, Add_Category, Edit_Category }}>
    {children}
  </CategoryContext.Provider>
}
export default CategoryContextProvider
