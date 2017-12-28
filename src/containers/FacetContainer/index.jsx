import React, { Component } from 'react'
import { Menu, Label } from 'semantic-ui-react'
import FoodType from '../../components/FoodType'

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
    const { foodType, starsCount } = nextProps
    this.setState({
      foodTypeData: foodType.slice(0, 11),
      starsData: starsCount
    })
  }

  addFacet = (facet, value) => {
    this.props.handleFacet(facet, value)
  }
  render(){
    const { active, foodTypeData, starsData } = this.state
    const { handleFacet } = this.props
    return(
      <Menu text vertical>
        <Menu.Item header>Cuisine/Food Type</Menu.Item>
          {
            foodTypeData.map((f, i) => (
              <FoodType key={f.id} addFacet={handleFacet} { ...f }/>
            ))
          }
          <Menu.Item header>Rating</Menu.Item>
          {
            starsData.map(s => (
              <Menu.Item key={s.id} onClick={() => handleFacet('stars_count', s.name)}>
                {s.name}
              </Menu.Item>
            ))
          }
      </Menu>
    )
  }
}
