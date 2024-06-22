import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import CheckPermission from './components/CheckPermission'
import { Product } from './interfaces/Product'
import LayoutAdmin from './layouts/LayoutAdmin'
import LayoutClient from './layouts/LayoutClient'
import About from './pages/About'
import Dashboard from './pages/admin/Dashboard'
import ProductForm from './pages/admin/ProductForm'
import AuthForm from './pages/AuthForm'
import { Detail } from './pages/Detail'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
// import Test from './pages/Test'
import Search from './components/Search'
import { CreateProduct, DeleteProduct, GetProductAll, UpdateProduct } from './services/product.config'
import Category from './components/Category'
import Price from './components/Price'


function App() {
  const [products, setProduct] = useState<Product[]>([])
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      const data = await GetProductAll()
      setProduct(data)
    })()
  }, [])

  const handleSubmitForm = (res: Product) => {
    (async () => {
      try {
        if (res.id) {
          await UpdateProduct(res.id, res)
          const newProducts = await GetProductAll()
          setProduct(newProducts)
          if (confirm('Add success, go to dashboard')) {
            navigate("/admin")
          }
        } else {
          const data = await CreateProduct(res)
          setProduct([...products, data])
          if (confirm('Add success, go to dashboard')) {
            navigate("/admin")
          }
        }
      } catch (error) {
        console.log(error);
      }
    })()

  }
  const handleDelete = (id: string | number) => {
    (async () => {
      if (confirm(`Are you sure want to delete ?`)) {
        await DeleteProduct(id)
        setProduct(products.filter(item => item.id !== id && item))
      }
    })()
  }


  return (
    <>


      <Routes>
        <Route path='/' element={<LayoutClient />}>
          <Route index element={<Home product={products} />} />
          <Route path='/details/:id' element={<Detail />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<AuthForm />} />
          <Route path='/register' element={<AuthForm isRegister />} />
          <Route path='/search' element={<Search />} />
          <Route path='/category' element={<Category />} />
          <Route path='/price' element={<Price />} />
          {/* <Route path='/test' element={<Test />} /> */}
        </Route>
        <Route element={<CheckPermission />}>
          <Route path='/admin' element={<LayoutAdmin />}  >
            <Route index element={<Dashboard product={products} onDelete={handleDelete} />} />
            <Route path='/admin/product-form' element={<ProductForm onProduct={handleSubmitForm} />} />
            <Route path='/admin/product-form/:id' element={<ProductForm onProduct={handleSubmitForm} />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>

    </>
  )
}

export default App
