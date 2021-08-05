import React, { useState } from 'react';
import Auth from '../utils/auth';
// import { Form, Button, Alert } from 'react-bootstrap';
import { ADD_USER } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { Alert } from 'react-bootstrap';


const SignupForm = () => {
    const [addUser, { error }] = useMutation(ADD_USER);
   
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  
    const [validated] = useState(false);
   
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: {...userFormData}
            });

            Auth.login(data.addUser.token);
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
        Create a new account
      </Header>
      <Form size='large' noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Something went wrong with your signup!
        </Alert>
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
          {error && <div>Sign up failed</div>}
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
  </>

    );
};

export default SignupForm;