import React from 'react'
import './SearchBar.css'
import { Autocomplete } from '../Autocomplete/Autocomplete'

export class SearchBar extends React.Component {
  state = {
    sortBy: 'best_match',
    term: '',
    location: '',
    radius: '',
    onlyOpened: false,
    locationOptions: ['value1', 'value2', 'value3']
  }

  sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count',
    Nearest: 'distance'
  }

  handleSortByChange = sortOption => {
    this.setState({ sortBy: sortOption })

    const { term, location, radius, onlyOpened } = this.state
    this.props.searchYelp({ sortBy: sortOption, term, location, radius, onlyOpened })
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

  handleRadiusChange = ({ target }) => {
    if (target.value > 40000) return

    this.setState({
      radius: target.value
    })
  }

  handleStatusChange = ({ target }) => {
    this.setState({
      onlyOpened: target.checked
    })
  }

  getSortByClass(sortOption) {
    return sortOption === this.state.sortBy ? 'active' : ''
  }

  handleSearch = e => {
    e.preventDefault()
    const { sortBy, term, location, radius, onlyOpened } = this.state
    this.props.searchYelp({ sortBy, term, location, radius, onlyOpened })
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
      <form className="SearchBar" onSubmit={this.handleSearch}>
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
        <fieldset className="SearchBar-distance-options">
          <legend>Optional</legend>
          <p>
            <label>
              <input
                type="number"
                min="0"
                max="40000"
                value={this.state.radius}
                onChange={this.handleRadiusChange}
              />
              Specify a radius of the search area (max 40000 m)
            </label>
            <label>
              <input type="checkbox" onChange={this.handleStatusChange} />
              Consider only the businesses open now
            </label>
          </p>
        </fieldset>
        <div className="SearchBar-submit">
          <button type="submit">Let's Go</button>
        </div>
      </form>
    )
  }
}
