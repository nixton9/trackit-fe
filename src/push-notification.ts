import firebase from 'firebase/app'
import '@firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'trckr-9.firebaseapp.com',
  projectId: 'trckr-9',
  storageBucket: 'trckr-9.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: '1:225288539484:web:0aec495818dc9ab1bc8599',
  measurementId: 'G-RQ2K2Z4HWC'
}

export const startFirebase = () => {
  firebase.initializeApp(firebaseConfig)
}

export const askNotificationPermission = async () => {
  try {
    const messaging = firebase.messaging()
    const token = await messaging.getToken()
    return token
  } catch (error) {
    throw new Error(error)
  }
}
