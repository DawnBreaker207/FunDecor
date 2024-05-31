import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'
import { Product } from './interfaces/Product'
import About from './pages/About'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import instance from './services/api'
import { Detail } from './pages/Detail'
import Dashboard from './pages/admin/Dashboard'
import ProductAdd from './pages/admin/ProductAdd'

function App() {
  const [products, setProduct] = useState<Product[]>([])
  useEffect(() => {
    (async () => {
      const { data } = await instance.get('/products')
      setProduct(data)
    })()
  }, [])

  return (
    <>
      <Header />
      <main>

        <Routes>
          <Route>

            <Route path='' element={<Home product={products} />} />
            <Route path='/details/:id' element={<Detail />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
          </Route>
          <Route>
            <Route path='/admin/dashboard' element={<Dashboard product={products} />} />
            <Route path='/admin/add' element={<ProductAdd />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
