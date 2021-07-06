import React from 'react'
import './App.css'
import { BusinessList } from '../BusinessList/BusinessList'
import { SearchBar } from '../SearchBar/SearchBar'
import { Yelp } from '../../util/Yealp'

export class App extends React.Component {
  state = { businesses: [], errorMessage: '' }

  searchYelp = ({ term, location, sortBy }) => {
    if (term === '' || location === '') {
      this.setState({ errorMessage: this.getErrorMessage(400) })
      return
    }

    Yelp.search({ term, location, sortBy })
      .then(businesses => {
        this.setState({ businesses, errorMessage: '' })
      })
      .catch(error => {
        this.setState({ errorMessage: this.getErrorMessage(error) })
      })
  }

  getErrorMessage({ response, message = 'Something went wrong, please try again' }) {
    switch (response?.status) {
      case 400:
        return 'Please, try to change some of the fields value'
      default:
        return message
    }
  }

  render() {
    const { businesses, errorMessage } = this.state

    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp} />
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          <BusinessList businesses={businesses} />
        )}
      </div>
    )
  }
}
