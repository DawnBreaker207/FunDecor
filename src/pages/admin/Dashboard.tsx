import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/Button/Button"
import { useProduct } from "../../contexts/Product.Context"

import { Product } from "../../common/types/Product"



const Dashboard = () => {
  const { Delete_Product, state } = useProduct()
  const navigate = useNavigate()

  const LogOut = () => {
    if (confirm('Are you sure want to logout ?')) {
      localStorage.removeItem('token')
      navigate('/')
    }
  }
  return (
    <section className="md:max-w-6xl mx-auto">
      <div className="flex flex-row justify-start gap-10 items-center ">
        <Link to={"/"} className="py-3 px-5 my-2 bg-blue-600 rounded-lg inline-block text-white font-bold">Home</Link>
        <Link to={"/admin/product-form"} className="py-3 px-5 my-2 bg-blue-600 rounded-lg inline-block text-white font-bold">Add Product</Link>
        <Link to={"/admin/category-form"} className="py-3 px-5 my-2 bg-blue-600 rounded-lg inline-block text-white font-bold">Add Category</Link>
        <Button onClick={LogOut}>Log Out</Button>

      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
          <tr>
            <th className="px-6 py-3">Id</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">SKU</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Images</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((index: Product) => (
            <tr key={index._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{index._id}</td>
              <td className="px-6 py-4">{index.title}</td>
              <td className="px-6 py-4">{index.sku}</td>
              <td className="px-6 py-4">{index.price}</td>
              <td className="text-center">{index.thumbnail ? <img src={index.thumbnail} alt={index.description} /> : 'Updating'}</td>
              <td className="px-6 py-4">{index.category?.name}</td>
              <td className="px-6 py-4">{index.description}</td>
              <td>
                <div className="flex flex-row gap-2">

                  <Link to={`/admin/edit/${index._id}`} className="btn btn-warning">Edit</Link>
                  <Button onClick={() => Delete_Product(index._id as string)} >Delete</Button>
                </div>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Dashboard
