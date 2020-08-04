import React, { useState } from 'react'
import Home from './Home'
import NotesPage from './notes/NotesPage'
import TasksPage from './tasks/TasksPage'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Sidebar from './misc/Sidebar'
import Search from './misc/Search'
import { GlobalStyle } from '../styles/globalstyles'
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
        <GlobalStyle />
        {loggedIn ? (
          <>
            <Sidebar user={user} />
            <Search />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/notes">
                <NotesPage />
              </Route>
              <Route exact path="/tasks">
                <TasksPage />
              </Route>
            </Switch>
          </>
        ) : (
          <Switch>
            <Route exact path="/">
              <SignIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
          </Switch>
        )}
      </ThemeProvider>
    </Router>
  )
}

export default App
