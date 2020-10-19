//Libraries
import React from 'react'
import './css/App.css'
import * as firebase from 'firebase'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"

//Components
import Home from './components/Home'
import LandingPage from './components/LandingPage'
import { CrashPage } from './components/CrashPage'
import DashboardView from './components/DashboardView'


//Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDR6pPRvT0oj2kqwz_7FVKZu1yLAXAPgyM",
  authDomain: "comp3120-groupaa-project.firebaseapp.com",
  databaseURL: "https://comp3120-groupaa-project.firebaseio.com",
  projectId: "comp3120-groupaa-project",
  storageBucket: "comp3120-groupaa-project.appspot.com",
  messagingSenderId: "256391310122",
  appId: "1:256391310122:web:6764768b39837175308c53",
  measurementId: "G-6PN2Y3BZ3Y"
}
firebase.initializeApp(firebaseConfig)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <DashboardView />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <LandingPage />
          {/* <CrashPage /> */}
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
