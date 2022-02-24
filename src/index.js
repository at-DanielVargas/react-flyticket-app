import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Store } from '@store'
import { AppRouter } from '@config'

ReactDOM.render(
  <StrictMode>
    <Provider store={Store}>
      <AppRouter />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
