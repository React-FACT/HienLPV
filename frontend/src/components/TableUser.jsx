import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from './Modal';
import RowUser from './RowUser';
import tableLabel from '../constants/label.constant';
import userActions from '../redux/action/user';

const TableUser = () => {
  // State
  const [modalShow, setModalShow] = useState(false);
  const [userEdit, setUserEdit] = useState(null);

  // Redux
  const userList = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Effect
  useEffect(() => {
    dispatch(userActions.fetchUsers());
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
            <th rowSpan={2}>{tableLabel.UserID}</th>
            <th rowSpan={2}>{tableLabel.Full_Name}</th>
            <th rowSpan={2}>{tableLabel.Email}</th>
            <th rowSpan={2}>{tableLabel.Birth_Date}</th>
            <th colSpan={2}>{tableLabel.Activity_Date}</th>
            <th rowSpan={2}>{tableLabel.Admin}</th>
            <th rowSpan={2}>{tableLabel.Status}</th>
            <th rowSpan={2} colSpan={3} className='add' onClick={handleAddUser}>
              {tableLabel.ADD}&nbsp;
              <i className='fa fa-plus' aria-hidden='true'></i>
            </th>
          </tr>
          <tr>
            <th>{tableLabel.First_login_date}</th>
            <th>{tableLabel.Last_login_date}</th>
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
            <td colSpan='8'>{tableLabel.ACTIVE}</td>
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
