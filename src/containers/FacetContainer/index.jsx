import React, { Component } from 'react'
import { Menu, Label } from 'semantic-ui-react'

export default class FacetContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      starsData: [],
      foodTypeData: [],
      active: ''
    }
  }

  componentWillReceiveProps(nextProps){
    const { foodType } = nextProps
    this.setState({foodTypeData: foodType})
  }

  setActive = (active) => {
    this.props.handleFacet('food_type', active)
  }
  render(){
    const { active, foodTypeData } = this.state
    return(
      <Menu text vertical>
        <Menu.Item header>Cuisine/Food Type</Menu.Item>
          {
            foodTypeData.map((f, i) => (
              <Menu.Item key={i} name={f.name} active={this.state.active === f.name} onClick={() => this.setActive(f.name)}>
                <Label>{f.count}</Label>
                { f.name }
              </Menu.Item>
            ))
          }
      </Menu>
    )
  }
}
