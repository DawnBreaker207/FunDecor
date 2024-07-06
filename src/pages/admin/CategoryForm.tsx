import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { CategoryContext } from "../../contexts/CategoryContext"
import { Category, CategoryAction } from "../../interfaces/Category"
import categorySchema from "../../schemaValid/categorySchema"
import { CreateCategory, UpdateCategory } from "../../services/category.config"
import instance from "../../services/config"

const CategoryForm = () => {
  const context = useContext(CategoryContext)
  const navigate = useNavigate()
  const { _id } = useParams()
  const { register, formState: { errors }, handleSubmit, reset } = useForm<Category>({ resolver: zodResolver(categorySchema) })

  useEffect(() => {
    if (_id) {
      (async () => {
        const { data } = await instance.get(`/products/${_id}`)
        console.log(data);
        reset(data)

      })()
    }
  }, [_id, reset])
  const handleSubmitForm = async (res: Category) => {
    try {
      if (_id) {
        await UpdateCategory(_id, res)
        context?.dispatch({
          type: CategoryAction.UPDATE_CATEGORIES, payload: { _id, ...res }
        })
        if (confirm('Edit success, go to dashboard')) {
          navigate("/admin")
        }
      } else {
        const data = await CreateCategory(res)
        context?.dispatch({
          type: CategoryAction.ADD_CATEGORIES, payload: data
        })
        if (confirm('Add success, go to dashboard')) {
          navigate("/admin")
        }
      }
    } catch (error) {
      console.log(error);
    }


  }

  return (
    <section className="md:max-w-6xl mx-auto">
      <div className="my-5">
        <h1 className="my-5 text-3xl font-bold text-center">{_id ? 'Category Edit' : "Category Add"}</h1>
        <form action="" onSubmit={handleSubmit(handleSubmitForm)} className="md:max-w-2xl md:mx-auto">
          <div className="mb-3">
            <label className="form-label" htmlFor="Name">Name</label>
            <input className="form-control" type="text" placeholder="Name" {...register("name", { required: true, minLength: 5 })} />
            <div className="font-bold text-red-600">{errors.name && <p>{errors.name?.message}</p>}</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="Slug">Slug</label>
            <input className="form-control" type="text" placeholder="Slug" {...register("slug", { required: true, minLength: 5 })} />
            <div className="font-bold text-red-600">{errors.slug && <p>{errors.slug?.message}</p>}</div>
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

export default CategoryForm