import React, { useState } from 'react'
import Home from './Home'
import Login from './Login'
import Sidebar from './misc/Sidebar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'

const user = {
  image: 'https://randomuser.me/api/portraits/men/51.jpg',
  name: 'John Doe',
  email: 'johndoe@gmail.com'
}

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(true)

  return (
    <Router>
      <ThemeProvider theme={theme}>
        {loggedIn ? (
          <>
            <Sidebar user={user} />
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
