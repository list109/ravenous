import React from 'react'
import './Autocomplete.css'

export function Autocomplete({
  children,
  options = [],
  isOpen,
  onBlur,
  onFocus,
  onClick,
  onKeyDown
}) {
  const handleClick = option => onClick(option)
  const handleKeyDown = ({ option, code, elem }) => {
    onKeyDown({ option, code, elem })
  }

  const autocompleteList = isOpen && options.length > 0 && (
    <ul className="Autocomplete-list">
      {options.map((option, i) => (
        <li
          key={i}
          className="Autocomplete-option"
          onClick={() => handleClick(option)}
          onKeyDown={({ code, target: elem }) => handleKeyDown({ option, code, elem })}
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
