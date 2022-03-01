import React, { useState, useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types'
import { useField } from 'formik'

const Counter = ({ onCounterChange, ...props }) => {
  const [field, meta, helpers] = useField(props)
  const [count, setCount] = useState(0)
  const ref = useRef()

  useEffect(() => {
    if (onCounterChange) {
      onCounterChange(count)
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
      <input className='w-100' type='text' ref={ref} />
      <button className='button-sm ml-3' type='button' onClick={increment}>
        <i className='fa-solid fa-plus'></i>
      </button>
    </div>
  )
}

Counter.propTypes = {
  onCounterChange: PropTypes.func
}

export { Counter }
