import { Link } from 'react-router-dom';
import { UseCart } from '../../contexts/CartContext';
import { Product } from '../../interfaces/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../Button/Button';
type Props = {
  data: Product
}
const ProductItems: React.FC<Props> = ({ data }) => {
  const { getItemQuantity, increaseCartQuantity } = UseCart()
  const quantity = getItemQuantity(data._id as string)
  return (
    <div key={data._id} className='border rounded-lg'>
      <div className='object-fill'>
        <Link to={`/details/${data._id}`}>
          <img src={data.thumbnail} alt={data.description} className='size-full' />
        </Link>
      </div>
      <div className='md:px-5 md:py-7'>
        <h1 className='font-bold text-xl'>{data.title}</h1>
        <span className='font-semibold'>{formatCurrency(data.price)}</span>
        <p>Stock: {data.stock}</p>
        {/* <p>Category: {data.category}</p> */}
        <p className='text-sm'>{data.description}</p>
        {/* <button className='btn btn-primary mt-5'>Buy Now</button> */}
        <div className='mt-auto'>
          {quantity === 0 ? (
            <Button onClick={() => increaseCartQuantity(data?._id as string)}>+ Add to cart</Button>

          ) : (<>
            <Button> Buy Now</Button>
            <div>
              <span className='fs-3'>
                {quantity}
              </span>
              in cart
            </div>
          </>)}
        </div>


      </div>
    </div>
  )
}

export default ProductItems
