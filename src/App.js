//Libraries
import React from 'react'
import './App.css'
import * as firebase from 'firebase'

//Components
import TestComponent from "./components/testComponent"

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
    <TestComponent/> 
  )
}

export default App;
