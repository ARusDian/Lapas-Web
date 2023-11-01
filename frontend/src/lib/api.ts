import axios from 'axios';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { LoginProps, Role } from '../types/Auth.type';


const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  },

});

const getAllRoles = async () => {
  const response = await api.get('/roles', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data.data.data as Role[];
}

const login = async (data: LoginProps) => {
  try {
    const response = await signInWithEmailAndPassword(auth, data.email, data.password) as any;
    localStorage.setItem("accessToken", response.user.accessToken);
    return response;
  } catch (error) {
    return error;
  }
}

const getAuthData = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await api.get('/auth/authenticated', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response as any;
  } catch (error) {
    return error;
  }
}

export { api, getAllRoles, login, getAuthData }