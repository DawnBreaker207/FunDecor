import { Category } from '../interfaces/Category';
import instance from './config';

const GetCategoryAll = async () => {
  try {
    const { data } = await instance.get('/category');
    return data;
  } catch (error) {
    console.log(error);
  }
};

const GetCategoryOne = async (id: string | number | undefined) => {
  try {
    const { data } = await instance.get(`/category/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const CreateCategory = async (dataInput: Category) => {
  try {
    const { data } = await instance.post('/category', dataInput);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const UpdateCategory = async (id: string | number, dataInput: Category) => {
  try {
    const { data } = await instance.put(`/category/${id}`, dataInput);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const DeleteCategory = async (id: string | number) => {
  try {
    await instance.delete(`/category/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export {
  GetCategoryAll,
  GetCategoryOne,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
};
