import axios from 'axios';

import { baseURI } from '../constants/api.constant';

const url = baseURI + 'auth';

const fetchUsers = async () => {
  try {
    const { data } = await axios.get(`${url}/get-all`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const createUser = async (body) => {
  try {
    const { data } = await axios.post(url, body);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (id, body) => {
  try {
    const { data } = await axios.put(`${url}/${id}`, body);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = async (id) => {
  try {
    const { data } = await axios.delete(`${url}/${id}`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const userAPI = { fetchUsers, createUser, deleteUser, updateUser };

export default userAPI;
