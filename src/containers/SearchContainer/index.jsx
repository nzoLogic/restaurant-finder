import React, { Component } from 'react'
import algoliasearch from 'algoliasearch'
import algoliasearchHelper from 'algoliasearch-helper'
import SearchComponent from '../../components/SearchComponent'
import Results from '../../components/Results'
import { Grid, List, Menu, Icon, Container } from 'semantic-ui-react'
import FacetContainer from '../FacetContainer'
import Pagination from 'semantic-ui-react-button-pagination'

export default class SearchContainer extends Component {
  constructor(props){
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.updateResults = this.updateResults.bind(this)

    this.state = {
      results: [],
      foodType: [],
      starsCount: [],
      paymentOptions: [],
      query: '',
      pages: 0,
      page: 0,
      offset: 0
    }
  }

  componentWillMount(){
    const client = algoliasearch('O5LZ0PKJ3M', '4b13c1dbc657b715100da47889eb9e8f')
    const { location } = this.props
    this._helper = algoliasearchHelper(client, 'Restaurants', {
      aroundLatLng: location,
      facets: ['food_type', 'stars_count', 'payment_options']
    })
    this._helper.on('result', this.updateResults)
    this._helper.clearRefinements((value, attr, type) => {})
    this._helper.on('change', () => {
      console.log('CHANGE')
    })
    this._helper.search()
  }

  updateResults(results){
    const foodType = results.getFacetValues('food_type')
    const starsCount = results.getFacetValues('stars_count')
    const paymentOptions = results.getFacetValues('payment_options')
    let pages = Math.floor(results.nbPages * 10)
    console.log(results)
    this.setState( {results: results.hits, foodType, starsCount, paymentOptions, pages} )
  }

  handleInputChange({ target }){
    console.log(target.value)
    this._helper.setQuery(target.value).search()
  }

  refineFacet = (facet, value) => {
    this.setState({offset: 0})
    this._helper.toggleRefinement(facet, value).search()
  }
  refineStars = (value) => {
    this.setState({offset: 0})
    this._helper.removeNumericRefinement('stars_count', '>=')
    this._helper.addNumericRefinement('stars_count', '>=', value).search()
  }
  handleClick(offset, page) {
    let n = parseInt(page)
    if(!isNaN(n)){
      this._helper.setPage(n-1).search()
    }
  this.setState({offset});
  }
  render(){
    const { results, foodType, starsCount, paymentOptions, page, pages } = this.state

    return(
      <Grid>
        <Grid.Row style={{height: 102}}>
            <SearchComponent action={this.handleInputChange} />
        </Grid.Row>
        <Grid container>
          <Grid.Row divided>
            <Grid.Column width={4}>
              <FacetContainer
                foodType={foodType}
                starsCount={starsCount}
                paymentOptions={paymentOptions}
                handleFacet={this.refineFacet}
                handleStarsRefinement={this.refineStars}
                />
            </Grid.Column>
            <Grid.Column width={10}>
              <List>
                { results.map(r => (
                  <List.Item key={r.objectID}>
                    <Results { ...r } />
                  </List.Item>
                )) }
              </List>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column columns={12}>
              <Pagination
                fluid
                color="blue"
                offset={this.state.offset}
                limit={10}
                total={pages}
                onClick={(e, props, offset) => this.handleClick(offset, props.children)}
                />

            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Grid>
    )
  }
}
