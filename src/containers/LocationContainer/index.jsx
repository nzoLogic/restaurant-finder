import React, { Component } from 'react'
import SearchContainer from '../SearchContainer'

export default class LocationContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      geo: ''
    }
    this.saveLocation = this.saveLocation.bind(this)
  }

  componentWillMount(){
    let location = localStorage.getItem('location')
    if( location ){
      this.setState( {geo: location} )
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
    let geo = `${latitude}, ${longitude}`

    console.log('Location geo', geo)
    localStorage.setItem('location', geo)
    this.setState( {geo: geo} )
  }
  render(){
    const { geo } = this.state
    return(
      <div>
        {
          geo && <SearchContainer location={geo} />
        }
      </div>
    )
  }
}
