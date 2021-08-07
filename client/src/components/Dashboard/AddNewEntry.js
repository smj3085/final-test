import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { Grid, Segment, Form, Modal, Button, TextArea, FormGroup, Rating, Icon } from 'semantic-ui-react';
import {RiUserLocationLine} from 'react-icons/ri';

import { ADD_ENTRY } from '../../utils/mutations';
import { QUERY_ENTRIES } from '../../utils/queries';

import Auth from '../../utils/auth';

const AddNewEntryForm = () => {
  const [formState, setFormState] = useState({ entryText: '', entryPlace: '', startDate: '', endDate: ''})

  const [addEntry] = useMutation(ADD_ENTRY, {
    update(cache, { data: { addEntry } }) {
      try {
        const { entries } = cache.readQuery({ query: QUERY_ENTRIES });

        cache.writeQuery({
          query: QUERY_ENTRIES,
          data: { entries: [addEntry, ...entries] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addEntry({
        variables: {...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      entryText: '',
      entryPlace: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

    return (
        <>
        <Grid fluid textAlign='center'>
            <Grid.Column style={{ maxWidth: 1000, padding: '50px'}}>
            <h1 color='black' textAlign='center'>
                <RiUserLocationLine/>Your new entry!
            </h1>

            <Form size='large' onSubmit={handleFormSubmit}>
            <Segment stacked>
              <Form.Field>
                <label htmlFor='place'>Place</label>
                <input 
                  placeholder='Where did you go?'
                  name='place'
                  onChange={handleChange}
                  value={formState.place}
                  required
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor='startDate'>Start Date</label>
                <input 
                  placeholder='When did you first arrive?'
                  name='startDate'
                  onChange={handleChange}
                  value={formState.startDate}
                  required
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor='endDate'>End Date</label>
                <input 
                  placeholder='When did you leave?'
                  name='endDate'
                  onChange={handleChange}
                  value={formState.endDate}
                  required
                />
              </Form.Field>
              <Form.Field>
              <label htmlFor='description'>Description</label>
              <TextArea
                  placeholder='Tell me more!'
                  name='description'
                  onChange={handleChange}
                  value={formState.description}
                  required
                />
                </Form.Field>
    
             
              <FormGroup>
                <label htmlFor="rating">Rating?</label>
                <Rating icon='heart' name='rating' defaultRating={1} maxRating={5} />
              </FormGroup>

            </Segment>
            </Form>
            <Modal.Actions>
                <Button color='yellow'>
                    <Icon name='checkmark' /> Create entry
                </Button>
                <Link to='/dashboard' className='btn' color='teal' >
                    Cancel
                </Link>
            </Modal.Actions>
            </Grid.Column>
        </Grid>
        </>
    );
};

export default AddNewEntryForm;