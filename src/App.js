//Libraries
import React from 'react'
import './App.css'
import * as firebase from 'firebase'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"

//Components
import TestComponent from "./components/testComponent"
import SignupForm from "./components/signupForm"

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

function App() {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <Link className="navlink" to="/">Home</Link>
            <Link className="navlink" to="/signup">Signup</Link>
          </ul>
        </nav>
      </header>

      <Switch>

        <Route path="/signup">
          <SignupForm />
        </Route>

        <Route path="/login">
          <TestComponent />
        </Route>

        <Route path="/">
          <TestComponent />
        </Route>

      </Switch>
    </Router>
  )
}

export default App;
