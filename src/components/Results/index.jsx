import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const Results = props => (
  <Card fluid>
    <Card.Content>
      <Card.Header>
        <Image floated='left' size='small' src={props.image_url} />
        { props.name }
      </Card.Header>
      <Card.Meta>
        <p>{ `${props.stars_count} stars (${props.reviews_count} reviews)` }</p>
        <p>{ `${props.food_type} | ${props.area} | ${props.price_range}`}</p>
      </Card.Meta>
    </Card.Content>
  </Card>
)

export default Results
