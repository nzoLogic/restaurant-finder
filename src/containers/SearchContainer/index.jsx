import React, { Component } from 'react'
import algoliasearch from 'algoliasearch'
import algoliasearchHelper from 'algoliasearch-helper'
import SearchComponent from '../../components/SearchComponent'
import Results from '../../components/Results'
import { List } from 'semantic-ui-react'

export default class SearchContainer extends Component {
  constructor(props){
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.updateResults = this.updateResults.bind(this)

    this.state = {
      results: [],
      query: ''
    }
  }

    componentWillMount(){
      const client = algoliasearch('O5LZ0PKJ3M', '4b13c1dbc657b715100da47889eb9e8f')
      const { location } = this.props
      let geo = `${location.lat}, ${location.lng}`

      this._helper = algoliasearchHelper(client, 'Restaurants', {
        aroundLatLng: geo
      })
      this._helper.on('result', this.updateResults)
      this._helper.search()
    }

    updateResults(results){
      console.log(results)
      this.setState( {results: results.hits} )
    }

    handleInputChange({ target }){
      console.log(target.value)
      this._helper.setQuery(target.value).search()
    }
  render(){
    const { results } = this.state

    return(
      <div>
        <SearchComponent action={this.handleInputChange} />
        <List>
          { results.map(r => (
            <List.Item key={r.objectID}>
              <Results { ...r } />
            </List.Item>
          )) }
        </List>
      </div>
    )
  }
}
