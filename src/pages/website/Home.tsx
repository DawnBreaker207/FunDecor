import { Product } from '../../common/types/Product';
import ProductItems from '../../components/ProductItems/ProductItems';
import { useProduct } from '../../contexts/Product.Context';




const Home = () => {
  const product = useProduct()



  if (product?.state.isLoading) return <div>Loading...</div>

  if (product?.state.error) return <div>Error: {product.state.error}</div>
  return (
    <section className='md:max-w-6xl mx-auto md: my-5'>
      <div className='grid grid-cols-3 gap-10'>
        {product?.state.products.map((index: Product) => {

          return (

            <ProductItems key={index._id} data={index} />
          )
        }
        )}
      </div>
    </section>
  )
}

export default Home
