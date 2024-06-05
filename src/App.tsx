import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Product } from './interfaces/Product'
import About from './pages/About'
import Dashboard from './pages/admin/Dashboard'
import { Detail } from './pages/Detail'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import instance from './services/api'


import LayoutAdmin from './layouts/LayoutAdmin'
import LayoutClient from './layouts/LayoutClient'
import ProductForm from './pages/admin/ProductForm'
import AuthForm from './pages/AuthForm'
import { getProduct } from './services/product'
import CheckPermission from './components/CheckPermission'

function App() {
  const [products, setProduct] = useState<Product[]>([])
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      const { data } = await instance.get('/products')
      setProduct(data)
    })()
  }, [])

  const handleSubmitForm = (res: Product) => {
    (async () => {
      try {
        if (res.id) {
          await instance.patch(`/products/${res.id}`, res)
          const newProducts = await getProduct()
          setProduct(newProducts)
          if (confirm('Add success, go to dashboard')) {
            navigate("/admin")
          }
        } else {
          const { data } = await instance.post('/products', res)
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
        await instance.delete(`/products/${id}`)
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
