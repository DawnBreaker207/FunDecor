import { List } from "antd";
import { useCart } from "../contexts/CartContext";
import CartLineItem from "./CartLineItem";



const Cart = () => {
  const { state } = useCart()
  const totalItem = state.items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <>
      <List dataSource={state.items} renderItem={item => <CartLineItem key={item.useProduct} item={item} />} />
      <div>
        <p>Total: {totalItem}</p>
        <p>Total price: {totalPrice}</p>
      </div>
    </>
  )
}

export default Cart