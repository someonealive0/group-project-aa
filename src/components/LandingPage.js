import React, { useState, useEffect } from 'react'
import testService from '../services/testService'
import * as firebase from 'firebase'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"

//Components
import LoginForm from './LoginForm';

const LandingPage = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((authState) => {
            if (authState) {
                console.log("Signed in as", authState)
                setUser(authState)
            } else {
                console.log("No user", user)
                setUser(null)
            }

        })
        
        return () => unsubscribe()
    }, [])

    if (user !== null) return (<Redirect to="/home" />) //Redirect if user logged in
    return (
        <>
            {console.log("lp user (should be null)", user)}
            <LoginForm />
        </>
    )
}

export default LandingPage