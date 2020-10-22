//Libraries
import React, { useState, useEffect, useContext, createContext } from "react"
import "./css/App.css"
import * as firebase from "firebase"
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"

//Components
import Home from "./components/Home";
import LandingPage from "./components/LandingPage"
import { CrashPage } from "./components/CrashPage"
import DashboardView from "./components/DashboardView"
import UserProfile from "./components/UserProfile"
import Loading from './components/Loading'

//Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDR6pPRvT0oj2kqwz_7FVKZu1yLAXAPgyM",
  authDomain: "comp3120-groupaa-project.firebaseapp.com",
  databaseURL: "https://comp3120-groupaa-project.firebaseio.com",
  projectId: "comp3120-groupaa-project",
  storageBucket: "comp3120-groupaa-project.appspot.com",
  messagingSenderId: "256391310122",
  appId: "1:256391310122:web:6764768b39837175308c53",
  measurementId: "G-6PN2Y3BZ3Y",
}

//Firebase intialisation
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

export const userAuth = createContext()

function App() {
  const [user, setUser] = useState(null)


  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authState) => {
      if (authState) {
        console.log("Signed in as", authState)
        setUser(firebase.auth().currentUser)
      } else {
        console.log("No user", user)
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  if (user === undefined) return (<></>) //User hasn't initialised yet
  return (
    <Router>
      <userAuth.Provider value={user}>
        <Switch>
          <Route exact path="/dashboard">
            <DashboardView />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/me" render={() =>
            <UserProfile />
          }>
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>

        </Switch>
      </userAuth.Provider>
    </Router>
  );
}

export default App;
