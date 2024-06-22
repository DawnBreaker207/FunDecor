import { Product } from '../interfaces/Product';
import instance from './config';
// import { UploadImages } from './upload.services';

const GetProductAll = async () => {
  try {
    const { data } = await instance.get('/products');
    return data;
  } catch (error) {
    console.log(error);
  }
};

const GetProductOne = async (id: string | number | undefined) => {
  try {
    const { data } = await instance.get(`/products/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const CreateProduct = async (dataInput: Product) => {
  try {
    const { data } = await instance.post('/products', dataInput);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const UpdateProduct = async (id: string | number, dataInput: Product) => {
  try {
    const { data } = await instance.put(`/products/${id}`, dataInput);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const DeleteProduct = async (id: string | number) => {
  try {
    await instance.delete(`/products/${id}`);
  } catch (error) {
    console.log(error);
  }
};

// const Upload_Images = async (file: any) => {
// try {
//   console.log(file);
//   const formData = new FormData();
//   formData.append('file', file[0]);
//   formData.append('upload_preset', 'ujvh22vi');
//   const images = await UploadImages(formData);
//   console.log(images);
// } catch (error) {
//   console.log(error);
// }
// };
export {
  GetProductAll,
  GetProductOne,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  // Upload_Images,
};
