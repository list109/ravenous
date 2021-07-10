import React from 'react'
import './Autocomplete.css'

export function Autocomplete({ children, options = [], isOpen, onClick, onBlur, onFocus }) {
  const autocompleteList = isOpen && options.length > 0 && (
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
