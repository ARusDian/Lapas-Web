import axios from 'axios';
import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { LoginProps, Role } from '../types/Auth.type';
import { API_URL } from '../lib/env';


const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    'Access-Control-Allow-Origin': '*',
  },
});

const getAllRoles = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const response = await api.get('/roles', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  return response.data.data.data as Role[];
}

const login = async (data: LoginProps) => {
  try {
    const response: UserCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    localStorage.setItem("accessToken", response.user.accessToken);
    return response;
  } catch (error) {
    throw error;
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
    throw error;
  }
}

export { api, getAllRoles, login, getAuthData }