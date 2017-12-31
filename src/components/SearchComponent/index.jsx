import React from 'react'
import { Container, Menu, Input } from 'semantic-ui-react'

const SearchComponent = props => (
  <Menu widths={1} color="blue" inverted borderless>
    <Container>
      <Menu.Item>
      <Input fluid onChange={props.action} type="text" size="large"/>
      </Menu.Item>
    </Container>
  </Menu>
)

export default SearchComponent
