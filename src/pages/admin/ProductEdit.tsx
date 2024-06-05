import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { Product } from "../../interfaces/Product"
import productSchema from "../../schemaValid/productSchema"
import instance from "../../services/api"

type Props = {
  onEdit: (product: Product) => void
}

const ProductEdit = ({ onEdit }: Props) => {
  const { id } = useParams()

  const [products, setProduct] = useState<Product | null>(null)
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`products/${id}`)
      setProduct(data)
    })()
  }, [])
  const { register, formState: { errors }, handleSubmit } = useForm<Product>({ resolver: zodResolver(productSchema) })



  const onSubmit = (data: Product) => {
    onEdit({ ...data, id })

  }
  return (
    <section className="md:max-w-6xl mx-auto">
      <div className="my-5">
        <h1 className="my-5 text-3xl font-bold text-center">Form Add</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="md:max-w-2xl md:mx-auto">
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

export default ProductEdit