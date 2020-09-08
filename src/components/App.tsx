import React, { useState, useEffect } from 'react'
import Home from './Home'
import NotesPage from './notes/NotesPage'
import TasksPage from './tasks/TasksPage'
import ExpensesPage from './expenses/ExpensesPage'
import HabitsPage from './habits/HabitsPage'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import Sidebar from './misc/Sidebar'
import Search from './misc/Search'
import Add from './misc/Add'
import { GlobalStyle } from '../styles/globalstyles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { useLocalStorage } from '../utils/useLocalStorage'

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  const [token, setToken] = useLocalStorage('token', '')
  const [userInfo, setUserInfo] = useLocalStorage('user', {})

  useEffect(() => {
    token ? setLoggedIn(true) : setLoggedIn(false)
  }, [token])

  const logout = () => {
    setToken('')
    setUserInfo({})
  }

  const client = new ApolloClient({
    uri: '/',
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  return (
    <ApolloProvider client={client}>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {loggedIn ? (
            <>
              <Sidebar user={userInfo} logout={logout} />
              <Search />
              <Add />
              <Switch>
                <Route exact path="/">
                  <Home userName={userInfo.name} />
                </Route>
                <Route exact path="/notes">
                  <NotesPage />
                </Route>
                <Route exact path="/tasks">
                  <TasksPage />
                </Route>
                <Route exact path="/expenses">
                  <ExpensesPage />
                </Route>
                <Route exact path="/habits">
                  <HabitsPage />
                </Route>
              </Switch>
            </>
          ) : (
            <Switch>
              <Route exact path="/">
                <SignIn setToken={setToken} setUserInfo={setUserInfo} />
              </Route>
              <Route exact path="/signup">
                <SignUp setToken={setToken} setUserInfo={setUserInfo} />
              </Route>
              <Route exact path="/forgot">
                <ForgotPassword />
              </Route>
              <Route
                exact
                path="/reset/:email/:token"
                component={ResetPassword}
              />
            </Switch>
          )}
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  )
}

export default App
