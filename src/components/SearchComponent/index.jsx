import React from 'react'
import { Button, Container, Menu, Input, Label, Icon } from 'semantic-ui-react'

const SearchComponent = props => {

  return (
    <Menu widths={1} color="blue" inverted borderless>
      <Container>
        <Menu.Item>
          <Input
            fluid
            onChange={props.action}
            placeholder="Search for Restaurants by Name, Cuisine, Location"
            type="text"
            size="large"
            action={<Button
              icon="location arrow"
              onClick={props.togglePermission}
              basic={props.permission}
              inverted={props.permission}
              />}
            />
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default SearchComponent
