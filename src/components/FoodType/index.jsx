import React from 'react'
import { Menu } from 'semantic-ui-react'

const FoodType = props => (
  <Menu.Item name={props.name} active={props.active} onClick={() => this.props.setActive(props.name)}>
    <Label>{f.count}</Label>
    { f.name }
  </Menu.Item>
)

export default FoodType
