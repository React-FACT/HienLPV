import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from './Modal';
import RowUser from './RowUser';
import { fetchUsers } from '../redux/action/user';

const TableUser = () => {
  // State
  const [modalShow, setModalShow] = useState(false);
  const [userEdit, setUserEdit] = useState(null);

  // Redux
  const userList = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Effect
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Function
  const handleAddUser = () => {
    setUserEdit(null);
    setModalShow(true);
  };
  return (
    <>
      <table id='tbUserList' className='table'>
        <thead>
          <tr>
            <th rowSpan={2}>UserID</th>
            <th rowSpan={2}>Full Name</th>
            <th rowSpan={2}>Email</th>
            <th rowSpan={2}>Birth Date</th>
            <th colSpan={2}>Activity Date</th>
            <th rowSpan={2}>Admin</th>
            <th rowSpan={2}>Status</th>
            <th rowSpan={2} colSpan={3} className='add' onClick={handleAddUser}>
              ADD&nbsp;<i className='fa fa-plus' aria-hidden='true'></i>
            </th>
          </tr>
          <tr>
            <th>First login date</th>
            <th>Last login date</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <RowUser
              key={index}
              user={user}
              index={index}
              onUserEditChange={setUserEdit}
              onEdit={setModalShow}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan='8'>Tổng số đang active</td>
            <td colSpan='4'>
              {userList.filter((user) => user.actived === 1).length}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className='modalContainer'>
        <Modal show={modalShow} onHide={setModalShow} user={userEdit} />
      </div>
    </>
  );
};

export default TableUser;
