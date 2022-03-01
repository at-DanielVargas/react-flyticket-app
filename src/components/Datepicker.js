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

  const handleMobilePicker = (e) => {
    const nativeDate = e.target.value.split('-').map((fr) => parseInt(fr))
    const date = new Date(nativeDate[0], nativeDate[1] - 1, nativeDate[2])
    helpers.setValue(date)
    inputRef.current.value = DisplayUtil.capitalize(DisplayUtil.dateFormat(date))
  }

  const onDateSelect = (date) => {
    if (date.getTime() < new Date().getTime()) {
      return
    }
    helpers.setValue(date)
    inputRef.current.value = DisplayUtil.capitalize(DisplayUtil.dateFormat(date))
  }

  return (
    <div className={`flgt-dropdown ${isOpen && 'active'}`} ref={ref}>
      <input className='mobile-picker' type='date' onChange={handleMobilePicker} />
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
