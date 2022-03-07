import axios from 'axios';

import { baseURI } from '../constants/api.constant';

const url = baseURI + 'auth/';

const fetchUsers = async () => {
  try {
    const user = await axios.get(url + 'get-all');
    return user.data;
  } catch (e) {
    console.log(e);
  }
};

const createUser = async (data) => {
  try {
    const user = await axios.post(url, data);
    return user.data;
  } catch (e) {
    console.log(e);
  }
};

const userAPI = { fetchUsers, createUser };

export default userAPI;
