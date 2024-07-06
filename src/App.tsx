import { Route, Routes } from 'react-router-dom'
import LayoutAdmin from './layouts/LayoutAdmin'
import LayoutClient from './layouts/LayoutClient'
import About from './pages/About'
import AuthForm from './pages/AuthForm'
import { Detail } from './pages/Detail'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Category from './components/Category'
import Price from './components/Price'
import PrivateRouter from './components/PrivateRouter'
import Search from './components/Search'
import Dashboard from './pages/admin/Dashboard'
import ProductForm from './pages/admin/ProductForm'
import CategoryForm from './pages/admin/CategoryForm'


const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path='/details/:id' element={<Detail />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<AuthForm />} />
          <Route path='/register' element={<AuthForm isRegister />} />
          <Route path='/search' element={<Search />} />
          <Route path='/category' element={<Category />} />
          <Route path='/price' element={<Price />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path='/admin' element={<LayoutAdmin />}  >
            <Route index element={<Dashboard />} />
            <Route path='/admin/product-form' element={<ProductForm />} />
            <Route path='/admin/product-form/:id' element={<ProductForm />} />
            <Route path='/admin/category-form' element={<CategoryForm />} />
            <Route path='/admin/category-form/:id' element={<CategoryForm />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>

    </>
  )
}

export default App
