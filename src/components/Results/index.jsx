import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import ReactStars from 'react-stars'

const Results = props => (
  <Card fluid>
    <Card.Content>
      <Card.Header>
        <Image floated='left' size='small' src={props.image_url} />
        { props.name }
      </Card.Header>
      <Card.Meta>
        <span style={{fontSize: 'medium', color: '#ffd700'}}>{props.stars_count}</span>
          <div style={{display: 'inline-block', paddingRight: 8}}>
            <ReactStars
              edit={false}
              count={5}
              size={16}
              color2={'#ffd700'}
              value={props.stars_count} />
          </div>
          { `(${props.reviews_count} reviews)` }
        <p>{ `${props.food_type} | ${props.area} | ${props.price_range}`}</p>
      </Card.Meta>
    </Card.Content>
  </Card>
)

export default Results
