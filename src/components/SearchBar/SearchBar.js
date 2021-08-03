import React from 'react'
import './SearchBar.css'
import { Autocomplete } from '../Autocomplete/Autocomplete'
import { Yelp } from '../../util/Yealp'

export class SearchBar extends React.Component {
  state = {
    sortBy: 'best_match',
    term: '',
    location: '',
    radius: '',
    onlyOpened: false,
    locationOptions: [],
    locationOptionsIsOpen: false,
    locationFocusedOptionIndex: 0
  }

  locationUnfocusTimeOutId = null
  locationSearchTimeOutId = null
  locationRef = React.createRef()

  isWaitingMainSearch = false

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

    this.isWaitingMainSearch = false
    clearTimeout(this.locationSearchTimeOutId)

    if (target.value === '') {
      this.setState({
        locationOptions: [],
        locationFocusedOptionIndex: 0
      })
      return
    }

    this.locationSearchTimeOutId = setTimeout(
      () => this.searchLocationOptions({ location: target.value, limit: 5 }),
      700
    )
  }

  searchLocationOptions = ({ location, limit }) => {
    Yelp.searchBusinesses({ location, limit })
      .then(businesses => {
        const options = businesses.map(({ address, city, state, country }) => {
          return `${address}${city && `, ${city}`}${state && `, ${state}`} ${
            country && `, ${country}`
          }`
        })

        if (this.state.location === location && this.isWaitingMainSearch === false) {
          this.setState({ locationOptions: [this.state.location, ...options] })
        }
      })
      .catch(error => {
        this.setState({
          locationOptions: []
        })
      })
  }

  handleLocationClickOption = option => {
    this.setLocationOption(option)
  }

  setLocationOption = option => {
    this.setState({
      location: option,
      locationOptions: [],
      locationFocusedOptionIndex: 0
    })
    this.locationRef.current.focus()
  }

  handleLocationUnfocuse = () => {
    this.locationUnfocusTimeOutId = setTimeout(() => {
      this.setState({
        locationOptionsIsOpen: false
      })
    })
  }

  handleLocationFocuse = () => {
    clearTimeout(this.locationUnfocusTimeOutId)

    this.setState({
      locationOptionsIsOpen: true
    })
  }

  handleLocationKey = e => {
    const { locationOptions, locationFocusedOptionIndex: index } = this.state
    const getNextIndex = index => (index + 1 === locationOptions.length ? 0 : index + 1)
    const getPrevIndex = index => (index - 1 < 0 ? locationOptions.length - 1 : index - 1)

    switch (e.code) {
      case 'Enter':
        if (locationOptions.length === 0) return
        this.setLocationOption(locationOptions[index])
        e.preventDefault()
        break
      case 'ArrowUp':
        this.setState({
          locationFocusedOptionIndex: getPrevIndex(index)
        })
        e.preventDefault()
        break
      case 'ArrowDown':
        this.setState({
          locationFocusedOptionIndex: getNextIndex(index)
        })
        e.preventDefault()
        break
      case 'Tab':
        if (locationOptions.length === 0) return
        this.setState({
          locationFocusedOptionIndex: e.shiftKey ? getPrevIndex(index) : getNextIndex(index)
        })
        e.preventDefault()
        break
      default:
        return ''
    }
  }

  handleLocationOverOption = index => {
    this.setState({
      locationFocusedOptionIndex: index
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
    this.setState({ locationOptions: [] })
    this.isWaitingMainSearch = true

    const { sortBy, term, location, radius, onlyOpened } = this.state
    this.props.searchYelp({ sortBy, term, location, radius, onlyOpened })
  }

  handleInvalid = e => {
    e.preventDefault()

    this.props.onInvalid()
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
      <form className="SearchBar" onSubmit={this.handleSearch} onInvalid={this.handleInvalid}>
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
          <Autocomplete
            options={this.state.locationOptions}
            onBlur={this.handleLocationUnfocuse}
            onFocus={this.handleLocationFocuse}
            onOptionFocus={this.handleLocationOptionFocus}
            onOptionClick={this.handleLocationClickOption}
            onOptionPointerOver={this.handleLocationOverOption}
            isOpen={this.state.locationOptionsIsOpen}
            focusedOptionIndex={this.state.locationFocusedOptionIndex}
          >
            <p className="SearchBar-location">
              <input
                type="text"
                value={this.state.location}
                onChange={this.handleLocationChange}
                onKeyDown={this.handleLocationKey}
                placeholder="Where?"
                ref={this.locationRef}
                required={true}
              />
            </p>
          </Autocomplete>
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
