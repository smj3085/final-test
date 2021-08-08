import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS } from '../../utils/queries';

import {Header, Form, Grid, Button, Segment, TextArea, Container, Rating } from 'semantic-ui-react';



import Auth from '../../utils/auth';

const EntryForm = () => {
  const [entryText, setEntryText] = useState('');
  const [thoughtPlace, setThoughtPlace] = useState('');
  const [visitDate, setVisitDate] = useState('');

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      try {
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [addThought, ...thoughts] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addThought({
        variables: {
          entryText,
          thoughtPlace,
          visitDate,
          thoughtAuthor: Auth.getProfile().data.username,
        },
      });

      setEntryText('');
      setThoughtPlace('');
      setVisitDate('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtPlace' && value.length <= 280) {
      setThoughtPlace(value);
    }

    if (name === 'entryText' && value.length <= 1000) {
      setEntryText(value);
    }

    if (name === 'visitDate' && value.length <= 280) {
      setVisitDate(value);
    }

  };
  

  return (
  
    <Segment>
      <Container>
      {Auth.loggedIn() ? (
          <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column>
            <Header as='h2' color='black' textAlign='center'>
            Where did you go?
            </Header>
          <Form onSubmit={handleFormSubmit}>
            <Form.Field>
              <input
                name="thoughtPlace"
                placeholder="Place"
                value={thoughtPlace}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></input>
            </Form.Field>
            <Form.Field>
              <input
                name="visitDate"
                placeholder="Visit date"
                value={visitDate}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></input>
            </Form.Field>

            <Form.Field>
              <TextArea
                name="entryText"
                placeholder="Tell us more!"
                value={entryText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></TextArea>
            </Form.Field>
            <div>
              <Button color='yellow'  type="submit">
                Add entry
              </Button>
              <Button color='teal'>
                Upload photo
              </Button>
            </div>
              <br />
            
              <Rating icon='heart' defaultRating={1} maxRating={5}/>
            
            {error && (
              <div>
                {error.message}
              </div>
            )}
          </Form>
          </Grid.Column>
          </Grid>
      ) : (
        <p>
          You need to be logged in to share your thoughts.
        </p>
      )}
    </Container>
    </Segment>
  );
};

export default EntryForm;
