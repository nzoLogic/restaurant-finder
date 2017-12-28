import React, { Component } from 'react'
import algoliasearch from 'algoliasearch'
import algoliasearchHelper from 'algoliasearch-helper'
import SearchComponent from '../../components/SearchComponent'
import Results from '../../components/Results'
import { Grid, List } from 'semantic-ui-react'
import FacetContainer from '../FacetContainer'

export default class SearchContainer extends Component {
  constructor(props){
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.updateResults = this.updateResults.bind(this)

    this.state = {
      results: [],
      foodType: [],
      starsCount: [],
      query: ''
    }
  }

  componentWillMount(){
    const client = algoliasearch('O5LZ0PKJ3M', '4b13c1dbc657b715100da47889eb9e8f')
    const { location } = this.props
    this._helper = algoliasearchHelper(client, 'Restaurants', {
      aroundLatLng: location,
      facets: ['food_type', 'stars_count']
    })
    this._helper.on('result', this.updateResults)
    console.log('HELPER ---> ', this._helper)
    this._helper.search()
  }

  updateResults(results){
    console.log(results)
    const foodType = results.getFacetValues('food_type')
    const starsCount = results.getFacetValues('stars_count')
    console.log(foodType, starsCount)
    this.setState( {results: results.hits, foodType, starsCount} )
  }

  handleInputChange({ target }){
    console.log(target.value)
    this._helper.setQuery(target.value).search()
  }

  refineFacet = (name, value) => {
    this._helper.toggleRefinement(name, value).search()
  }
  render(){
    const { results, foodType, starsCount } = this.state

    return(
      <Grid container>
        <Grid.Row columns={12}>
          <SearchComponent action={this.handleInputChange} />
        </Grid.Row>
        <Grid.Row columns={12} divided>
          <Grid.Column width={4}>
            <FacetContainer foodType={foodType} starsCount={starsCount} handleFacet={this.refineFacet} />
          </Grid.Column>
          <Grid.Column width={8}>
            <List>
              { results.map(r => (
                <List.Item key={r.objectID}>
                  <Results { ...r } />
                </List.Item>
              )) }
            </List>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
