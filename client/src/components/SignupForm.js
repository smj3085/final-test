import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';


const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
    <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='black' textAlign='center'>
        Create a new account
      </Header>
      {/* This is needed for the validation functionality above */}
      <Form size='large' onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
  

        <Segment stacked>
            <Form.Input 
            htmlFor='username'
            fluid icon='user' 
            iconPosition='left' 
            placeholder='Your Name'
            name='username'
            onChange={handleChange}
            value={formState.username}
            required
            />   
            <Form.Input 
                htmlFor='email'
                fluid icon='envelope' 
                iconPosition='left' 
                placeholder='E-mail address'
                name='email'
                type='email'
                onChange={handleChange}
                value={formState.email}
                required
                 />
            <Form.Input
                fluid icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='password'
                onChange={handleChange}
                value={formState.password}
                required
            />

            <Button 
            disabled={!(formState.username && formState.email && formState.password)}
            type='submit' color='yellow' fluid size='large'>
              Signup
            </Button>
          </Segment>
        </Form>
    </Grid.Column>
  </Grid>
    </>
  );
};

export default Signup;