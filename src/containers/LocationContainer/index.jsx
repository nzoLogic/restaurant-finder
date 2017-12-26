import React, { Component } from 'react'
import SearchContainer from '../SearchContainer'

export default class LocationContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      position: []
    }
    this.saveLocation = this.saveLocation.bind(this)
  }

  componentWillMount(){
    let location = localStorage.getItem('location')
    if( location ){
      this.setState( {position: JSON.parse(location)} )
    } else {
      this.checkNavigation()
    }
  }

  checkNavigation(){
    if("geolocation" in navigator){
      this.getLocation()
    } else {
      console.log('geolcoation not available')
    }
  }

  getLocation(){
    navigator.geolocation.getCurrentPosition(this.saveLocation)
  }

  saveLocation({ coords }){
    let { latitude, longitude } = coords
    let position = JSON.stringify([latitude, longitude])

    localStorage.setItem('location', position)
    this.setState( {position: JSON.parse(position)} )
  }
  render(){
    const { position } = this.state
    return(
      <div>
        <SearchContainer location={position} />
      </div>
    )
  }
}
