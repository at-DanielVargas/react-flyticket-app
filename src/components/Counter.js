import React, { useState, useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types'
import { useField } from 'formik'

const Counter = ({ onChange, ...props }) => {
  const [field, meta, helpers] = useField(props)
  const [count, setCount] = useState(0)
  const ref = useRef()

  useEffect(() => {
    if (onChange) {
      onChange(count)
    }
    ref.current.value = count
    helpers.setValue(count)
  }, [count])

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  return (
    <div className='d-flex a-items-center'>
      <button className='button-sm mr-3' type='button' onClick={decrement}>
        <i className='fa-solid fa-minus'></i>
      </button>
      <input className='input-sm' type='text' ref={ref} />
      <button className='button-sm ml-3' type='button' onClick={increment}>
        <i className='fa-solid fa-plus'></i>
      </button>
    </div>
  )
}

Counter.propTypes = {
  onChange: PropTypes.func
}

export { Counter }
