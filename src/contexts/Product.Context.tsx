import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useReducer } from "react";
import { Product, ProductAction, ProductContextType, ProductProviderProps } from '../common/types/Product';
import productReducer, { initialState } from "../reducers/productReducer";
import { CreateProduct, DeleteProduct, GetProductAll, UpdateProduct } from "../services/product.services";
import { useNavigate } from "react-router-dom";


export const ProductContext = createContext<ProductContextType>({} as ProductContextType)
export const useProduct = (): ProductContextType => {
  return useContext(ProductContext)
}
const ProductContextProvider = ({ children }: ProductProviderProps) => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(productReducer, initialState)

  const { data, error } = useQuery<Product[]>({
    queryKey: ['products'], queryFn: GetProductAll
  })

  useEffect(() => {
    if (data) {
      dispatch({ type: ProductAction.SET_PRODUCTS, payload: data })
    }
  }, [data])
  useEffect(() => {
    if (error) {
      dispatch({ type: ProductAction.SET_PRODUCTS, payload: [] })
    }
  }, [error])

  const Add_Product = async (dataInput: Product) => {
    try {
      const data = await CreateProduct(dataInput)
      dispatch({ type: ProductAction.ADD_PRODUCTS, payload: data })
      if (data && confirm('Add success, go to dashboard')) {
        navigate("/admin")
      }
    } catch (error) {
      console.log(error);

    }
  }
  const Edit_Product = async (_id: string, dataInput: Product) => {
    try {
      await UpdateProduct(_id, dataInput)
      dispatch({ type: ProductAction.UPDATE_PRODUCTS, payload: { ...dataInput, _id } })
      if (confirm('Edit success, go to dashboard')) {
        navigate("/admin")
      }
    } catch (error) {
      console.log(error);

    }

  }
  const Delete_Product = async (id: string) => {
    await DeleteProduct(id)
    dispatch({ type: ProductAction.DELETE_PRODUCTS, payload: id })

  }
  return <ProductContext.Provider value={{ state, dispatch, Add_Product, Edit_Product, Delete_Product }}>
    {children}
  </ProductContext.Provider>
}
export default ProductContextProvider
