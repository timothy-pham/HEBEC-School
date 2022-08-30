import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config.json';

const instance = axios.create({
  baseURL: config.BASE_URL,
  timeout: 60000,
  headers: {'Content-Type': 'application/json'},
});

const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('myToken');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

instance.interceptors.request.use(
  async (config: any) => {
    const token = await _retrieveData();
    if (token !== null) {
      config.headers['token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return error.response.data;
  },
);

export default instance;
