import React, { Component } from 'react'
import { Menu, Label } from 'semantic-ui-react'

export default class FacetContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      facets: [],
      moreFacets: [],
      active: ''
    }
  }

  componentWillReceiveProps(nextProps){
    const { facets } = nextProps
    let topFacets = facets.slice(0, 10)
    console.log(facets, topFacets)
    this.setState({facets: topFacets})
  }

  setActive = (active) => {
    this.setState({active: active}, this.props.handleFacet('food_type', active))
  }
  render(){
    const { facets, active } = this.state

    return(
      <Menu text vertical>
        <Menu.Item header>Cuisine/Food Type</Menu.Item>
          {
            facets.map((f, i) => (
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
