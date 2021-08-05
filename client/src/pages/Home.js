import React from 'react'
import {
	Button,
	Grid,
	Header,
	Message,
  } from 'semantic-ui-react'

export default function LandingPage() {
return (
	<>
	 <Grid.Row className="jumbotron">
      <Grid.Column>
        <Message>
          <Header as='h1'>Travel the world or your own backyard!</Header>
          <p>
            Whether you're travelling a new country or adventuring in your own backyard, capture all your travel memories in one place. <br />
			Wherever you are today... or tomorrow...
          </p>
          <Button color='yellow'>Sign up today!</Button>
        </Message>
      </Grid.Column>
    </Grid.Row>
	</>
);
}
