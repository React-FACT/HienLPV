import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Form, Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useFormik } from 'formik';

import './login.css';
import userActions from '../../redux/action/user';

function Login() {
  // State
  const [user, setUser] = useState();
  const [alert, setAlert] = useState({ show: false });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  // Redux
  const userList = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Effect
  useEffect(() => {
    dispatch(userActions.fetchUsers());
  }, [dispatch]);

  // Function
  const handleAlert = (variant, message) => {
    setAlert({ show: true, variant, message });
    setTimeout(() => setAlert({ show: false }), 2000);
  };

  const handleFormSubmit = ({ email, password }) => {
    const user = userList.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) return handleAlert('danger', 'Email or Password is Invalid!');

    if (user.roleId !== 1) handleAlert('success', 'You have user role!');

    setUser(user);
  };

  if (user?.roleId === 1) {
    return <Navigate to='/admin' replace={true} />;
  }

  return (
    <Container className='loginContainer'>
      <Form onSubmit={formik.handleSubmit}>
        <Alert show={alert.show} variant={alert.variant}>
          {alert.message}
        </Alert>
        <div className='form-container'>
          <div className='form-title'>
            Login<i className='fa fa-users' aria-hidden='true'></i>
          </div>
          <Form.Group className='form-group'>
            <i className='fa fa-envelope' aria-hidden='true'></i>
            <Form.Control
              type='email'
              name='email'
              placeholder='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group className='form-group'>
            <i className='fa fa-key' aria-hidden='true'></i>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <button className='btn-submit' type='submit'>
            <i className='fa fa-arrow-right' aria-hidden='true'></i>
          </button>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
