import axios from 'axios';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const fetcher = async (url: string) => {
  const token = getAuthToken();

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true
  }).then(res => res.data);
};
