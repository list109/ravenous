import React from 'react'
import './Autocomplete.css'

export function Autocomplete({ children, options = [], isOpen, onOption, onBlur, onFocus }) {
  const handleClick = option => onOption(option)
  const handleKeyPress = ({ option, code }) => code === 'Enter' && onOption(option)

  const autocompleteList = isOpen && options.length > 0 && (
    <ul className="Autocomplete-list">
      {options.map((option, i) => (
        <li
          key={i}
          className="Autocomplete-option"
          onClick={() => handleClick(option)}
          onKeyPress={({ code }) => handleKeyPress({ option, code })}
          tabIndex="0"
        >
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
