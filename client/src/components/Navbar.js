import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import { FaPlaneDeparture } from 'react-icons/fa';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar  className='topnav' expand='md'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/' className='btn btn-lg text-black'>
            <FaPlaneDeparture />
          </Navbar.Brand>
          <h1 className="title font-header">TravelBlog</h1>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              {/* if user is logged in show all tabs and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link style={{color:'black'}} as={Link} to='/dashboard'>
                    Dashboard
                  </Nav.Link>
              
                  <Nav.Link style={{color:'black'}} as={Link} to='/tripplanner'>
                    Trip planner
                  </Nav.Link>
                  <Nav.Link style={{color:'black'}} as={Link} to='/expenses'>
                    Expenses
                  </Nav.Link>
                  <Nav.Link style={{color:'black'}} onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link style={{color:'black'}} onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='tabs'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;