import React from 'react'
import './SearchBar.css'

const sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review'
}

export class SearchBar extends React.Component {
  renderSortByOptions() {
    return Object.keys(sortByOptions).map(sortByOption => {
      const sortByOptionValue = sortByOptions[sortByOption]
      return <li key={sortByOptionValue}>{sortByOption}</li>
    })
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>{this.renderSortByOptions()}</ul>
        </div>
        <div className="SearchBar-fields">
          <input type="text" placeholder="Search Businesses" />
          <input type="text" placeholder="Where?" />
        </div>
        <div className="SearchBar-submit">
          <a href="#">Let's Go</a>
        </div>
      </div>
    )
  }
}
