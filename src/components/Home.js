import React, { useState, useEffect } from 'react'
import testService from '../services/testService'
import * as firebase from 'firebase'
import { Redirect, Link } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState(undefined)

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

    if (user === undefined) return (<></>) //User hasn't initialised yet
    if (user === null) return (<Redirect to="/" />) //User is logged out, redirect to landing page
    return (
        <>
            {console.log("home user (shouldn't be null)", user)}
            <h1>Signed in as {user.uid}</h1> <p></p>
            <button onClick={() => testService.test().then(result => console.log(result))}>Log a test message</button>
            <button onClick={() => firebase.auth().signOut()}>Log out</button>
            <Link to="/dashboard">Dashboard</Link>
        </>
    )
}

export default Home