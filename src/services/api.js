import Axios from 'axios';

Axios.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return req;
});

export default Axios;
