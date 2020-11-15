import React, { useState, useEffect } from 'react'
import Home from './Home'
import SearchPage from './SearchPage'
import NotesPage from './notes/NotesPage'
import NoteDetail from './notes/NoteDetail'
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
import { Notification } from './misc/Notification'
import { Alert } from './misc/Alert'
import { GlobalStyle } from '../styles/globalstyles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { useLocalStorage } from '../utils/useLocalStorage'
import { RecoilRoot } from 'recoil'

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [showWidgets, setShowWidgets] = useState(true)

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
            <RecoilRoot>
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
                <Route
                  exact
                  path="/search/:query"
                  render={props => <SearchPage {...props} />}
                />
                <Route
                  exact
                  path="/notes/:id"
                  render={props => (
                    <NoteDetail
                      {...props}
                      setWidgets={(bool: boolean) => setShowWidgets(bool)}
                    />
                  )}
                />
                <Route
                  exact
                  path="/tasks/done"
                  render={props => <TasksPage {...props} done />}
                />
              </Switch>
              <Notification />
              <Alert />
              {showWidgets && (
                <>
                  <Sidebar user={userInfo} logout={logout} />
                  <Search />
                  <Add />
                </>
              )}
            </RecoilRoot>
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
