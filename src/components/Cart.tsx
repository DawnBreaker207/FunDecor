import { Offcanvas, Stack } from 'react-bootstrap'
import { UseCart } from '../contexts/CartContext'
import CartItem from './CartItem'
import { formatCurrency } from '../utils/formatCurrency'
import { useContext } from 'react'
import { ProductContext } from '../contexts/Product.Context'


type CartProps = {
  isOpen: boolean
}
const Cart = ({ isOpen }: CartProps) => {
  const { closeCart, cartItems } = UseCart()

  const data = useContext(ProductContext)
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          Cart
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => <CartItem key={item.id} {...item} />)}
          <div className='ms-auto fw-bold fs-5'>
            Total{" "} {formatCurrency(cartItems.reduce((total, cartItem) => {
              const item = data?.state.products.find(i => i.id === cartItem.id)
              return total + (item?.price || 0) * cartItem.quantity
            }, 0))}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default Cart