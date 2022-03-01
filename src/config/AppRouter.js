import React from 'react'
import { Switch, Route } from 'react-router'

import { Layout, Home, Flights, Confirm, Booking, Passengers, Auth } from '@routes'
import { ConnectedRouter } from 'connected-react-router'

import { history } from '@store'

export const AppRouter = () => {
  return (
    <ConnectedRouter history={history}>
      <>
        <Switch>
          <Route exact path='/'>
            <Layout>
              <Home />
            </Layout>
          </Route>

          <Route path='/booking/:path?' exact>
            <Layout>
              <Booking>
                <Switch>
                  <Route path='/booking/flights' component={Flights} />
                  <Route path='/booking/passengers' component={Passengers} />
                  <Route path='/booking/confirm' component={Confirm} />
                </Switch>
              </Booking>
            </Layout>
          </Route>

          <Route path='/auth' exact component={Auth} />
        </Switch>
      </>
    </ConnectedRouter>
  )
}
