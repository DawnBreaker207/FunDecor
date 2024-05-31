import { Link } from "react-router-dom"
import { Product } from "../../interfaces/Product"

type Props = {
  product: Product[]
}
const Dashboard = ({ product }: Props) => {
  return (
    <section className="md:max-w-6xl mx-auto">
      <Link to={"/admin/add"} className="py-3 px-5 my-2 bg-blue-600 rounded-lg inline-block text-white font-bold">Add New</Link>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
          <th className="px-6 py-3">Id</th>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Price</th>
          <th className="px-6 py-3">Images</th>
          <th className="px-6 py-3">Description</th>
          <th className="px-6 py-3">Action</th>

        </thead>
        <tbody>
          {product.map((index) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{index.id}</td>
              <td className="px-6 py-4">{index.title}</td>
              <td className="px-6 py-4">{index.price}</td>
              <td><img src={index.thumbnail} alt={index.description} /></td>
              <td className="px-6 py-4">{index.description}</td>
              <td>
                <div className="flex flex-row gap-2">

                  <button className="btn btn-warning">Edit</button><button className="btn btn-danger">Delete</button>
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
