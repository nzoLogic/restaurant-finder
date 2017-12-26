import React, { Component } from 'react'
import { Menu, Label } from 'semantic-ui-react'

export default class FacetContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      facets: [],
      moreFacets: []
    }
  }

  componentWillReceiveProps(nextProps){
    const { facets } = nextProps
    let topFacets = facets.slice(0, 10)
    console.log(facets, topFacets)
    this.setState({facets: topFacets})
  }
  render(){
    const { facets } = this.state

    return(
      <Menu text vertical>
        <Menu.Item header>Cuisine/Food Type</Menu.Item>
          {
            facets.map((f, i) => (
              <Menu.Item key={i} name={f.name}>
                <Label>{f.count}</Label>
                { f.name }
              </Menu.Item>
            ))
          }
      </Menu>
    )
  }
}
