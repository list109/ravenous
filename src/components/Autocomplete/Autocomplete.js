import React from 'react'
import './Autocomplete.css'

export function Autocomplete({ children, options = [], onClick, onBlur, onFocus }) {
  const autocompleteList = Boolean(options.length) && (
    <ul className="Autocomplete-list">
      {options.map((option, i) => (
        <li key={i} className="Autocomplete-option" onClick={() => onClick(option)} tabIndex="0">
          {option}
        </li>
      ))}
    </ul>
  )

  return (
    <div className="Autocomplete" onBlur={onBlur} onFocus={onFocus}>
      {children}
      {autocompleteList}
    </div>
  )
}
