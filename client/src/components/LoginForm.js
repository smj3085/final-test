import React, { useState } from 'react';
import Auth from '../utils/auth';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import {FaPlaneDeparture } from 'react-icons/fa';
import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import { Alert } from 'react-bootstrap';

const LoginForm = () => {
    const [login, {error} ] = useMutation(LOGIN_USER);
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({
            ...userFormData,
            [name]: value
        });
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: {...userFormData}
            });
            Auth.login(data.login.token);
        } catch (error) {
            console.error(error);
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
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
              Please check your email and password!
            </Alert>
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
              {error && <div>Login failed</div>}
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
  </>
    );
};

export default LoginForm;