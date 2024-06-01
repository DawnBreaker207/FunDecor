import { useForm } from "react-hook-form"
import { Product } from "../../interfaces/Product"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type Props = {
  onAdd: (product: Product) => void
}
const productSchema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  price: z.number().min(1, { message: 'Required' }),
  description: z.string().min(5).max(100).optional(),
})
const ProductAdd = ({ onAdd }: Props) => {
  const { register, formState: { errors }, handleSubmit } = useForm<Product>({ resolver: zodResolver(productSchema) })
  const onSubmit = (data: Product) => {
    onAdd(data)

  }
  return (
    <section className="md:max-w-6xl mx-auto">
      <div className="my-5">
        <h1 className="my-5 text-3xl font-bold text-center">Form Add</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="md:max-w-2xl md:mx-auto">
          <div className="mb-3">
            <label className="form-label" htmlFor="Title">Title</label>
            <input className="form-control" type="text" placeholder="Title" {...register("title", { required: true, minLength: 5 })} />
            <div className="font-bold text-red-600">{errors.title && <p>{errors.title?.message}</p>}</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="Price">Price</label>
            <input className="form-control" type="text" placeholder="Price" {...register("price", { required: true, min: 5, valueAsNumber: true })} />
            <div className="font-bold text-red-600">{errors.price && <p>{errors.price?.message}</p>}</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="Description">Description</label>
            <input className="form-control" type="text" placeholder="Description" {...register("description", { required: true, minLength: 5 })} />
            <div className="font-bold text-red-600">{errors.description && <p>{errors.description?.message}</p>}</div>
          </div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </section>
  )
}

export default ProductAdd