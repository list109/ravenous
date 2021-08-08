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
      onFocus,
      onUnfocus,
      onKeyDown,
      onOptionClick,
      onOptionOver,
      term,
      termRef,
      termOptions,
      isTermOptionsOpen,
      termFocusedOptionIndex,
      location,
      locationRef,
      locationOptions,
      isLocationOptionsOpen,
      locationFocusedOptionIndex,
      isLocationInvalid,
      radius,
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
            name="term"
            options={termOptions}
            isOpen={isTermOptionsOpen}
            focusedOptionIndex={termFocusedOptionIndex}
            onOptionClick={onOptionClick}
            onOptionPointerOver={onOptionOver}
            onFocus={onFocus}
            onUnfocus={onUnfocus}
          >
            <input
              type="text"
              name="term"
              value={term}
              onChange={this.handleTermChange}
              onKeyDown={onKeyDown}
              placeholder="Search Businesses"
              ref={termRef}
            />
          </Autocomplete>
          <Autocomplete
            name="location"
            options={locationOptions}
            isOpen={isLocationOptionsOpen}
            focusedOptionIndex={locationFocusedOptionIndex}
            onOptionClick={onOptionClick}
            onOptionPointerOver={onOptionOver}
            onFocus={onFocus}
            onUnfocus={onUnfocus}
          >
            <p className={`SearchBar-location${isLocationInvalid ? ' invalid' : ''}`}>
              <input
                type="text"
                name="location"
                value={location}
                onChange={this.handleLocationChange}
                onKeyDown={onKeyDown}
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
