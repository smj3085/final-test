// see SignupForm.js for comments
import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import {FaPlaneDeparture } from 'react-icons/fa';
import { loginUser } from '../utils/API';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await loginUser(userFormData);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
    <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='black' textAlign='center'>
            <FaPlaneDeparture /> Log-in to your account
          </Header>

        <Form size='large' noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Message negative dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          <Message.Header>Something went wrong with your login credentials!</Message.Header>
        </Message>
        <Segment stacked>
          <Form.Input 
                htmlFor='email'
                fluid icon='user' 
                iconPosition='left' 
                placeholder='E-mail address'
                name='email'
                onChange={handleInputChange}
                value={userFormData.email}
                required
          />
          <Form.Input
                htmlFor='password'
                fluid icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='password'
                onChange={handleInputChange}
                value={userFormData.password}
                required
          />
        <Button color='yellow' fluid size='large' type='submit'
              disabled={!(userFormData.email && userFormData.password)}>
                Login
              </Button>
              </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default LoginForm;
