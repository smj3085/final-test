// see SignupForm.js for comments
import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import {FaPlaneDeparture } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
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

        <Form size='large' onSubmit={handleFormSubmit}>
        <Segment stacked>
          <Form.Input 
                htmlFor='email'
                fluid icon='user' 
                iconPosition='left' 
                placeholder='E-mail address'
                name='email'
                onChange={handleChange}
                value={formState.email}
                required
          />
          <Form.Input
                htmlFor='password'
                fluid icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='password'
                onChange={handleChange}
                value={formState.password}
                required
          />
        <Button color='yellow' fluid size='large' type='submit'>
                Login
              </Button>
              
              </Segment>
          </Form>
          {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}

        </Grid.Column>
      </Grid>
    </>
  );
};

export default Login;
