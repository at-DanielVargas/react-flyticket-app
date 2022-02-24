import React from 'react'
import { cloneElement, Children, useState, useRef } from 'react'
import { PropTypes } from 'prop-types'
import { useField } from 'formik'
import { useClickOutSideDetect } from '@hooks'

export const DropdownItem = ({ children, onClick }) => {
  return (
    <div className='flgt-dropdown-item' onClick={onClick}>
      {children}
    </div>
  )
}

DropdownItem.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
}

export const Dropdown = ({ children, placeholder, color, className = '', ...props }) => {
  const [field, meta, helpers] = useField(props)

  const ref = useRef(null)
  const menuRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  useClickOutSideDetect(ref, () => setIsOpen(false))
  const open = () => {
    setTimeout(() => {
      const { x, width, y, height } = menuRef.current.getBoundingClientRect()
      if (x + width > window.innerWidth) {
        ref.current.classList.add('right')
      }
      if (y + height > window.innerHeight) {
        ref.current.classList.add('up')
      }
    }, 0)
    setIsOpen(true)
  }

  return (
    <div className={`flgt-dropdown ${isOpen && 'active'}`} ref={ref}>
      <div className='flgt-dropdown-trigger'>
        <button className='button' type='button' onClick={open}>
          <span>{placeholder}</span>
          <span className='icon is-small'>
            <i className='fas fa-angle-down'></i>
          </span>
        </button>
      </div>
      <div className='flgt-dropdown-menu'>
        <div className='flgt-dropdown-content' ref={menuRef}>
          {Children.map(children, (child, index) => {
            return cloneElement(child, {
              key: index
            })
          })}
        </div>
      </div>
    </div>
  )
}

Dropdown.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.string,
  icon: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string
}
