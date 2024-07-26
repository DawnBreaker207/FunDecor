import { CartTypeInput } from '../common/types/Cart';
import instance from '../configs/axios';

const Get_Cart = async (userId: string) => {
  try {
    const { data } = await instance.get(`cart/${userId}`);
    return data.res.products;
  } catch (error) {
    console.log(error);
  }
};

const Add_To_Cart = async (dataInput: CartTypeInput) => {
  try {
    const { data } = await instance.post('/cart/add-to-cart', {
      userId: dataInput.userId,
      useProduct: dataInput.useProduct,
      quantity: dataInput.quantity,
    });
    return data.res;
  } catch (error) {
    console.log(error);
  }
};
const Update_Cart = async (dataInput: CartTypeInput) => {
  try {
    const { data } = await instance.put('/cart/update-product-quantity', {
      userId: dataInput.userId,
      useProduct: dataInput.useProduct,
      quantity: dataInput.quantity,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
const Remove_From_Cart = async (dataInput: CartTypeInput) => {
  try {
    await instance.delete(`/cart/remove-cart`, {
      data: {
        userId: dataInput.userId,
        useProduct: dataInput.useProduct,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const Increase_Quantity = async (dataInput: CartTypeInput) => {
  try {
    await instance.post(`/cart/increase`, {
      userId: dataInput.userId,
      useProduct: dataInput.useProduct,
    });
  } catch (error) {
    console.log(error);
  }
};
const Decrease_Quantity = async (dataInput: CartTypeInput) => {
  try {
    await instance.post(`/cart/decrease`, {
      userId: dataInput.userId,
      useProduct: dataInput.useProduct,
    });
  } catch (error) {
    console.log(error);
  }
};
export {
  Add_To_Cart,
  Decrease_Quantity,
  Get_Cart,
  Increase_Quantity,
  Remove_From_Cart,
  Update_Cart,
};
