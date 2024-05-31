import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../services/api'
import { Product } from '../interfaces/Product'

export const Detail = () => {
  const { id } = useParams()
  const [product, setProducts] = useState<Product | null>(null)
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`/products/${id}`)

      setProducts(data)
    })()
  }, [])
  return (
    <section className='md:max-w-6xl mx-auto md: my-5'>
      <div>
        <div>
          <img src={product?.thumbnail} alt="" />
        </div>
        <h1 className='font-bold text-3xl'>{product?.title}</h1>
        <p>${product?.price}</p>
        <p>{product?.description}</p>
        <p>Rating: {product?.rating}</p>
      </div>

    </section>
  )
}
