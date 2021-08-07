import React from 'react'
import {
	Grid,
	Header,
	Message,
  } from 'semantic-ui-react'

function LandingPage() {
return (
	<>
  <Grid  verticalAlign='middle'  columns={4} centered>
	 <Grid.Row className="jumbotron">
      <Grid.Column>
        <Message>
          <Header as='h1'>Travel the world or your own backyard!</Header>
          <p>
            Whether you're travelling a new country or adventuring in your own backyard, capture all your travel memories in one place. <br />
			      Wherever you are today... or tomorrow...
          </p>
          <strong style={{backgroundColor:'yellow'}}>Sign up today!</strong>
        </Message>
      </Grid.Column>
    </Grid.Row>
    </Grid>
	</>
);
}

export default LandingPage;