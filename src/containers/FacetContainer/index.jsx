import React, { Component } from 'react'
import { Menu, Label } from 'semantic-ui-react'
import FoodType from '../../components/FoodType'
import ReactStars from 'react-stars'

export default class FacetContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      starsData: [],
      foodTypeData: [],
      active: '',
      starNumber: 1
    }
  }

  componentWillReceiveProps(nextProps){
    const { foodType, starsCount } = nextProps
    this.setState({
      foodTypeData: foodType.slice(0, 11),
      starsData: starsCount
    })
  }

  renderStars = () => {
    const { handleStarsRefinement } = this.props
    const stars = []

    for(let i = 1; i < 6; i++){
      stars.push(
        <Menu.Item key={i} onClick={() => handleStarsRefinement(i)}>
          <ReactStars
            count={5}
            edit={false}
            value={i}
            size={24}
            color2={'#ffd700'} />
        </Menu.Item>
      )
    }
    return stars
  }

  render(){
    const { active, foodTypeData, starsData } = this.state
    const { handleFacet } = this.props
    return(
      <Menu text vertical>
        <Menu.Item header>Cuisine/Food Type</Menu.Item>
          {
            foodTypeData.map((f, i) => (
              <FoodType key={i} addFacet={handleFacet} { ...f }/>
            ))
          }
          <Menu.Item header>Rating</Menu.Item>
          {
            this.renderStars()
          }
      </Menu>
    )
  }
}
