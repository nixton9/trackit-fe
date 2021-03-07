import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Notification } from './misc/Notification'
import { Alert } from './misc/Alert'
import { LoadingSpinner } from './misc/LoadingSpinner'
import { GlobalStyle } from '../styles/globalstyles'
import * as serviceWorker from '../serviceWorker'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from '../styles/theme'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { useLocalStorage } from '../utils/useLocalStorage'
import { RecoilRoot } from 'recoil'

const App: React.FC = () => {
  // We use this piece of state to track if there is a new version of the app
  const [newVersionAvailable, setNewVersionAvailable] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<any>({})

  const [loggedIn, setLoggedIn] = useState(false)
  const [showWidgets, setShowWidgets] = useState(true)

  const [token, setToken] = useLocalStorage('token', '')
  const [userInfo, setUserInfo] = useLocalStorage('user', {})
  const [, setNotToken] = useLocalStorage('notToken', '')
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage('isDarkTheme', true)

  const onServiceWorkerUpdate = (registration: any) => {
    setWaitingWorker(registration && registration.waiting)
    setNewVersionAvailable(true)
  }

  const updateServiceWorker = () => {
    waitingWorker && waitingWorker.postMessage({ type: 'SKIP_WAITING' })
    setNewVersionAvailable(false)
    setTimeout(() => window.location.reload(), 500)
  }

  const logout = () => {
    setToken('')
    setUserInfo({})
  }

  const refreshUserInfo = () => {
    const userInfo = window.localStorage.getItem('user')
    if (userInfo) {
      setUserInfo(JSON.parse(userInfo))
    }
  }

  const client = new ApolloClient({
    uri:
      !process.env.REACT_APP_NODE_ENV ||
      process.env.REACT_APP_NODE_ENV === 'development' ||
      process.env.REACT_APP_NODE_ENV === 'test'
        ? 'http://localhost:4000/'
        : 'https://trackitbe.herokuapp.com/',
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  const isIos = () => {
    if (window) {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod/.test(userAgent)
    }
    return false
  }

  const Home = lazy(() => import('./Home'))
  const SignIn = lazy(() => import('./auth/SignIn'))
  const SignUp = lazy(() => import('./auth/SignUp'))
  const Sidebar = lazy(() => import('./misc/Sidebar'))
  const Search = lazy(() => import('./misc/Search'))
  const Add = lazy(() => import('./misc/Add'))
  const SearchPage = lazy(() => import('./SearchPage'))
  const PrivacyPolicyPage = lazy(() => import('./PrivacyPolicyPage'))
  const NotesPage = lazy(() => import('./notes/NotesPage'))
  const NoteDetail = lazy(() => import('./notes/NoteDetail'))
  const TasksPage = lazy(() => import('./tasks/TasksPage'))
  const ExpensesPage = lazy(() => import('./expenses/ExpensesPage'))
  const HabitsPage = lazy(() => import('./habits/HabitsPage'))
  const SettingsPage = lazy(() => import('./misc/SettingsPage'))
  const ForgotPassword = lazy(() => import('./auth/ForgotPassword'))
  const ResetPassword = lazy(() => import('./auth/ResetPassword'))

  useEffect(() => {
    // Register serviceWorker and pass a function to create notification when new version available
    serviceWorker.register({ onUpdate: onServiceWorkerUpdate })

    const body = document.querySelector('body')
    const isInStandaloneMode = () =>
      // @ts-ignore
      'standalone' in window.navigator && window.navigator.standalone

    if (isIos() && body && !isInStandaloneMode()) {
      body.classList.add('ios-padding')
    }
  }, [])

  useEffect(() => {
    token ? setLoggedIn(true) : setLoggedIn(false)
  }, [token])

  return (
    <ApolloProvider client={client}>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            <GlobalStyle />
            {loggedIn ? (
              <RecoilRoot>
                <Switch>
                  <Route exact path="/">
                    <Home
                      userName={userInfo.name}
                      newVersionAvailable={newVersionAvailable}
                      updateServiceWorker={updateServiceWorker}
                    />
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
                  <Route
                    exact
                    path="/habits"
                    render={props => <HabitsPage {...props} />}
                  />
                  <Route exact path="/settings">
                    <SettingsPage
                      user={userInfo}
                      refreshUserInfo={refreshUserInfo}
                      isDarkTheme={isDarkTheme}
                      setIsDarkTheme={setIsDarkTheme}
                    />
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
                  <Route
                    exact
                    path="/expenses/stats"
                    render={props => <ExpensesPage {...props} stats />}
                  />
                  <Route
                    path="/habits/stats/:habit?"
                    render={props => <HabitsPage {...props} stats />}
                  />
                  <Route
                    exact
                    path="/privacy-policy"
                    render={props => (
                      <PrivacyPolicyPage
                        {...props}
                        setWidgets={(bool: boolean) => setShowWidgets(bool)}
                      />
                    )}
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
                  <SignIn
                    setToken={setToken}
                    setUserInfo={setUserInfo}
                    setNotToken={setNotToken}
                  />
                </Route>
                <Route exact path="/signup">
                  <SignUp
                    setToken={setToken}
                    setUserInfo={setUserInfo}
                    setNotToken={setNotToken}
                  />
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
        </Suspense>
      </Router>
    </ApolloProvider>
  )
}

export default App
