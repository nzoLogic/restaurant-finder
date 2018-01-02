import React, { Component } from 'react'
import SearchContainer from '../SearchContainer'
import LocationRequestModal from '../../components/LocationRequestModal'

export default class LocationContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      geo: '',
      locationPermission: false,
      needsModal: false
    }
  }

  componentWillMount(){
    let hasLocationPermission = localStorage.getItem('locationPermission')
    hasLocationPermission = JSON.parse(hasLocationPermission)
    if( hasLocationPermission  ){
      let location = localStorage.getItem('location')
      this.setState({locationPermission: true, geo: location}, this.getLocation)
    } else if( hasLocationPermission === null ) {
      this.waitToRequest()
    } else {
      this.checkNavigation()
    }
  }

  waitToRequest = () => {
    setTimeout(() => this.setState({needsModal: true}), 2000)
  }

  checkNavigation(){
    if( "geolocation" in navigator ){
      this.getLocation()
    } else {
      console.log('geolcoation not available')
    }
  }

  getLocation(){
    navigator.geolocation.getCurrentPosition(this.handleLocation)
  }

  handleLocation = ({ coords }) => {
    let { latitude, longitude } = coords
    let geo = `${latitude}, ${longitude}`

    localStorage.setItem('locationPermission', true)
    localStorage.setItem('location', geo)
    this.setState( {geo: geo} )
  }

  handlePermission = permission => {
    localStorage.setItem('locationPermission', permission)

    if( permission ) {
      this.checkNavigation()
    }
    this.setState({locationPermission: permission})
  }

  togglePermission = () => {
    const { locationPermission } = this.state
    const nextPermission = !locationPermission
    localStorage.setItem('locationPermission', nextPermission)
    this.setState({locationPermission: nextPermission})
  }

  render(){
    const { geo, locationPermission, needsModal } = this.state
    return(
      <div>
        {
          needsModal && <LocationRequestModal handlePermission={this.handlePermission} />
        }
        <SearchContainer
          location={geo}
          togglePermission={this.togglePermission}
          locationPermission={locationPermission} />
      </div>
    )
  }
}
