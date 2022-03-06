import axios from 'axios';

import { baseURI } from './constant';

const fetchUsers = async () => {
  try {
    const user = await axios.get(baseURI + 'auth/get-all');
    return user.data;
  } catch (e) {
    console.log(e);
  }
};

const createUser = async (data) => {
  try {
    const user = await axios.post(baseURI + 'auth', data);
    return user.data;
  } catch (e) {
    console.log(e);
  }
};

const userAPI = { fetchUsers, createUser };

export default userAPI;
