import React from 'react'
import { Menu, Label, Icon } from 'semantic-ui-react'

const FoodType = props => (
  <Menu.Item name={props.name} active={props.active} onClick={() => props.addFacet(props.name)}>
    <Label color="blue">{props.count} {props.active && <Icon name="delete" />}</Label>
    { props.name }
  </Menu.Item>
)

export default FoodType
