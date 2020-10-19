//Libraries
import React from 'react'
import './App.css'
import * as firebase from 'firebase'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import { useState, useEffect } from 'react'

//Components
import Navbar from './components/Navbar'
import Home from './components/Home'
import LandingPage from './components/LandingPage'

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
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
