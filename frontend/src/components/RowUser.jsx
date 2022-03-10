import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deleteUser } from '../redux/action/user';

const RowUser = ({ user, onEdit, onUserEditChange }) => {
  // Redux
  const dispatch = useDispatch();

  // Function
  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEditUser = (user) => {
    onUserEditChange(user);
    onEdit(true);
  };

  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.lastName + ' ' + user.firstName}</td>
      <td>{user.email}</td>
      <td>{moment(new Date()).format('D/M/Y')}</td>
      <td>{moment(new Date()).format('D/M/Y')}</td>
      <td>{moment(new Date()).format('D/M/Y')}</td>
      <td>
        <input
          type='checkbox'
          checked={user.roleId === 1}
          onChange={() => {}}
        />
      </td>
      <td>
        <input type='radio' checked={user.actived === 1} onChange={() => {}} />
        <span>{user.actived === 1 ? 'Active' : 'Inactive'}</span>
      </td>
      <td>
        <i className='fa fa-eye view' aria-hidden='true'></i>
      </td>
      <td>
        <i
          className='fa fa-pencil edit'
          aria-hidden='true'
          onClick={() => handleEditUser(user)}
        ></i>
      </td>
      <td>
        <i
          className='fa fa-trash delete'
          aria-hidden='true'
          onClick={() => handleDeleteUser(user.id)}
        ></i>
      </td>
    </tr>
  );
};

export default RowUser;
