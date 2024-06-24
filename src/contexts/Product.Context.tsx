import { createContext, useEffect, useReducer } from "react";

import { ProductAction, ProductContextType, ProductProviderProps, State } from "../interfaces/Product";
import productReducer from "../reducers/productReducer";
import { GetProductAll } from "../services/product.config";




export const ProductContext = createContext<ProductContextType | undefined>(undefined)
const initialState: State = {
  products: [],
  error: null,
};
const ProductContextProvider = ({ children }: ProductProviderProps) => {
  const [state, dispatch] = useReducer(productReducer, initialState)
  useEffect(() => {
    (async () => {
      try {
        const data = await GetProductAll()
        dispatch({ type: ProductAction.SET_PRODUCTS, payload: data })
      } catch (err) {
        console.error(err);
      }
    })()
  }, [])

  return <ProductContext.Provider value={{ state, dispatch }}>
    {children}
  </ProductContext.Provider>
}
export default ProductContextProvider
