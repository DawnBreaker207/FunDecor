import instance from '../configs/axios';

const SearchProduct = async (kw: string) => {
  const  url = '/products';
  // if (kw) {
  //   url += kw;
  // }
  const query = !kw ? `${url}/query?_search=${kw}` : `${url}`;
  try {
    const { data } = await instance.get(query);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const SortCategory = async (kw: string) => {
  try {
    const { data } = await instance.get(`/products?category=${kw}`);
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
const SortPrice = async (kw: string) => {
  try {
    const { data } = await instance.get(`/products?price_lte=${kw}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { SearchProduct, SortCategory, SortPrice };
