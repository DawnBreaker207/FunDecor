import { useRoutes } from 'react-router-dom'
import LayoutClient from '../layouts/LayoutClient'
import Home from '../pages/website/Home'
import About from '../pages/website/About'
import AuthForm from '../pages/website/AuthForm'
import Search from '../components/Search'
import Category from '../components/Category'
import Price from '../components/Price'
import NotFound from '../pages/website/NotFound'
import LayoutAdmin from '../layouts/LayoutAdmin'
import Dashboard from '../pages/admin/Dashboard'
import ProductForm from '../pages/admin/product/ProductForm'

import { Detail } from '../pages/website/Detail'
import Cart from '../components/Cart'
import CategoryForm from '../pages/admin/category/CategoryForm'
import ProductList from '../pages/admin/product/ProductList'
import CategoryList from '../pages/admin/category/CategoryList'

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
        { path: "products/list", Component: ProductList },
        { path: 'products/add', Component: ProductForm },
        { path: 'products/edit/:id', Component: ProductForm },
        { path: "category/list", Component: CategoryList },
        { path: 'category/add', Component: CategoryForm },
        { path: 'category/edit/:id', Component: CategoryForm }
      ]
    },
    { path: '*', Component: NotFound }
  ])
  return (

    router
  )
}

export default Router
