import React from 'react';
import { Container } from 'react-bootstrap';
import TableUser from '../../components/TableUser';

import './dashboard.css';

function Dashboard() {
  return (
    <Container fluid>
      <h1>Admin Dashboard</h1>
      <TableUser />
    </Container>
  );
}

export default Dashboard;
