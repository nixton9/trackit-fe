import React, { useState } from 'react'
import Home from './Home'
import Login from './Login'
import Sidebar from './misc/Sidebar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(true)

  return (
    <Router>
      <ThemeProvider theme={theme}>
        {loggedIn ? (
          <>
            <Sidebar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </>
        ) : (
          <Login />
        )}
      </ThemeProvider>
    </Router>
  )
}

export default App
