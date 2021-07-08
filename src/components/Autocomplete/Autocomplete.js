import React from 'react'
import './Autocomplete.css'

export function Autocomplete({ children, options = [], onClick }) {
  const autocompleteList = Boolean(options.length) && (
    <ul className="Autocomplete-list">
      {options.map(option => (
        <li className="Autocomplete-option" onClick={() => onClick(option)}>
          {option}
        </li>
      ))}
    </ul>
  )

  return (
    <div className="Autocomplete">
      {children}
      {autocompleteList}
    </div>
  )
}
