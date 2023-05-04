import axios from 'axios';
import type IUser from '@/interfaces/IUser';

export const registerUser = async (newUser: IUser) => {
  await axios.post('/api/register', {
    ...newUser
  });
};