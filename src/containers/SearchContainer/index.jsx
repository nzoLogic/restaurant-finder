import React, { Component } from 'react'
import algoliasearch from 'algoliasearch'
import algoliasearchHelper from 'algoliasearch-helper'
import SearchComponent from '../../components/SearchComponent'
import Results from '../../components/Results'
import { Grid, List, Header } from 'semantic-ui-react'
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
      offset: 0,
      totalHits: 0,
      searchTime: 0
    }
  }

  componentDidMount(){
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

  componentWillReceiveProps(nextProps){
    const { location, locationPermission } = nextProps
    console.log('receiving props... ', nextProps)

    if( location  ){
      this._helper.setQueryParameter('aroundLatLng', location).search()
    }
  }

  updateResults(results){
    const foodType = results.getFacetValues('food_type')
    const starsCount = results.getFacetValues('stars_count')
    const paymentOptions = results.getFacetValues('payment_options').filter(v => v.name !== 'Carte Blanche' && v.name !== 'Diners Club')
    let pages = Math.floor(results.nbPages * 10)
    let searchTime = results.processingTimeMS * 0.001
    console.log(results)
    this.setState( {results: results.hits, totalHits: results.nbHits, query: results.query, searchTime, foodType, starsCount, paymentOptions, pages} )
  }

  handleInputChange({ target }){
    this._helper.setQuery(target.value).search()
  }

  refineFacet = (facet, value) => {
    this.scrollUp()
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
  scrollUp = () => {document.body.scrollTop = document.documentElement.scrollTop = 0}
  render(){
    const { results, foodType, starsCount, paymentOptions, page, pages, totalHits, searchTime, query } = this.state

    return(
      <Grid>
        <Grid.Row style={{height: 102}} columns={2}>
            <SearchComponent action={this.handleInputChange}
              permission={this.props.locationPermission}
              togglePermission={this.props.togglePermission}/>
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
              <Header as='h3' disabled>
                <Header.Content>
                  {
                    totalHits  ?
                      <p>{totalHits} results found <span>in {searchTime} seconds</span></p>
                        : query ?
                        <div>
                          <p>Your search {`"${query}"`}returned no results.</p>
                          <strong>Try searching for restaurants by</strong>
                          <ul>
                            <li>Name</li>
                            <li>City (e.g. "San Francisco")</li>
                            <li>Type (e.g. "seafood")</li>
                          </ul>
                        </div> : null
                  }

                </Header.Content>
              </Header>
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
              {
                results.length ?
                <Pagination
                  fluid
                  color="blue"
                  offset={this.state.offset}
                  limit={10}
                  total={pages}
                  onClick={(e, props, offset) => this.handleClick(offset, props.children)}
                  /> : null
              }

            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Grid>
    )
  }
}
