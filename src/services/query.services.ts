import instance from './config';

const SearchProduct = async (kw: string) => {
  try {
    const { data } = await instance.get(`/products?title_like=${kw}`);
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
