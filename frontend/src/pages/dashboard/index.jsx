import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Modal from '../../components/Modal';
import { fetchUsers } from '../../redux/action/user';
import './dashboard.css';

function Dashboard() {
  // State
  const [modalShow, setModalShow] = useState(false);

  // Redux
  const userList = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Effect
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className='container-fluid'>
      <h1>Admin Dashboard</h1>
      <table id='tbUserList' className='table'>
        <thead>
          <tr>
            <th rowSpan={2}>No</th>
            <th rowSpan={2}>UserID</th>
            <th rowSpan={2}>Full Name</th>
            <th rowSpan={2}>Email</th>
            <th rowSpan={2}>Birth Date</th>
            <th colSpan={2}>Activity Date</th>
            <th rowSpan={2}>Admin</th>
            <th rowSpan={2}>Status</th>
            <th
              rowSpan={2}
              colSpan={3}
              className='add'
              onClick={() => setModalShow(true)}
            >
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
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.id}</td>
              <td>{user.lastName + ' ' + user.firstName}</td>
              <td>{user.email}</td>
              <td>{moment(new Date()).format('D/M/Y')}</td>
              <td>{moment(new Date()).format('D/M/Y')}</td>
              <td>{moment(new Date()).format('D/M/Y')}</td>
              <td>
                {user.roleId === 1 ? (
                  <input type='checkbox' onChange={() => {}} checked />
                ) : (
                  <input type='checkbox' />
                )}
              </td>
              <td>
                {user.actived === 1 ? (
                  <input type='radio' onChange={() => {}} checked />
                ) : (
                  <input type='radio' />
                )}
                <span>{user.actived === 1 ? 'Active' : 'Inactive'}</span>
              </td>
              <td>
                <i
                  className='fa fa-eye view'
                  aria-hidden='true'
                  id={user.id}
                ></i>
              </td>
              <td>
                <i
                  className='fa fa-pencil edit'
                  aria-hidden='true'
                  id={user.id}
                ></i>
              </td>
              <td>
                <i
                  className='fa fa-trash delete'
                  aria-hidden='true'
                  id={user.id}
                ></i>
              </td>
            </tr>
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
        <Modal show={modalShow} onHide={setModalShow} />
      </div>
    </div>
  );
}

export default Dashboard;
