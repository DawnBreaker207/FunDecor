import { createContext, Dispatch, useEffect, useReducer } from "react";

import productReducer, { Product_Action, ProductAction, State } from "../reducers/productReducer";
import { GetProductAll } from "../services/product.config";



export interface ProductContextType {
  state: State,
  dispatch: Dispatch<Product_Action>
}
interface ProductProviderProps {
  children: React.ReactNode;
}

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
