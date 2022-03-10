import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Container, Col, Row, Form } from 'react-bootstrap';

import { createUser, updateUsers } from '../redux/action/user';
import modalLabel from '../constants/modal.constant';

const formDataInit = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  role: 'User',
  status: 'Active',
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
  const [formData, setFormData] = useState(formDataInit);
  const [validMessage, setValidMessage] = useState(validMessageInit);
  const [type, setType] = useState('add');

  // Redux
  const dispatch = useDispatch();

  // Effect
  useEffect(() => {
    if (user) {
      Object.keys(user).forEach(
        (key) => (user[key] = user[key] === null ? '' : user[key])
      );
      setType('edit');
      setFormData({
        ...formDataInit,
        ...user,
        role: user.roleId === 1 ? 'Administrator' : 'User',
        status: user.actived === 1 ? 'Active' : 'Inactive',
      });
    }
    return () => {
      setType('add');
      setFormData(formDataInit);
    };
  }, [user]);

  // Function
  const handleInputChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleInputBlur = ({ target }) => {
    showValidMessage(target.name);
  };

  const handleFileChange = ({ target }) => {
    setFormData({ ...formData, file: target.files[0] });
  };

  const handleFormSubmit = () => {
    if (!validateForm()) return;

    let dataPost = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      note: formData.note,
      address: formData.address,
      roleId: formData.role === 'User' ? 2 : 1,
      actived: formData.status === 'Inactive' ? 2 : 1,
    };

    type === 'add'
      ? dispatch(createUser(dataPost))
      : dispatch(updateUsers(user.id, dataPost));

    handleModalClose();
  };

  const handleModalClose = () => {
    ref.current.value = '';
    setFormData(formDataInit);
    setValidMessage(validMessageInit);
    onHide(false);
  };

  const validateForm = () => {
    let isValid = true;
    let newValidMessage = { ...validMessageInit };
    Object.keys(validMessage).forEach((i) => {
      if (formData[i] === '') {
        newValidMessage[i] = i + ' is required';
        isValid = false;
      }
    });
    setValidMessage(newValidMessage);
    return isValid;
  };

  const showValidMessage = (name) => {
    formData[name] === ''
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
      <Form>
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
                      value={formData.username}
                      onBlur={handleInputBlur}
                      onChange={handleInputChange}
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
                      value={formData.password}
                      onBlur={handleInputBlur}
                      onChange={handleInputChange}
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
                      value={formData.firstName}
                      onChange={handleInputChange}
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
                      value={formData.lastName}
                      onBlur={handleInputBlur}
                      onChange={handleInputChange}
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
                      value={formData.role}
                      onChange={handleInputChange}
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
                      value={formData.status}
                      onChange={handleInputChange}
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
                  value={formData.email}
                  onBlur={handleInputBlur}
                  onChange={handleInputChange}
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
                  value={formData.phone}
                  onChange={handleInputChange}
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
                          value={formData.country}
                          onChange={handleInputChange}
                        >
                          <option value=''>Quốc gia</option>
                        </Form.Select>
                      </Col>
                      <Col>
                        <Form.Select
                          name='city'
                          value={formData.city}
                          onChange={handleInputChange}
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
                          value={formData.district}
                          onChange={handleInputChange}
                        >
                          <option value=''>Quận</option>
                        </Form.Select>
                      </Col>
                      <Col>
                        <Form.Select
                          name='ward'
                          value={formData.ward}
                          onChange={handleInputChange}
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
                  value={formData.address}
                  onChange={handleInputChange}
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
                  value={formData.note}
                  onChange={handleInputChange}
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
                  onChange={handleFileChange}
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
          <Button variant='primary' onClick={handleFormSubmit}>
            {modalLabel[type].submit}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalComponent;
