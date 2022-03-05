import React, { useState, useEffect } from 'react';
import { Container, Form, Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import './login.css';

function Login() {
  // State
  const [userInput, setUserInput] = useState({ email: '', password: '' });
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState({});
  const [alert, setAlert] = useState({});

  // Effect
  useEffect(() => {
    setUserList([
      {
        usrID: 1,
        email: 'admin@gmail.com',
        password: 'admin',
        isAdmin: true,
      },
      {
        usrID: 2,
        email: 'user@gmail.com',
        password: 'user',
        isAdmin: false,
      },
    ]);
  }, []);

  // Function
  const handleAlert = (variant, message) => {
    setAlert({ show: true, variant, message });
    setTimeout(() => setAlert({ show: false }), 2000);
  };

  const handleFormInputChange = ({ target }) => {
    setUserInput({ ...userInput, [target.name]: target.value });
  };

  const handleFormSubmit = () => {
    const user = userList.find(
      (u) => u.email === userInput.email && u.password === userInput.password
    );

    if (!user) return handleAlert('danger', 'Email or Password is Invalid!');

    setUser(user);
  };

  if (user.isAdmin) {
    return <Navigate to='/admin' replace={true} />;
  }

  return (
    <Container className='loginContainer'>
      <Form>
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
              value={userInput.email}
              onChange={handleFormInputChange}
            />
          </Form.Group>
          <Form.Group className='form-group'>
            <i className='fa fa-key' aria-hidden='true'></i>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
              value={userInput.password}
              onChange={handleFormInputChange}
            />
          </Form.Group>
          <div className='btn-submit' onClick={handleFormSubmit}>
            <i className='fa fa-arrow-right' aria-hidden='true'></i>
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
