import { AuthType } from '../interfaces/Auth';
import instance from './config';

const Sign_Up = async (dataInput: AuthType) => {
  try {
    const { data } = await instance.post('/register', dataInput);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const Sign_In = async (dataInput: AuthType) => {
  try {
    const { data } = await instance.post('/login', dataInput);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { Sign_Up, Sign_In };
