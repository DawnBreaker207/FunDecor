import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import AuthContextProvider from './contexts/AuthContext'
import CartContextProvider from './contexts/CartContext'
import CategoryContextProvider from './contexts/CategoryContext'
import ProductContextProvider from './contexts/Product.Context'
import { StyleProvider } from "@ant-design/cssinjs"
import './index.scss'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StyleProvider layer>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <ProductContextProvider>
              <CategoryContextProvider>
                <CartContextProvider>
                  <App />
                </CartContextProvider>
              </CategoryContextProvider>
            </ProductContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </StyleProvider>
    </BrowserRouter>
  </React.StrictMode >,
)
