import React from 'react'
import { useState, useRef } from 'react'
import { PropTypes } from 'prop-types'

const Calendar = ({ onDateSelect, className = '', reservations = [] }) => {
  let days = ['Do', 'Lu', 'Ma', 'Mié', 'Ju', 'Vie', 'Sa']
  let months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Augosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]

  const yearRef = useRef()

  const [state, setState] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate(),
    change: 'static'
  })

  const changeDate = (e) => {
    setState({
      year: Number(e.target.dataset.year),
      month: Number(e.target.dataset.month),
      date: Number(e.target.dataset.date),
      change: 'static'
    })
    onDateSelect(
      new Date(
        Number(e.target.dataset.year),
        Number(e.target.dataset.month),
        Number(e.target.dataset.date)
      )
    )
  }

  // manejador de focus para el calendario
  const handleFocus = (e) => {
    if (e.type === 'keydown' && e.keyCode === 13) {
      changeDate(e)
    }
  }

  const setClasses = (data) => {
    if (data.getMonth() !== state.month) {
      return 'day outday'
    } else if (data.getTime() < new Date().getTime()) {
      return 'day disabled'
    } else if (data.getDate() === state.date) {
      return 'day active'
    } else if (
      data.getDate() === new Date().getDate() &&
      data.getMonth() === new Date().getMonth() &&
      data.getFullYear() === new Date().getFullYear()
    ) {
      return 'day today'
    }
    return 'day'
  }

  const changeYear = () => {
    setState({
      ...state,
      change: 'input'
    })
    setTimeout(() => {
      let input = ref.current
      input.focus()
    }, 0)
  }

  const inputChange = () => {
    let input = yearRef.current
    let year = parseInt(input.value)
    if (year > 1899 && year < 3000) {
      setState({
        ...state,
        year: year,
        change: 'static'
      })
    } else if (year < 1900) {
      setState({
        ...state,
        year: 1900,
        change: 'static'
      })
    } else if (year > 3000) {
      setState({
        ...state,
        year: 2999,
        change: 'static'
      })
    } else {
      setState({
        ...state,
        change: 'static'
      })
    }
  }

  const onKeyup = (e) => {
    if (e.keyCode === 13) {
      inputChange()
    }
  }

  const prevMonth = () => {
    const { year: currentYear, month: currentMonth } = state
    let year = currentMonth === 0 ? currentYear - 1 : currentYear
    let month = currentMonth === 0 ? 11 : currentMonth - 1
    setState({
      ...state,
      year,
      month
    })
  }
  const nextMonth = () => {
    const { year: currentYear, month: currentMonth } = state
    let year = currentMonth === 11 ? currentYear + 1 : currentYear
    let month = currentMonth === 11 ? 0 : currentMonth + 1
    setState({
      ...state,
      year,
      month,
      date: 1
    })
  }

  let firstDay = new Date(state.year, state.month).getDay()
  let dates = []
  for (let i = 1; i <= 42; i++) {
    const date = new Date(state.year, state.month, i - firstDay)
    if (reservations.length > 0) {
      console.log('reservations', reservations)
    }
    dates.push(date)
  }

  return (
    <div className={`calendar ${className}`}>
      <div className='header'>
        <div className='controls'>
          <button type='button' onClick={prevMonth}>
            <i className='fa-solid fa-caret-left'></i>
          </button>
          <button type='button' onClick={nextMonth}>
            <i className='fa-solid fa-caret-right'></i>
          </button>
        </div>
        <h1>{months[state.month]}</h1>
        <p onClick={changeYear}>
          {state.change === 'static' ? (
            state.year
          ) : (
            <input
              ref={yearRef}
              type='number'
              min='1900'
              max='2999'
              defaultValue={state.year}
              onChange={changeYear}
              onKeyUp={onKeyup}
              onBlur={inputChange}
            />
          )}
        </p>
      </div>
      <div className='container'>
        {days.map((day, index) => (
          <span key={index} className='day name'>
            {day}
          </span>
        ))}
        {dates.map((date, index) => (
          <div
            tabIndex={0}
            onFocus={handleFocus}
            onKeyDown={handleFocus}
            key={index}
            className={setClasses(date)}
            data-year={date.getFullYear().toString()}
            data-month={date.getMonth().toString()}
            data-date={date.getDate().toString()}
            onClick={changeDate}>
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  )
}

Calendar.propTypes = {
  reservations: PropTypes.array,
  onDateSelect: PropTypes.func,
  className: PropTypes.string
}

export { Calendar }
