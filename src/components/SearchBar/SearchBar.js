import React from 'react'
import './SearchBar.css'

export class SearchBar extends React.Component {
  state = {
    sortBy: 'best_match',
    term: '',
    location: ''
  }

  sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
  }

  handleSortByChange = sortOption => {
    this.setState({ sortBy: sortOption })

    const { term, location } = this.state
    this.props.searchYelp({ sortBy: sortOption, term, location })
  }

  handleTermChange = ({ target }) => {
    this.setState({
      term: target.value
    })
  }

  handleLocationChange = ({ target }) => {
    this.setState({
      location: target.value
    })
  }

  getSortByClass(sortOption) {
    return sortOption === this.state.sortBy ? 'active' : ''
  }

  handleSearch = e => {
    e.preventDefault()
    const { sortBy, term, location } = this.state
    this.props.searchYelp({ sortBy, term, location })
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      const sortByOptionValue = this.sortByOptions[sortByOption]
      return (
        <li
          key={sortByOptionValue}
          className={this.getSortByClass(sortByOptionValue)}
          onClick={() => this.handleSortByChange(sortByOptionValue)}
        >
          {sortByOption}
        </li>
      )
    })
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>{this.renderSortByOptions()}</ul>
        </div>
        <div className="SearchBar-fields">
          <input
            type="text"
            value={this.state.term}
            onChange={this.handleTermChange}
            placeholder="Search Businesses"
          />
          <input
            type="text"
            value={this.state.location}
            onChange={this.handleLocationChange}
            placeholder="Where?"
          />
        </div>
        <div className="SearchBar-submit">
          <button type="submit" onClick={this.handleSearch}>
            Let's Go
          </button>
        </div>
      </div>
    )
  }
}
