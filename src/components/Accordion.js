import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'

export const AccordionItem = ({ children, name, onClick }) => {
  const uniqueId = `accordion-item-${name.toLowerCase().replace(/\s/g, '_')}`
  return (
    <div className='tab'>
      <input type='checkbox' defaultChecked={true} id={uniqueId} />
      <label className='tab-label' htmlFor={uniqueId}>
        {name}
      </label>
      <div className='tab-content'>{children}</div>
    </div>
  )
}

AccordionItem.propTypes = {
  children: PropTypes.node,
  name: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string
}

export const Accordion = ({ children }) => {
  return (
    <div className='tabs'>
      {Children.map(children, (child, index) => {
        return cloneElement(child, {
          key: index
        })
      })}
    </div>
  )
}

Accordion.propTypes = {
  children: PropTypes.node
}
