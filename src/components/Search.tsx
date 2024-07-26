import { useRef, useState } from "react"
import { Product } from "../common/types/Product"
import { SearchProduct } from "../services/query.services"
import ProductItems from "./ProductItems/ProductItems"


const Search = () => {
  const query = useRef<HTMLInputElement | null>(null)

  const [results, setResult] = useState<Product[]>([])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const searchQuery = query.current?.value;
    if (searchQuery) {
      console.log(searchQuery);
      const data = await SearchProduct(searchQuery)
      console.log(data);
      setResult(data)
    }
  }

  return (
    <section className='md:max-w-6xl mx-auto md: my-5'>

      <div>
        <form className="max-w-md mx-auto">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input ref={query} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." />
            <button type="submit" onClick={handleSearch} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
      </div>
      <div className='grid grid-cols-3 gap-10'>
        {results.map((index) => (
          <ProductItems key={index._id} data={index} />
        ))}
      </div>
    </section>
  )
}

export default Search