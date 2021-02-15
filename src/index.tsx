import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { startFirebase } from './push-notification'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

startFirebase()
