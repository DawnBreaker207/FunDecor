import { useContext } from 'react';
import ProductItems from '../components/ProductItems/ProductItems';
import { ProductContext } from '../contexts/Product.Context';
import { Product } from '../interfaces/Product';



const Home = () => {
  const context = useContext(ProductContext)

  return (
    <section className='md:max-w-6xl mx-auto md: my-5'>
      <div className='grid grid-cols-3 gap-10'>
        {context?.state.products.map((index: Product) => (
          <ProductItems key={index.id} data={index} />
        ))}
      </div>
    </section>
  )
}

export default Home
