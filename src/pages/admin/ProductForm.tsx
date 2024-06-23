import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { z } from "zod"
import { ProductContext } from "../../contexts/Product.Context"
import { Product } from "../../interfaces/Product"
import { ProductAction } from "../../reducers/productReducer"
import instance from "../../services/config"
import { CreateProduct, UpdateProduct } from "../../services/product.config"

// const { VITE_CLOUDNAME , VITE_UPLOAD_PRESET } = import.meta.env


const productSchema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  price: z.number().min(1, { message: 'Required' }),
  description: z.string().min(5).max(100).optional(),
})
const ProductForm = () => {
  const context = useContext(ProductContext)
  const navigate = useNavigate()
  const { id } = useParams()
  const [products, setProduct] = useState<Product | null>(null)

  const HandleFetch = () => {
    useEffect(() => {
      (async () => {
        const { data } = await instance.get(`/products/${id}`)
        setProduct(data)
      })()
    }, [])
  }
  if (id) {
    HandleFetch()
  }
  const { register, formState: { errors }, handleSubmit } = useForm<Product>({ resolver: zodResolver(productSchema) })

  const handleSubmitForm = (res: Product) => {
    (async () => {
      try {
        if (res.id) {
          await UpdateProduct(res.id, res)
          context?.dispatch({
            type: ProductAction.UPDATE_PRODUCTS, payload: { id, ...res }
          })
          if (confirm('Add success, go to dashboard')) {
            navigate("/admin")
          }
        } else {
          const data = await CreateProduct(res)
          console.log(data);
          context?.dispatch({
            type: ProductAction.ADD_PRODUCTS, payload: data
          })
          if (confirm('Add success, go to dashboard')) {
            navigate("/admin")
          }
        }
      } catch (error) {
        console.log(error);
      }
    })()

  }

  return (
    <section className="md:max-w-6xl mx-auto">
      <div className="my-5">
        <h1 className="my-5 text-3xl font-bold text-center">{id ? 'Product Edit' : "Product Add"}</h1>
        <form action="" onSubmit={handleSubmit(handleSubmitForm)} className="md:max-w-2xl md:mx-auto">
          <div className="mb-3">
            <label className="form-label" htmlFor="Title">Title</label>
            <input className="form-control" type="text" placeholder="Title" {...register("title", { required: true, minLength: 5 })} defaultValue={products?.title} />
            <div className="font-bold text-red-600">{errors.title && <p>{errors.title?.message}</p>}</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="Price">Price</label>
            <input className="form-control" type="text" placeholder="Price" {...register("price", { required: true, min: 5, valueAsNumber: true })} defaultValue={products?.price} />
            <div className="font-bold text-red-600">{errors.price && <p>{errors.price?.message}</p>}</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="Description">Description</label>
            <input className="form-control" type="text" placeholder="Description" {...register("description", { required: true, minLength: 5 })} defaultValue={products?.description} />
            <div className="font-bold text-red-600">{errors.description && <p>{errors.description?.message}</p>}</div>
          </div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </section>
  )
}

export default ProductForm