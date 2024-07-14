import { useRoutes } from 'react-router-dom'
import LayoutClient from '../layouts/LayoutClient'
import Home from '../pages/Home'
import About from '../pages/About'
import AuthForm from '../pages/AuthForm'
import Search from '../components/Search'
import Category from '../components/Category'
import Price from '../components/Price'
import NotFound from '../pages/NotFound'
import LayoutAdmin from '../layouts/LayoutAdmin'
import Dashboard from '../pages/admin/Dashboard'
import ProductForm from '../pages/admin/ProductForm'
import CategoryForm from '../pages/admin/CategoryForm'
import { Detail } from '../pages/Detail'
import Cart from '../components/Cart'

const Router = () => {
  const router = useRoutes([
    {
      path: '/', Component: LayoutClient, children: [
        { path: '', Component: Home },
        { path: '/details/:id', Component: Detail },
        { path: 'about', Component: About },
        { path: 'login', element: <AuthForm /> },
        { path: 'register', element: <AuthForm isRegister /> },
        { path: 'search', Component: Search },
        { path: 'category', Component: Category },
        { path: 'price', Component: Price },
        { path: 'cart', Component: Cart },
      ]
    }, {
      path: '/admin', Component: LayoutAdmin, children: [
        { path: '', Component: Dashboard },
        { path: 'product-form', Component: ProductForm },
        { path: 'product-form/:id', Component: ProductForm },
        { path: 'category-form', Component: CategoryForm },
        { path: 'category-form/:id', Component: CategoryForm }
      ]
    },
    { path: '*', Component: NotFound }
  ])
  return (

    router
  )
}

export default Router
