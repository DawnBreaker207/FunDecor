import ProductItems from '../components/ProductItems/ProductItems';
import { Product } from '../interfaces/Product';


type Props = {
  product: Product[]
}
const Home = ({ product }: Props) => {


  return (
    <section className='md:max-w-6xl mx-auto md: my-5'>
      <div className='grid grid-cols-3 gap-10'>
        {product.map((index) => (
          <ProductItems key={index.id} data={index} />
        ))}

      </div>
    </section>
  )
}

export default Home
