import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Container, Col, Row, Form } from 'react-bootstrap';
import { useFormik } from 'formik';

import userActions from '../redux/action/user';
import modalLabel from '../constants/modal.constant';
import getObjectNotNull from '../utils/getObjectNotNull';

const formDataInit = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  district: '',
  ward: '',
  address: '',
  note: '',
  file: null,
};

const validMessageInit = {
  username: '',
  password: '',
  email: '',
  lastName: '',
};

function ModalComponent({ show, onHide, user }) {
  // Ref
  const ref = useRef();

  // State
  const [validMessage, setValidMessage] = useState(validMessageInit);
  const [type, setType] = useState('add');
  const formik = useFormik({
    initialValues: user
      ? {
          ...formDataInit,
          ...getObjectNotNull(user),
          role: user.roleId === 1 ? 'Administrator' : 'User',
          status: user.actived === 1 ? 'Active' : 'Inactive',
        }
      : formDataInit,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  // Redux
  const dispatch = useDispatch();

  // Effect
  useEffect(() => {
    setType(user ? 'edit' : 'add');
  }, [user]);

  // Function
  const handleInputBlur = ({ target }) => {
    showValidMessage(target.name);
  };

  const handleFormSubmit = (values) => {
    if (!validateForm()) return;

    let dataPost = {
      username: values.username,
      password: values.password,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      note: values.note,
      address: values.address,
      roleId: values.role === 'User' ? 2 : 1,
      actived: values.status === 'Inactive' ? 2 : 1,
    };

    type === 'add'
      ? dispatch(userActions.createUser(dataPost))
      : dispatch(userActions.updateUsers(user.id, dataPost));

    handleModalClose();
  };

  const handleModalClose = () => {
    ref.current.value = '';
    setValidMessage(validMessageInit);
    onHide(false);
  };

  const validateForm = () => {
    let isValid = true;
    let newValidMessage = { ...validMessageInit };
    Object.keys(validMessage).forEach((i) => {
      if (formik.values[i] === '') {
        newValidMessage[i] = i + ' is required';
        isValid = false;
      }
    });
    setValidMessage(newValidMessage);
    return isValid;
  };

  const showValidMessage = (name) => {
    formik.values[name] === ''
      ? setValidMessage({
          ...validMessage,
          [name]: `${name} is required`,
        })
      : setValidMessage({ ...validMessage, [name]: '' });
  };

  return (
    <Modal
      size='lg'
      show={show}
      aria-labelledby='contained-modal-title-vcenter'
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header>
          <Modal.Title id='contained-modal-title-vcenter'>
            {modalLabel[type].title.toUpperCase()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='show-grid'>
          <Container>
            <Row>
              <Col lg={6}>
                <Row>
                  <Col lg={4}>
                    <Form.Label>Username</Form.Label>
                  </Col>
                  <Col lg={8}>
                    <Form.Control
                      type='text'
                      name='username'
                      value={formik.values.username}
                      onBlur={handleInputBlur}
                      onChange={formik.handleChange}
                    />
                    <Form.Text className='text-danger'>
                      {validMessage.username}
                    </Form.Text>
                  </Col>
                </Row>
              </Col>
              <Col lg={6}>
                <Row className='mt-md-3 mt-lg-0'>
                  <Col lg={4}>
                    <Form.Label>Password</Form.Label>
                  </Col>
                  <Col lg={8}>
                    <Form.Control
                      type='password'
                      name='password'
                      value={formik.values.password}
                      onBlur={handleInputBlur}
                      onChange={formik.handleChange}
                    />
                    <Form.Text className='text-danger'>
                      {validMessage.password}
                    </Form.Text>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col lg={6}>
                <Row>
                  <Col lg={4}>
                    <Form.Label>First name</Form.Label>
                  </Col>
                  <Col lg={8}>
                    <Form.Control
                      type='text'
                      name='firstName'
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                    />
                    <Form.Text className='text-danger'></Form.Text>
                  </Col>
                </Row>
              </Col>
              <Col lg={6}>
                <Row className='mt-md-3 mt-lg-0'>
                  <Col lg={4}>
                    <Form.Label>Last name</Form.Label>
                  </Col>
                  <Col lg={8}>
                    <Form.Control
                      type='text'
                      name='lastName'
                      value={formik.values.lastName}
                      onBlur={handleInputBlur}
                      onChange={formik.handleChange}
                    />
                    <Form.Text className='text-danger'>
                      {validMessage.lastName}
                    </Form.Text>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col lg={6}>
                <Row>
                  <Col lg={4}>
                    <Form.Label>Role</Form.Label>
                  </Col>
                  <Col lg={8}>
                    <Form.Select
                      name='role'
                      value={formik.values.role}
                      onChange={formik.handleChange}
                    >
                      <option value='Administrator'>Administrator</option>
                      <option value='User'>User</option>
                    </Form.Select>
                    <Form.Text className='text-danger'></Form.Text>
                  </Col>
                </Row>
              </Col>
              <Col lg={6}>
                <Row className='mt-md-3 mt-lg-0'>
                  <Col lg={4}>
                    <Form.Label>Status</Form.Label>
                  </Col>
                  <Col lg={8}>
                    <Form.Select
                      name='status'
                      value={formik.values.status}
                      onChange={formik.handleChange}
                    >
                      <option value='Active'>Active</option>
                      <option value='Inactive'>Inactive</option>
                    </Form.Select>
                    <Form.Text className='text-danger'></Form.Text>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col lg={2}>
                <Form.Label>Email</Form.Label>
              </Col>
              <Col lg={10}>
                <Form.Control
                  type='email'
                  name='email'
                  value={formik.values.email}
                  onBlur={handleInputBlur}
                  onChange={formik.handleChange}
                />
                <Form.Text className='text-danger'>
                  {validMessage.email}
                </Form.Text>
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col lg={2}>
                <Form.Label>Phone</Form.Label>
              </Col>
              <Col lg={2}>
                <Form.Select name='prefix'>
                  <option value='+84'>+84</option>
                </Form.Select>
              </Col>
              <Col className='mt-md-3 mt-lg-0' lg={8}>
                <Form.Control
                  type='text'
                  name='phone'
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
                <Form.Text className='text-danger'></Form.Text>
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col lg={2}>Address</Col>
              <Col lg={10}>
                <Row>
                  <Col lg={6}>
                    <Row className='mt-md-3 mt-lg-0'>
                      <Col>
                        <Form.Select
                          name='country'
                          value={formik.values.country}
                          onChange={formik.handleChange}
                        >
                          <option value=''>Quốc gia</option>
                        </Form.Select>
                      </Col>
                      <Col>
                        <Form.Select
                          name='city'
                          value={formik.values.city}
                          onChange={formik.handleChange}
                        >
                          <option value=''>Thành phố</option>
                        </Form.Select>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6}>
                    <Row className='mt-md-3 mt-lg-0'>
                      <Col>
                        <Form.Select
                          name='district'
                          value={formik.values.district}
                          onChange={formik.handleChange}
                        >
                          <option value=''>Quận</option>
                        </Form.Select>
                      </Col>
                      <Col>
                        <Form.Select
                          name='ward'
                          value={formik.values.ward}
                          onChange={formik.handleChange}
                        >
                          <option value=''>Phường</option>
                        </Form.Select>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col lg={2} />
              <Col lg={10}>
                <Form.Control
                  type='text'
                  name='address'
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
                <Form.Text className='text-danger'></Form.Text>
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col lg={2}>
                <Form.Label>Note</Form.Label>
              </Col>
              <Col lg={10}>
                <Form.Control
                  as='textarea'
                  col='5'
                  name='note'
                  value={formik.values.note}
                  onChange={formik.handleChange}
                />
                <Form.Text className='text-danger'></Form.Text>
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col lg={2}>
                <Form.Label>Upload</Form.Label>
              </Col>
              <Col lg={10}>
                <Form.Control
                  type='file'
                  onChange={(e) =>
                    formik.setFieldValue('file', e.target.files[0])
                  }
                  ref={ref}
                />
                <Form.Text className='text-danger'></Form.Text>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleModalClose}>
            {modalLabel[type].cancel}
          </Button>
          <Button variant='primary' type='submit'>
            {modalLabel[type].submit}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalComponent;
