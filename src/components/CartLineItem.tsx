import { Button, List, Popconfirm } from "antd"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"

type Props = {
  item: {
    useProduct: string,
    price: number,
    quantity: number
  }
}
const CartLineItem = ({ item }: Props) => {
  const { user } = useAuth()
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart()
  const userId = user?._id
  const data = { ...item, userId }

  return (
    <List.Item actions={[
      <Button type="primary" className="bg-green-600" onClick={() => decreaseQuantity(data)}>-</Button>,
      <Button type="primary" className="bg-green-600" onClick={() => increaseQuantity(data)}>+</Button>,
      <Popconfirm title="Delete item ?" description="Are you sure to delete this item" onConfirm={() => removeFromCart(data)}>
        <Button type="primary" danger>Remove</Button>
      </Popconfirm>
    ]}>
      <List.Item.Meta title={<p>{item.useProduct}</p>}
        description={`Quantity: ${item.quantity}`} />
      <div>Total: ${item.price! * item.quantity}</div>
    </List.Item>
  )
}

export default CartLineItem