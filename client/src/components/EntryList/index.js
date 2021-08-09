import React from 'react';
import { Link } from 'react-router-dom';

import {Header, Card, Image, Segment, Button } from 'semantic-ui-react';

import image from '../../images/cityline.jpg';
const EntryList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No entries yet</h3>;
  }

  return (
    <Segment>

      <h1>{title}</h1>
      <Card.Group itemsPerRow={5}>
      {thoughts &&
        thoughts.map((thought) => (
          <Card key={thought._id} className="entry-cards">
            <Image src={image} size='large' center/>
            <Card.Content>
              <Card.Header>{thought.entryPlace}</Card.Header>
              <Card.Meta>
                <span className='vistDate'>Visited on {thought.visitDate}</span>
              </Card.Meta>
              <Card.Description>
                {thought.entryText}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button as={Link} to=
              {`/thoughts/${thought._id}`}
              color='yellow'
            >
              See more details!
            </Button>
            </Card.Content>
          </Card>

        ))}
      </Card.Group>


    </Segment>
  );
};

export default EntryList;
