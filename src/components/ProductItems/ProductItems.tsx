import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../common/types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from 'antd';
type Props = {
  data: Product,

}
const ProductItems = ({ data }: Props): ReactElement => {
  const { addToCart } = useCart()
  const { user } = useAuth()
  const handleAddToCart = async () => {
    if (user?._id) {
      await addToCart({ userId: user._id, useProduct: data._id as string, quantity: 1, price: data.price })
    }
  }
  return (
    <div key={data?._id} className='border rounded-lg'>
      <div className='object-fill'>
        <Link to={`/details/${data?._id}`}>
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
        <Button type='primary' onClick={handleAddToCart} >Add to cart</Button>

      </div>
    </div>
  )
}

export default ProductItems
