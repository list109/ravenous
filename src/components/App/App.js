import React from 'react'
import './App.css'
import { BusinessList } from '../BusinessList/BusinessList'
import { SearchBar } from '../SearchBar/SearchBar'
import { Yelp } from '../../util/Yealp'
import { Loading } from '../Loading/Loading'

export class App extends React.Component {
  state = {
    businesses: [],
    errorMessage: 'Start with a location value. The rest is optional.',
    isRequestRun: false,

    sortBy: 'best_match',
    radius: '',
    onlyOpened: false,

    term: '',
    termOptions: [],
    isTermOptionsOpen: false,
    termFocusedOptionIndex: 0,

    location: '',
    isLocationInvalid: false,
    locationOptions: [],
    isLocationOptionsOpen: false,
    locationFocusedOptionIndex: 0
  }

  locationRef = React.createRef()
  locationSearchTimeOutId = null

  handleSortByChange = sortOption => {
    const isValid = this.checkFormValidity()
    this.setState({ sortBy: sortOption }, isValid ? this.handleSubmit : undefined)
  }

  handleTermChange = value => {
    this.setState({
      term: value
    })
  }

  handleRadiusChange = value => {
    if (value > 40000) return

    this.setState({
      radius: value
    })
  }

  handleStatusChange = value => {
    this.setState({
      onlyOpened: value
    })
  }

  handleLocationChange = value => {
    this.setState({
      location: value,
      isLocationInvalid: false
    })

    clearTimeout(this.locationSearchTimeOutId)

    if (value === '') {
      this.setState({
        locationOptions: [],
        locationFocusedOptionIndex: 0
      })
      return
    }

    this.locationSearchTimeOutId = setTimeout(
      () => this.searchLocationOptions({ location: value, limit: 5 }),
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

        if (this.state.location === location && this.state.isRequestRun === false) {
          this.setState({
            locationOptions: [this.state.location, ...options],
            isLocationOptionsOpen: document.activeElement === this.locationRef.current
          })
        }
      })
      .catch(error => {
        this.setState({
          locationOptions: []
        })
      })
  }

  handleLocationFocus = () => {
    this.setState({
      isLocationOptionsOpen: true
    })
  }

  handleLocationUnfocus = () => {
    this.setState({
      isLocationOptionsOpen: false
    })
  }

  handleLocationOptionClick = option => {
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
      case 'Escape':
        this.setState({
          isLocationOptionsOpen: false
        })
        break
      default:
        return ''
    }
  }

  handleLocationOptionOver = index => {
    this.setState({
      locationFocusedOptionIndex: index
    })
  }

  checkFormValidity() {
    return this.locationRef.current.checkValidity()
  }
  // 1. client-side validation
  handleInvalid = e => {
    e.preventDefault()

    this.setState({
      isLocationInvalid: true,
      errorMessage: 'Please, fill the location field in'
    })
  }
  // 2. submiting if no constrains validation have been found unless the invalid value is already was checked and set before
  handleSubmit = e => {
    e?.preventDefault()
    if (this.state.isLocationInvalid) return

    this.setState({ locationOptions: [] })

    const { sortBy, term, location, radius, onlyOpened } = this.state
    this.searchYelp({ sortBy, term, location, radius, onlyOpened })
  }
  // 3. post-server-side validation is aplyed on a response
  searchYelp = ({ term, location, sortBy, radius, onlyOpened }) => {
    if (this.state.isRequestRun) return
    this.setState({
      isRequestRun: true,
      businesses: []
    })

    Yelp.searchBusinesses({ term, location, sortBy, radius, onlyOpened })
      .then(businesses => {
        this.setState({ businesses, errorMessage: '' })
      })
      // server-side validation
      .catch(({ status, message }) => {
        this.setState({
          errorMessage: this.getErrorMessage({ status, message }),
          isLocationInvalid: status === 'LOCATION_NOT_FOUND'
        })
      })
      .finally(() => this.setState({ isRequestRun: false }))
  }

  getErrorMessage({ status, message = 'Something went wrong, please try again' }) {
    switch (status) {
      case 'LOCATION_NOT_FOUND':
        return 'Please, try to change the location'
      default:
        return message
    }
  }

  render() {
    const {
      businesses,
      errorMessage,
      isRequestRun,
      sortBy,
      term,
      termOptions,
      isTermOptionsOpen,
      termFocusedOptionIndex,
      radius,
      onlyOpend,
      location,
      locationOptions,
      isLocationOptionsOpen,
      locationFocusedOptionIndex
    } = this.state

    const output = errorMessage ? (
      <p className="error-message">{errorMessage}</p>
    ) : (
      <BusinessList businesses={businesses} />
    )

    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar
          sortBy={sortBy}
          onSortByChange={this.handleSortByChange}
          term={term}
          termOptions={termOptions}
          isTermOptionsOpen={isTermOptionsOpen}
          termFocusedOptionIndex={termFocusedOptionIndex}
          onTermChange={this.handleTermChange}
          radius={radius}
          onRadiusChange={this.handleRadiusChange}
          onlyOpend={onlyOpend}
          onStatusChange={this.handleStatusChange}
          location={location}
          locationRef={this.locationRef}
          locationOptions={locationOptions}
          isLocationOptionsOpen={isLocationOptionsOpen}
          locationFocusedOptionIndex={locationFocusedOptionIndex}
          onLocationChange={this.handleLocationChange}
          onLocationFocus={this.handleLocationFocus}
          onLocationUnfocus={this.handleLocationUnfocus}
          onLocationOptionClick={this.handleLocationOptionClick}
          onLocationOptionOver={this.handleLocationOptionOver}
          onLocationKey={this.handleLocationKey}
          isLocationInvalid={this.state.isLocationInvalid}
          onInvalid={this.handleInvalid}
          onSubmit={this.handleSubmit}
        />
        {isRequestRun ? Loading : output}
      </div>
    )
  }
}
