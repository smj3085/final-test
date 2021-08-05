import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { createUser } from '../utils/API';
import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
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
      const response = await createUser(userFormData);

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
        Create a new account
      </Header>
      {/* This is needed for the validation functionality above */}
      <Form size='large' noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Message negative dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Message>

        <Segment stacked>
            <Form.Input 
            htmlFor='username'
            fluid icon='user' 
            iconPosition='left' 
            placeholder='Your Name'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
            />   
            <Form.Input 
                htmlFor='email'
                fluid icon='envelope' 
                iconPosition='left' 
                placeholder='E-mail address'
                name='email'
                type='email'
                onChange={handleInputChange}
                value={userFormData.email}
                required
                 />
            <Form.Input
                fluid icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='password'
                onChange={handleInputChange}
                value={userFormData.password}
                required
            />

          <Button 
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
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

export default SignupForm;
