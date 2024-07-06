import { AuthType } from '../interfaces/Auth';
import instance from './config';

const Sign_Up = async (dataInput: AuthType) => {
  try {
    const { data } = await instance.post('/auth/register', dataInput);
    return data.res;
  } catch (error) {
    console.log(error);
  }
};
const Sign_In = async (dataInput: AuthType) => {
  try {
    const { data } = await instance.post('/auth/login', dataInput);
    return data.res;
  } catch (error) {
    console.log(error);
  }
};

const Check_Authorization = async (token: string) => {
  const { data } = await instance.get('/auth/check-auth', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.res;
};
export { Sign_Up, Sign_In, Check_Authorization };
