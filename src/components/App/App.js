import React from 'react'
import './App.css'
import { BusinessList } from '../BusinessList/BusinessList'
import { SearchBar } from '../SearchBar/SearchBar'
import { Yelp } from '../../util/Yealp'
import { Loading } from '../Loading/Loading'

export class App extends React.Component {
  state = {
    businesses: [],
    //  errorMessage is eveluated every time once a try to make a main request is initiated. if the response of a main request is successful, then resetting to an empty value occurs
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
  locationTimeOutId = null
  locationSearchTimeOutId = null

  termRef = React.createRef()
  termTimeOutId = null
  termSearchTimeOutId = null

  optionsLimit = 5

  handleFocus = name => {
    clearTimeout(this[`${name}TimeOutId`])

    this.setState({
      [`is${this.getCapitalizedName(name)}OptionsOpen`]: true
    })
  }

  handleUnfocus = name => {
    this[`${name}TimeOutId`] = setTimeout(() => {
      this.setState({
        [`is${this.getCapitalizedName(name)}OptionsOpen`]: false
      })
    })
  }

  getCapitalizedName = name => name[0].toUpperCase() + name.slice(1)

  handleKeyDown = e => {
    const { name } = e.target
    const options = this.state[`${name}Options`]
    const index = this.state[`${name}FocusedOptionIndex`]

    const getNextIndex = index => (index + 1 === options.length ? 0 : index + 1)
    const getPrevIndex = index => (index - 1 < 0 ? options.length - 1 : index - 1)

    switch (e.code) {
      case 'Enter':
        if (options.length === 0) return
        this.setOption(name, options[index])
        e.preventDefault()
        break
      case 'ArrowUp':
        this.setState({
          [`${name}FocusedOptionIndex`]: getPrevIndex(index)
        })
        e.preventDefault()
        break
      case 'ArrowDown':
        this.setState({
          [`${name}FocusedOptionIndex`]: getNextIndex(index)
        })
        e.preventDefault()
        break
      case 'Tab':
        if (options.length === 0) return
        this.setState({
          [`${name}FocusedOptionIndex`]: e.shiftKey ? getPrevIndex(index) : getNextIndex(index)
        })
        e.preventDefault()
        break
      case 'Escape':
        this.setState({
          [`is${this.getCapitalizedName(name)}OptionsOpen`]: false
        })
        break
      default:
        return ''
    }
  }

  handleOptionClick = (name, option) => {
    this.setOption(name, option)
  }

  handleOptionOver = (name, index) => {
    this.setState({
      [`${name}FocusedOptionIndex`]: index
    })
  }

  setOption = (name, option) => {
    this.setState({
      [name]: option,
      [`${name}Options`]: [],
      [`${name}FocusedOptionIndex`]: 0
    })
    this[`${name}Ref`].current.focus()
  }

  handleSortByChange = sortOption => {
    const isValid = this.checkFormValidity()
    this.setState({ sortBy: sortOption }, isValid ? this.handleSubmit : undefined)
  }

  handleTermChange = value => {
    this.setState({
      term: value,
      termOptions: [value, ...this.state.termOptions.slice(1)]
    })

    clearTimeout(this.termSearchTimeOutId)

    if (value === '') {
      this.setState({
        termOptions: [],
        termFocusedOptionIndex: 0
      })
      return
    }

    this.termSearchTimeOutId = setTimeout(
      () => this.searchTermOptions({ text: value, limit: this.optionsLimit }),
      700
    )
  }

  searchTermOptions = ({ text, limit }) => {
    Yelp.searchAutocomplete({ text, limit })
      .then(data => {
        const terms = data?.terms.map(({ text }) => text)

        // if (this.state.term === text && this.state.isRequestRun === false) {
        if (this.state.term === text) {
          this.setState({
            termOptions: [this.state.term, ...terms]
            // isTermOptionsOpen: document.activeElement === this.termRef.current
          })
        }
      })
      .catch(error => {
        this.setState({
          termOptions: []
        })
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
      locationOptions: [value, ...this.state.locationOptions.slice(1)],
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
      () => this.searchLocationOptions({ location: value, limit: this.optionsLimit }),
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

        // if (this.state.location === location && this.state.isRequestRun === false) {
        if (this.state.location === location) {
          this.setState({
            locationOptions: [this.state.location, ...options]
            // isLocationOptionsOpen: document.activeElement === this.locationRef.current
          })
        }
      })
      .catch(error => {
        this.setState({
          locationOptions: [this.state.locationOptions[0]]
        })
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

    // this.setState({ locationOptions: [] })

    const { sortBy, term, location, radius, onlyOpened } = this.state
    this.searchYelp({ sortBy, term, location, radius, onlyOpened })
  }
  // 3. post-server client-side validation is applied on a response
  searchYelp = ({ term, location, sortBy, radius, onlyOpened }) => {
    if (this.state.isRequestRun) return
    this.setState({
      isRequestRun: true,
      businesses: []
    })

    Yelp.searchBusinesses({ term, location, sortBy, radius, onlyOpened })
      .then(businesses => {
        this.setState({
          businesses,
          errorMessage: businesses.length
            ? ''
            : this.getResponseErrorMessage({ status: 'NO_RESULTS' })
        })
      })
      // server-side validation
      .catch(({ status, message }) => {
        this.setState({
          errorMessage: this.getResponseErrorMessage({ status, message }),
          isLocationInvalid: status === 'LOCATION_NOT_FOUND'
        })
      })
      .finally(() => this.setState({ isRequestRun: false }))
  }

  getResponseErrorMessage({ status, message = 'Something went wrong, please try again' }) {
    switch (status) {
      case 'LOCATION_NOT_FOUND':
        return 'Please, try changing the location'
      case 'NO_RESULTS':
        return 'There are no results on the current options set. Change some of them and try again.'
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
          onFocus={this.handleFocus}
          onUnfocus={this.handleUnfocus}
          onKeyDown={this.handleKeyDown}
          onOptionOver={this.handleOptionOver}
          onOptionClick={this.handleOptionClick}
          sortBy={sortBy}
          onSortByChange={this.handleSortByChange}
          term={term}
          termRef={this.termRef}
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
          isLocationInvalid={this.state.isLocationInvalid}
          onInvalid={this.handleInvalid}
          onSubmit={this.handleSubmit}
        />
        {isRequestRun ? Loading : output}
      </div>
    )
  }
}
