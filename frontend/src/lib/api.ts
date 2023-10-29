import axios from 'axios';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { LoginProps } from '../types/Auth.type';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAllRoles = async () => {
  const response = await api.get('/roles');
  return response;
}

const login = async (data: LoginProps) => {
  try {
    const response = await signInWithEmailAndPassword(auth, data.email, data.password);
    return response;
  } catch (error) {
    return error;
  }

}

export { api, getAllRoles, login }