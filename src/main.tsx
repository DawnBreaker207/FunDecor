import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import AuthContextProvider from './contexts/AuthContext.tsx'
import ProductContextProvider from './contexts/Product.Context.tsx'
import './index.scss'
import CartContextProvider from './contexts/CartContext.tsx'
import CategoryContextProvider from './contexts/CategoryContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ProductContextProvider>
          <CategoryContextProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </CategoryContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
