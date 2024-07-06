import { Product } from '../interfaces/Product';
import instance from './config';

const GetProductAll = async () => {
  try {
    const { data } = await instance.get('/products');
    return data.res;
  } catch (error) {
    console.log(error);
  }
};

const GetProductOne = async (id: string | number | undefined) => {
  try {
    const { data } = await instance.get(`/products/${id}`);
    return data.res;
  } catch (error) {
    console.log(error);
  }
};

const CreateProduct = async (dataInput: Product) => {
  try {
    const { data } = await instance.post('/products', dataInput);
    return data.res;
  } catch (error) {
    console.log(error);
  }
};

const UpdateProduct = async (id: string | number, dataInput: Product) => {
  try {
    const { data } = await instance.put(`/products/update/${id}`, dataInput);
    return data.res;
  } catch (error) {
    console.log(error);
  }
};

const DeleteProduct = async (id: string | number) => {
  try {
    await instance.delete(`/products/delete/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export {
  GetProductAll,
  GetProductOne,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
};
