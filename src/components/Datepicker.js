import React, { useState } from 'react'
import { useRef } from 'react'
import { PropTypes } from 'prop-types'
import { Calendar } from '@components'
import { useField } from 'formik'
import { DisplayUtil } from '@utils'
import { useClickOutSideDetect } from '@hooks'

const Datepicker = ({ placeholder, ...props }) => {
  const inputRef = useRef()
  const ref = useRef()
  const [field, meta, helpers] = useField(props)
  const [isOpen, setOpen] = useState(false)

  useClickOutSideDetect(ref, () => setOpen(false))

  const onDateSelect = (date) => {
    helpers.setValue(date)
    inputRef.current.value = DisplayUtil.capitalize(DisplayUtil.dateFormat(date))
  }

  return (
    <div className={`flgt-dropdown ${isOpen && 'active'}`} ref={ref}>
      <input
        className='flgt-dropdown-trigger'
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        type='text'
        ref={inputRef}
      />
      <div className='flgt-dropdown-menu'>
        <div className='flgt-dropdown-content'>
          <Calendar onDateSelect={onDateSelect} />
        </div>
      </div>
    </div>
  )
}

Datepicker.propTypes = {
  placeholder: PropTypes.string
}

export { Datepicker }
