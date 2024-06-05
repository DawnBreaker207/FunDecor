import instance from './api';

const getProduct = async () => {
  try {
    const { data } = await instance.get('/products');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getProduct };
