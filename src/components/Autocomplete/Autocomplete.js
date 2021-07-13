import React from 'react'
import './Autocomplete.css'

export const Autocomplete = React.forwardRef(
  ({ children, options = [], isOpen, onBlur, onFocus, onClick, onKeyDown, onPointerOver }, ref) => {
    const handleClick = option => onClick(option)
    const handleKeyDown = ({ option, code, elem }) => {
      onKeyDown({ option, code, elem })
    }
    const handlePointerOver = ({ target }) => onPointerOver(target)

    const autocompleteList = isOpen && options.length > 0 && (
      <ul className="Autocomplete-list" ref={ref}>
        {options.map((option, i) => (
          <li
            key={i}
            className="Autocomplete-option"
            onClick={() => handleClick(option)}
            onKeyDown={({ code, target: elem }) => handleKeyDown({ option, code, elem })}
            onPointerOver={handlePointerOver}
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
)
