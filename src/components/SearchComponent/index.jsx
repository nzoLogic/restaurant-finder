import React from 'react'
import { Container, Input } from 'semantic-ui-react'

const SearchComponent = props => (
  <Container>
    <Input fluid onChange={props.action} type="text" size="large"/>
  </Container>
)

export default SearchComponent
