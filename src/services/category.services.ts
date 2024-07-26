import { Category } from '../common/types/Category';
import instance from '../configs/axios';

const GetCategoryAll = async () => {
  try {
    const { data } = await instance.get('/categories');
    return data.res;
  } catch (error) {
    console.log(error);
  }
};

const GetCategoryOne = async (id: string | number | undefined) => {
  try {
    const { data } = await instance.get(`/categories/${id}`);
    return data.res;
  } catch (error) {
    console.log(error);
  }
};

const CreateCategory = async (dataInput: Category) => {
  try {
    const { data } = await instance.post('/categories', dataInput);

    return data.res;
  } catch (error) {
    console.log(error);
  }
};

const UpdateCategory = async (id: string | number, dataInput: Category) => {
  try {
    const { data } = await instance.put(`/categories/${id}`, dataInput);
    return data.res;
  } catch (error) {
    console.log(error);
  }
};

const DeleteCategory = async (id: string | number) => {
  try {
    await instance.delete(`/categories/${id}`);
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
