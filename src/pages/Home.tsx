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
          // <div key={index.id} className='border rounded-lg'>
          //   <div className='object-fill'>
          //     <Link to={`/details/${index.id}`}>
          //       <img src={index.thumbnail} alt={index.description} className='size-full' />
          //     </Link>
          //   </div>
          //   <div className='md:px-5 md:py-7'>
          //     <h1 className='font-bold text-xl'>{index.title}</h1>
          //     <span className='font-semibold'>${index.price}</span>
          //     <p>Stock {index.stock}</p>
          //     <p className='text-sm'>{index.description}</p>
          //     <button className='btn btn-primary mt-5'>Buy Now</button>
          //   </div>
          // </div>
          <ProductItems key={index.id} data={index} />
        ))}

      </div>
    </section>
  )
}

export default Home
