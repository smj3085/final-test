import React from 'react';
import { Link } from 'react-router-dom';

import {Header, Card, Grid, Image, Segment, Button } from 'semantic-ui-react';

const image = '../../images/blue.jpg';
const EntryList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <Segment>

      <Header as='h1'>{title}</Header>
      <Grid column={3}>
        <Grid.Column>
      {thoughts &&
        thoughts.map((thought) => (
          <Card key={thought._id} className="entry-cards">
            <Image src={image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{thought.thoughtPlace}</Card.Header>
              <Card.Meta>
                <span className='vistDate'>Visited on {thought.visitDate}</span>
              </Card.Meta>
              <Card.Description>
                {thought.thoughtText}
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

</Grid.Column>
      </Grid>


    </Segment>
  );
};

export default EntryList;
