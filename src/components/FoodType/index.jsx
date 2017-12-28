import React from 'react'
import { Menu, Label } from 'semantic-ui-react'

const FoodType = props => (
  <Menu.Item name={props.name} active={props.active} onClick={() => props.addFacet('food_type', props.name)}>
    <Label>{props.count}</Label>
    { props.name }
  </Menu.Item>
)

export default FoodType
