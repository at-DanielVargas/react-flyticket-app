import React from 'react'
import { useRef, useState } from 'react'
import { PropTypes } from 'prop-types'
import { useField } from 'formik'

import { useClickOutSideDetect } from '@hooks'

const Autocomplete = ({ placeholder, suggestions, ...props }) => {
  const [field, meta, helpers] = useField(props)
  const [selectionIndex, setSelectionIndex] = useState(0)
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions)
  const [isOpen, setOpen] = useState(false)
  const inputRef = useRef()
  const ref = useRef()
  useClickOutSideDetect(ref, () => setOpen(false))

  const onChange = (e) => {
    const value = inputRef.current.value
    setFilteredSuggestions(
      suggestions.filter(
        (suggestion) => suggestion.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
      )
    )
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      helpers.setValue(filteredSuggestions[selectionIndex])
      inputRef.current.value = `${filteredSuggestions[selectionIndex].name} (${filteredSuggestions[selectionIndex].state.code}) ${filteredSuggestions[selectionIndex].state.name}`
      setSelectionIndex(0)
      setOpen(false)
    } else {
      if (e.keyCode === 38) {
        if (selectionIndex === 0) {
          return
        }
        setSelectionIndex(selectionIndex - 1)
      }
      if (e.keyCode === 40) {
        if (selectionIndex === filteredSuggestions.length - 1) {
          return
        }
        setSelectionIndex(selectionIndex + 1)
      }
    }
  }

  const onClick = (suggestion) => {
    inputRef.current.value = `${suggestion.name} (${suggestion.state.code}) ${suggestion.state.name}`
    helpers.setValue(suggestion)
    setOpen(false)
  }

  return (
    <div className={`flgt-dropdown ${isOpen && 'active'}`} ref={ref}>
      <div className='flgt-dropdown-trigger'>
        <input
          type='text'
          onFocus={() => setOpen(true)}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          ref={inputRef}
        />
      </div>
      <div className='flgt-dropdown-menu'>
        <div className='flgt-dropdown-content scrollable'>
          {filteredSuggestions.map((suggestion, index) => (
            <span
              className={`flgt-dropdown-item ${selectionIndex === index && 'active'}`}
              key={index}
              onClick={() => onClick(suggestion)}>
              <span>{`${suggestion.name} (${suggestion.state.code}) ${suggestion.state.name}`}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

Autocomplete.propTypes = {
  suggestions: PropTypes.array.isRequired,
  placeholder: PropTypes.string
}

export { Autocomplete }
