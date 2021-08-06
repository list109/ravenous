import React from 'react'
import './SearchBar.css'
import { Autocomplete } from '../Autocomplete/Autocomplete'

export class SearchBar extends React.Component {
  sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count',
    Nearest: 'distance'
  }

  handleSortByChange = sortOption => this.props.onSortByChange(sortOption)

  handleTermChange = ({ target }) => this.props.onTermChange(target.value)

  handleRadiusChange = ({ target }) => this.props.onRadiusChange(target.value)

  handleStatusChange = ({ target }) => this.props.onStatusChange(target.checked)

  handleLocationChange = ({ target }) => this.props.onLocationChange(target.value)

  getSortByClass(sortOption) {
    return sortOption === this.props.sortBy ? 'active' : ''
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
    const {
      term,
      termOptions,
      isTermOptionsOpen,
      termFocusedOptionIndex,
      radius,
      location,
      locationRef,
      locationOptions,
      isLocationOptionsOpen,
      locationFocusedOptionIndex,
      onLocationUnfocus,
      onLocationFocus,
      onLocationKey,
      onLocationOptionClick,
      onLocationOptionOver,
      isLocationInvalid,
      onInvalid,
      onSubmit
    } = this.props

    return (
      <form className="SearchBar" onSubmit={onSubmit} onInvalid={onInvalid}>
        <div className="SearchBar-sort-options">
          <ul>{this.renderSortByOptions()}</ul>
        </div>
        <div className="SearchBar-fields">
          <Autocomplete
            options={termOptions}
            isOpen={isTermOptionsOpen}
            focusedOptionIndex={termFocusedOptionIndex}
          >
            <input
              type="text"
              value={term}
              onChange={this.handleTermChange}
              placeholder="Search Businesses"
            />
          </Autocomplete>
          <Autocomplete
            options={locationOptions}
            isOpen={isLocationOptionsOpen}
            focusedOptionIndex={locationFocusedOptionIndex}
            onBlur={onLocationUnfocus}
            onFocus={onLocationFocus}
            onOptionClick={onLocationOptionClick}
            onOptionPointerOver={onLocationOptionOver}
          >
            <p className={`SearchBar-location ${isLocationInvalid ? 'invalid' : undefined}`}>
              <input
                type="text"
                value={location}
                onChange={this.handleLocationChange}
                onKeyDown={onLocationKey}
                placeholder="Where?"
                ref={locationRef}
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
                value={radius}
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
