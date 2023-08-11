import React from 'react'
import { isMobile } from 'react-device-detect'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import Page from 'Components/Page'
import useAPI from 'utils/hooks/useAPI'
import Export from './Export'
import Landing from './Landing'
import Login from './Login'
import Words from './Words'
import Editor from './Editor'
import New from './New'
// TODO: Remove Alternative Spellings from EditWord
// TODO: Handle Nav on SUBMIT on EditWord
// TODO: Handle New Word page
// TODO: Handle Search feature
// TODO: Handle filters (hidden/visible, # of recordings, # of images, # of tags)
// TODO: handle image upload????
const AdminRoute = ({ path, children }) => {
  const { roles } = useAPI()
  return (
    <Route path={path}>
      {roles.includes('admin') ? children : <Redirect to={path} />}
    </Route>
  )
}
export const AdminPanel = () => {
  const { loggedIn } = useAPI()
  const { path } = useRouteMatch()
  if (isMobile) {
    return (
      <Page title='admin panel only available on Desktop Browsers'>
        <h3>⚠ ⚠ ⚠</h3>
      </Page>
    )
  }
  return (
    <Landing>
      {loggedIn ? (
        <Switch>
          {/* <AdminRoute path={path + '/bulk-new'}>
            <BatchUpload />
          </AdminRoute> */}
          <AdminRoute path={path + '/export'}>
            <Export />
          </AdminRoute>
          {/* <AdminRoute path={path + '/users/:_id?'}>
            <Users />
          </AdminRoute> */}
          {/* <AdminRoute path={path + '/signup'}>
            <Signup />
          </AdminRoute> */}

          {/* <Route path={path + '/requests'}>
            <Requests />
          </Route> */}

          <Route path={path + '/:_id'}>
            <Editor />
          </Route>
          <Route path={path + '/new'}>
            <New />
          </Route>
          <Route path={path}>
            <Words />
          </Route>
        </Switch>
      ) : (
        <Login />
      )}
    </Landing>
  )
}
