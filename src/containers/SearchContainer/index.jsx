import React, { Component } from 'react'
import algoliasearch from 'algoliasearch'
import algoliasearchHelper from 'algoliasearch-helper'

export default class SearchContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      results: [],
      query: ''
    }
  }

    componentWillMount(){
      const client = algoliasearch('O5LZ0PKJ3M', '4b13c1dbc657b715100da47889eb9e8f')
      this._helper = algoliasearchHelper(client, 'Restaurants')
      this._helper.on('results', this.updateResults)
    }

    updateResults(results){
      console.log(results)
    }
  render(){
    return(
      <div>
        Search
      </div>
    )
  }
}
