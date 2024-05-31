import { useForm } from "react-hook-form"
import { Product } from "../../interfaces/Product"

const ProductAdd = () => {
  const { register, formState: { errors }, handleSubmit } = useForm<Product>()
  const onSubmit = (data: Product) => {
    console.log(data);

  }
  return (
    <section className="md:max-w-6xl mx-auto">
      <div className="my-5">
        <h1 className="my-5 text-3xl font-bold text-center">Form Add</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="md:max-w-2xl md:mx-auto">
          <div className="mb-3">
            <label className="form-label" htmlFor="Title">Title</label>
            <input className="form-control" type="text" placeholder="Title" {...register("title", { required: true, minLength: 5 })} />
            <div></div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="Price">Price</label>
            <input className="form-control" type="text" placeholder="Price" {...register("price", { required: true, minLength: 5 })} />
            <div></div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="Description">Description</label>
            <input className="form-control" type="text" placeholder="Description" {...register("description", { required: true, minLength: 5 })} />
            <div></div>
          </div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </section>
  )
}

export default ProductAdd