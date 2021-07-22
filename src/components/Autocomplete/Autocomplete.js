import React from 'react'
import './Autocomplete.css'

export function Autocomplete({
  children,
  options = [],
  isOpen,
  onBlur,
  onFocus,
  onOptionClick,
  onOptionPointerOver,
  focusedOptionIndex
}) {
  const handleClick = option => onOptionClick(option)
  const handlePointerOver = index => onOptionPointerOver(index)

  const autocompleteList = isOpen && options.length > 0 && (
    <ul className="Autocomplete-list">
      {options.map((option, i) => (
        <li
          key={i}
          className={`Autocomplete-option ${focusedOptionIndex === i ? 'focus' : ''}`}
          onClick={() => handleClick(option)}
          onPointerOver={() => handlePointerOver(i)}
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
