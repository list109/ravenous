import React from 'react'
import './Autocomplete.css'

export function Autocomplete({
  name,
  children,
  options = [],
  isOpen,
  focusedOptionIndex,
  onOptionClick,
  onOptionPointerOver,
  onFocus,
  onUnfocus
}) {
  const handleClick = option => onOptionClick(name, option)
  const handlePointerOver = index => onOptionPointerOver(name, index)
  const handleFocus = () => onFocus(name)
  const handleBlur = () => onUnfocus(name)

  const autocompleteList = isOpen && options.length > 0 && (
    <ul className="Autocomplete-list">
      {options.map((option, i) => (
        <li
          key={i}
          className={`Autocomplete-option${focusedOptionIndex === i ? ' focus' : ''}`}
          onClick={() => handleClick(option)}
          onPointerOver={() => handlePointerOver(i)}
          tabIndex="0"
        >
          <p>{option}</p>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="Autocomplete" onFocus={handleFocus} onBlur={handleBlur}>
      {children}
      {autocompleteList}
    </div>
  )
}
