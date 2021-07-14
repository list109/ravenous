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
    locationOptionsIsOpen: false
  }

  locationUnfocusTimeOutId = null
  locationSearchTimeOutId = null
  locationRef = React.createRef()
  locationAutocompleteRef = React.createRef()

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

    clearTimeout(this.locationSearchTimeOutId)

    if (target.value === '') {
      this.setState({
        locationOptions: []
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

        if (this.state.location === location) {
          this.setState({ locationOptions: options })
        }
      })
      .catch(error => {
        this.setState({
          locationOptions: []
        })
      })
  }

  handleLocationClickOption = option => {
    this.setState({ location: option, locationOptions: [] })
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

  handleLocationKeyOption = ({ option, code, elem, event: e }) => {
    const { previousElementSibling: prevElem, nextElementSibling: nextElem } = elem

    switch (code) {
      case 'Enter':
        this.setState({ location: option, locationOptions: [] })
        setTimeout(() => this.locationRef.current.focus())
        break
      case 'ArrowUp':
        prevElem ? prevElem.focus() : this.locationRef.current.focus()
        e.preventDefault()
        break
      case 'ArrowDown':
        nextElem ? nextElem.focus() : this.locationRef.current.focus()
        e.preventDefault()
        break
      default:
        return ''
    }
  }

  handleLocationOverOption = optionElem => {
    optionElem.focus()
  }

  handleLocationKey = e => {
    const { current: options } = this.locationAutocompleteRef
    switch (e.code) {
      case 'ArrowDown':
        options?.firstElementChild && options.firstElementChild.focus()
        e.preventDefault()
        break
      case 'ArrowUp':
        options?.lastElementChild && options.lastElementChild.focus()
        e.preventDefault()
        break
      default:
        return ''
    }
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
          <Autocomplete
            options={this.state.locationOptions}
            onClick={this.handleLocationClickOption}
            onKeyDown={this.handleLocationKeyOption}
            onBlur={this.handleLocationUnfocuse}
            onFocus={this.handleLocationFocuse}
            onPointerOver={this.handleLocationOverOption}
            isOpen={this.state.locationOptionsIsOpen}
            ref={this.locationAutocompleteRef}
          >
            <input
              type="text"
              value={this.state.location}
              onChange={this.handleLocationChange}
              onKeyDown={this.handleLocationKey}
              placeholder="Where?"
              ref={this.locationRef}
            />
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
