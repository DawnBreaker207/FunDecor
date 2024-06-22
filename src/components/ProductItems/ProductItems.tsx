import { Link } from 'react-router-dom';
import { Product } from '../../interfaces/Product';
import Button from '../Button/Button';
type Props = {
  data: Product
}
const ProductItems: React.FC<Props> = ({ data }) => {
  return (
    <div key={data.id} className='border rounded-lg'>
      <div className='object-fill'>
        <Link to={`/details/${data.id}`}>
          <img src={data.thumbnail} alt={data.description} className='size-full' />
        </Link>
      </div>
      <div className='md:px-5 md:py-7'>
        <h1 className='font-bold text-xl'>{data.title}</h1>
        <span className='font-semibold'>${data.price}</span>
        <p>Stock: {data.stock}</p>
        <p>Category: {data.category}</p>
        <p className='text-sm'>{data.description}</p>
        {/* <button className='btn btn-primary mt-5'>Buy Now</button> */}
        <Button> Buy Now</Button>
      </div>
    </div>
  )
}

export default ProductItems
