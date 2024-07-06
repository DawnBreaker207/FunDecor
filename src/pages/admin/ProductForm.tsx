import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { CategoryContext } from "../../contexts/CategoryContext"
import { ProductContext } from "../../contexts/Product.Context"
import { Product, ProductAction } from "../../interfaces/Product"
import productSchema from "../../schemaValid/productSchema"
import { CreateProduct, GetProductOne, UpdateProduct } from "../../services/product.config"
import { UploadImage } from "../../services/upload.services"


const ProductForm = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null)
  // Archive user option
  const [thumbnailOption, setThumbnailOption] = useState("keep")
  const contextProduct = useContext(ProductContext)
  const contextCategory = useContext(CategoryContext)
  const navigate = useNavigate()
  const { id } = useParams()


  const { register, formState: { errors }, handleSubmit, reset } = useForm<Product>({ resolver: zodResolver(productSchema) })

  useEffect(() => {
    if (id) {

      (async () => {
        const data = await GetProductOne(id)
        reset(data)
        setThumbnailUrl(data?.thumbnail)
      })()
    }
  }, [id, reset])
  const handleSubmitForm = async (res: Product) => {
    try {
      let updateProduct = { ...res };
      // Check select of admin and resolve
      switch (thumbnailOption) {
        case "upload":

          // Resolve upload image if admin choose upload from local
          if (res.thumbnail && res.thumbnail[0]) {
            const thumbnailUrl = await UploadImage(res.thumbnail[0])
            updateProduct = { ...updateProduct, thumbnail: thumbnailUrl }
          }
          break;
        default:
          // Keep image if not thing change
          // Default when use chose "link image online"
          // Switch case for more use case in the future
          break;
      }

      if (id) {
        const _id = id
        const data = await UpdateProduct(_id, updateProduct)
        console.log(data);

        contextProduct?.dispatch({
          type: ProductAction.UPDATE_PRODUCTS, payload: { _id, ...updateProduct }
        })
        if (confirm('Edit success, go to dashboard')) {
          navigate("/admin")
        }
      } else {
        const data = await CreateProduct(updateProduct)
        contextProduct?.dispatch({
          type: ProductAction.ADD_PRODUCTS, payload: data
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
        <h1 className="my-5 text-3xl font-bold text-center">{id ? 'Product Edit' : "Product Add"}</h1>
        <form action="" onSubmit={handleSubmit(handleSubmitForm)} className="md:max-w-2xl md:mx-auto">
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
          <div className="mb-3">
            <label className="form-label" htmlFor="Category">Category</label>
            <select {...register("category")} >
              <option value="Default">Default</option>
              {contextCategory?.state.categories.map((index) => (
                <option key={index._id} value={index._id}>{index.name}</option>
              ))}
            </select>
            <div className="font-bold text-red-600">{errors.category && <p>{errors.category?.message}</p>}</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="thumbnailOption">Choose Thumbnail Option</label>
            <select className="form-control" value={thumbnailOption} onChange={(e) => setThumbnailOption(e.target.value)}>
              <option value="keep">Keep Current Thumbnail</option>
              <option value="link">Keep Current from Link </option>
              <option value="upload">Upload Thumbnail from Local</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="thumbnail">Thumbnail</label>
            {thumbnailOption === "link" && (

              <input className="form-control" type="text" placeholder="Link" {...register("thumbnail")} />
            )}
            {thumbnailOption === "upload" && (
              <input className="form-control" type="file" placeholder="Link" {...register("thumbnail", { required: true })} />
            )}
            <div className="font-bold text-red-600">{errors.thumbnail && <p>{errors.thumbnail?.message}</p>}</div>

            {thumbnailUrl && (
              <img src={thumbnailUrl} alt="Product Thumbnail" style={{ maxWidth: "200px", marginTop: "10px" }} />
            )}
          </div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </section>
  )
}

export default ProductForm