import axios from 'axios';
import getJwt from './storageService';

import { toast } from 'react-toastify';

axios.defaults.headers.common['x-auth-token'] = getJwt.getJwtToken();

axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 403;
  if (expectedError) {
    toast.error('Something went wrong, We are working on it!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
