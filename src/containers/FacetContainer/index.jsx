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
      paymentOptionsData: [],
      active: false,
      starNumber: 1,
      showAll: false
    }
  }

  componentWillReceiveProps(nextProps){
    const { foodType, starsCount, paymentOptions } = nextProps
    this.setState({
      foodTypeData: foodType,
      starsData: starsCount,
      paymentOptionsData: paymentOptions
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
  toggleTypes = () => {
    this.setState({showAll: !this.state.showAll})
  }
  render(){
    const { active, foodTypeData, starsData, paymentOptionsData, showAll } = this.state
    const { handleFacet } = this.props
    let foodType = showAll ? foodTypeData : foodTypeData.slice(0, 11)
    return(
      <Menu text vertical>
        <Menu.Item header>Cuisine/Food Type</Menu.Item>
          {
            foodType.map((f, i) => (
              <FoodType key={i} addFacet={handleFacet} { ...f }/>
            ))
          }
          <Menu.Item active color="blue" onClick={this.toggleTypes}>{`${showAll ? "Show less" : "Show more"}`}...</Menu.Item>
          <Menu.Item header>Rating</Menu.Item>
          {
            this.renderStars()
          }
          <Menu.Item header>Payment Options</Menu.Item>
          {
            paymentOptionsData.map((p, i) => (
              <Menu.Item key={i} onClick={() => handleFacet('payment_options', p.name)}>
                { p.name }
              </Menu.Item>
            ))
          }
      </Menu>
    )
  }
}
