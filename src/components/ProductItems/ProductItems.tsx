import { Link } from 'react-router-dom';
import { Product } from '../../interfaces/Product';
import Button from '../Button/Button';
import { UseCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
type Props = {
  data: Product
}
const ProductItems: React.FC<Props> = ({ data }) => {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = UseCart()
  const quantity = getItemQuantity(data.id as number)
  return (
    <div key={data.id} className='border rounded-lg'>
      <div className='object-fill'>
        <Link to={`/details/${data.id}`}>
          <img src={data.thumbnail} alt={data.description} className='size-full' />
        </Link>
      </div>
      <div className='md:px-5 md:py-7'>
        <h1 className='font-bold text-xl'>{data.title}</h1>
        <span className='font-semibold'>{formatCurrency(data.price)}</span>
        <p>Stock: {data.stock}</p>
        <p>Category: {data.category}</p>
        <p className='text-sm'>{data.description}</p>
        {/* <button className='btn btn-primary mt-5'>Buy Now</button> */}
        <div className='mt-auto'>
          {quantity === 0 ? (
            <Button onClick={() => increaseCartQuantity(data?.id as number)}>+ Add to cart</Button>

          ) : (<>
            <Button> Buy Now</Button>
            <Button onClick={() => decreaseCartQuantity(data.id as number)}>-</Button>
            <div>
              <span className='fs-3'>
                {quantity}
              </span>
              in cart
            </div>
            <Button onClick={() => increaseCartQuantity(data?.id as number)}>+</Button>
            <Button onClick={() => removeFromCart(data.id as number)}>Remove</Button> </>)}
        </div>


      </div>
    </div>
  )
}

export default ProductItems
